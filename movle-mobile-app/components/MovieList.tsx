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
const TOTAL_PAGES_TO_FETCH = 20;

const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (): Promise<void> => {
    try {
      const moviePromises = Array.from({ length: TOTAL_PAGES_TO_FETCH }, (_, i) =>
        axios.get<MovieResponse>(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${i + 1}`)
      );

      const responses = await Promise.all(moviePromises);
      const allMovies = responses.flatMap(response => response.data.results);

      const validMovies = allMovies.filter(movie => 
        movie.poster_path && 
        movie.overview && 
        movie.overview.length > 50 &&
        movie.overview.length < 500
      );

      setMovies(validMovies);
      setError(null);
    } catch (error) {
      setError('Erro ao carregar filmes. Por favor, tente novamente.');
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async (): Promise<void> => {
    try {
      const response = await axios.get<GenreResponse>(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const getGenreNameById = (genreIds: number[]) => {
    if (genreIds.length > 0) {
      const genre = genres.find(g => g.id === genreIds[0]);
      return genre ? genre.name : 'Outros';
    }
    return 'Outros';
  };

  return { 
    movies, 
    genres, 
    loading, 
    error,
    getGenreNameById 
  };
};

export default useMovies;