import { useState, useEffect } from 'react';

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
  genre_ids: number[];
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

interface TVShowResponse {
  results: TVShow[];
  total_pages: number;
}

interface GenreResponse {
  genres: Genre[];
}

const API_KEY = '9d8ccd29ba63783cc0d8c389e6916a6f';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDhjY2QyOWJhNjM3ODNjYzBkOGMzODllNjkxNmE2ZiIsIm5iZiI6MTczMjQ5OTAyNS40Mjk5NDcxLCJzdWIiOiI2NmMxNDI2ZjE1MGQ0MmJlMTA5ZGQzMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VPzldivdePs1OQLEkfJSVZhw-vRGsd6zj2yLWuryb7c'; // Substitua pelo seu token

const BASE_URL = 'https://api.themoviedb.org/3';

const useMoviesAndTV = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchMovies = async (): Promise<void> => {
    try {
      let allMovies: Movie[] = [];
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };

      const totalPagesResponse = await fetch(`${BASE_URL}/movie?api_key=${API_KEY}&language=pt-BR&page=1`, options);
      const totalPagesData: MovieResponse = await totalPagesResponse.json();
      const totalPages = totalPagesData.total_pages;

      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${BASE_URL}/movie?api_key=${API_KEY}&language=pt-BR&page=${page}`, options);
        const data: MovieResponse = await response.json();
        allMovies = [...allMovies, ...data.results];
      }

      setMovies(allMovies);
      setLoading(false);
    } catch (error) {
      setError('Erro ao buscar filmes.');
      setLoading(false);
    }
  };

  const fetchTVShows = async (): Promise<void> => {
    try {
      let allTVShows: TVShow[] = [];
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };

      const totalPagesResponse = await fetch(`${BASE_URL}/tv?api_key=${API_KEY}&language=pt-BR&page=1`, options);
      const totalPagesData: TVShowResponse = await totalPagesResponse.json();
      const totalPages = totalPagesData.total_pages;

      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${BASE_URL}/tv?api_key=${API_KEY}&language=pt-BR&page=${page}`, options);
        const data: TVShowResponse = await response.json();
        allTVShows = [...allTVShows, ...data.results];
      }

      setTVShows(allTVShows);
    } catch (error) {
      setError('Erro ao buscar séries.');
    }
  };

  const fetchGenres = async (): Promise<void> => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };
      const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`, options);
      const data: GenreResponse = await response.json();
      setGenres(data.genres);
    } catch (error) {
      setError('Erro ao buscar categorias.');
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchTVShows();
    fetchGenres();
  }, []);

  return { movies, tvShows, genres, loading, error };
};

export default useMoviesAndTV;
