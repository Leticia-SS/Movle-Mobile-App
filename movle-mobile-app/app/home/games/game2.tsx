import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, ScrollView } from 'react-native';
import useMovies from '../../../components/MovieList';
import { LinearGradient } from 'expo-linear-gradient';

interface MovieWithCategory {
  id: number;
  title: string;
  posterPath: string;
  category: string;
}

const IntruderGame = () => {
  const { movies, genres, getGenreNameById } = useMovies();
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'ended'>('playing');
  const [currentSet, setCurrentSet] = useState<MovieWithCategory[]>([]);
  const [intruso, setIntruso] = useState<MovieWithCategory | null>(null);

  useEffect(() => {
    if (movies.length > 0 && gameState === 'playing') {
      generateMovieSet();
    }
  }, [movies, gameState]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('ended');
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const generateMovieSet = () => {
    if (movies.length < 4) return;

    const mainCategory = getGenreNameById(
      movies[Math.floor(Math.random() * movies.length)].genre_ids
    );
    
    const availableCategories = genres
      .filter(genre => genre.name !== mainCategory)
      .map(genre => genre.name);
    
    const intrusoCategory = availableCategories[
      Math.floor(Math.random() * availableCategories.length)
    ];

    const mapMovieToMovieWithCategory = (movie: typeof movies[0]): MovieWithCategory => ({
      id: movie.id,
      title: movie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      category: ''
    });

    const mainCategoryMovies = movies
      .filter(movie => getGenreNameById(movie.genre_ids) === mainCategory)
      .slice(0, 3)
      .map(movie => {
        const mappedMovie = mapMovieToMovieWithCategory(movie);
        mappedMovie.category = mainCategory;
        return mappedMovie;
      });

    const intrusoMovie = mapMovieToMovieWithCategory(
      movies.find(movie => 
        getGenreNameById(movie.genre_ids) === intrusoCategory
      ) || movies[0]
    );
    intrusoMovie.category = intrusoCategory;

    const movieSet = [...mainCategoryMovies, intrusoMovie];
    const shuffledSet = movieSet.sort(() => Math.random() - 0.5);

    setCurrentSet(shuffledSet);
    setIntruso(intrusoMovie);
  };

  const handleMovieSelect = (movie: MovieWithCategory) => {
    if (movie === intruso) {
      setScore(score + 10);
      generateMovieSet();
    } else {
      setTimeLeft(Math.max(0, timeLeft - 8));
    }
  };

  const restartGame = () => {
    setTimeLeft(60);
    setScore(0);
    setGameState('playing');
  };

  const renderMovieGrid = () => (
    <View style={styles.movieGrid}>
      {currentSet.map((movie, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.movieCard}
          onPress={() => handleMovieSelect(movie)}
        >
          <Image 
            source={{ uri: movie.posterPath }}
            style={styles.moviePoster}
            resizeMode="cover"
          />
          <Text style={styles.movieCategory}>{movie.category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEndGameModal = () => (
    <Modal
      transparent={true}
      visible={gameState === 'ended'}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <LinearGradient 
          colors={['#1a1a1a', '#2d1f3d']} 
          style={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Fim de Jogo!</Text>
          <Text style={styles.scoreText}>Pontuação: {score} pontos</Text>
          
          <TouchableOpacity 
            style={styles.restartButton} 
            onPress={restartGame}
          >
            <Text style={styles.restartButtonText}>Jogar Novamente</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.gameTitle}>Encontre o Filme Intruso</Text>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Tempo: {timeLeft}s</Text>
          <Text style={styles.statusText}>Pontos: {score}</Text>
        </View>
      </View>

      {renderMovieGrid()}
      {renderEndGameModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  gameTitle: {
    color: '#8B5CF6',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moviePoster: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    color: '#8B5CF6',
    fontSize: 20,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieCard: {
    width: '48%',
    aspectRatio: 2/3,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    position: 'relative',
  },
  movieCategory: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
  },
});

export default IntruderGame;