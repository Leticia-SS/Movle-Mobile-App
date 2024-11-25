import { useState, useEffect } from 'react';
import axios from 'axios';

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

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

interface GenreResponse {
  genres: Genre[];
}

const API_KEY = '9d8ccd29ba63783cc0d8c389e6916a6f';
const BASE_URL = 'https://api.themoviedb.org/3';

const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchMovies = async (): Promise<void> => {
    try {
      let allMovies: Movie[] = [];
      const totalPagesResponse = await axios.get<MovieResponse>(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
      const totalPages = totalPagesResponse.data.total_pages;

      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get<MovieResponse>(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`);
        allMovies = [...allMovies, ...response.data.results];
      }

      setMovies(allMovies);
      setLoading(false);
    } catch (error) {
      setError('Erro ao buscar filmes.');
      setLoading(false);
    }
  };

  const fetchGenres = async (): Promise<void> => {
    try {
      const response = await axios.get<GenreResponse>(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
      setGenres(response.data.genres);
    } catch (error) {
      setError('Erro ao buscar categorias.');
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  return { movies, genres, loading, error };
};

export default useMovies;
