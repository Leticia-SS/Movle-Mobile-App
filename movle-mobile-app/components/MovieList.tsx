import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

interface MovieResponse {
  results: Movie[];
}

interface GenreResponse {
  genres: Genre[];
}

const API_KEY = '9d8ccd29ba63783cc0d8c389e6916a6f';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMovies = async (): Promise<void> => {
    try {
      const response = await axios.get<MovieResponse>(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
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

  const getGenreNames = (genreIds: number[]): string => {
    return genreIds
      .map(id => genres.find(genre => genre.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const renderItem = ({ item }: { item: Movie }) => {
    const { title, overview, release_date, poster_path, genre_ids } = item;
    const genreNames = getGenreNames(genre_ids);

    return (
      <View style={styles.movieCard}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          style={styles.moviePoster}
        />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{title}</Text>
          <Text style={styles.movieGenres}>Categorias: {genreNames}</Text>
          <Text style={styles.movieReleaseDate}>Lançamento: {release_date}</Text>
          <Text style={styles.movieDescription}>{overview}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  movieCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  moviePoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    padding: 10,
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieGenres: {
    fontSize: 14,
    marginBottom: 5,
    color: '#777',
  },
  movieReleaseDate: {
    fontSize: 12,
    marginBottom: 10,
    color: '#777',
  },
  movieDescription: {
    fontSize: 14,
    color: '#333',
  },
});

export default MovieList;
