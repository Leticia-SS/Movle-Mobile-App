import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import useMovies from '../../../components/MovieList';

const Game1 = () => {
  const { movies, loading, error } = useMovies();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    if (movies.length > 0 && questionIndex < 10) {
      generateQuestion();
    }
  }, [movies, questionIndex]);

  const generateQuestion = () => {
    if (movies.length === 0 || questionIndex >= 10) return;

    const movie = movies[questionIndex];
    const description = movie.overview;

    let options = [movie.title];
    while (options.length < 5) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      if (!options.includes(randomMovie.title)) {
        options.push(randomMovie.title);
      }
    }

    options = options.sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      description,
      options,
      correctAnswer: movie.title,
    });
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    if (questionIndex < 9) {
      setQuestionIndex(questionIndex + 1);
    } else {
      showFinalScore();
    }
  };

  const showFinalScore = () => {
    let result = '';
    if (score >= 0 && score <= 2) {
      result = 'Nem tentou';
    } else if (score >= 3 && score <= 5) {
      result = 'Sabe... mas sabe pouco';
    } else if (score >= 6 && score <= 9) {
      result = 'Quase lá';
    } else if (score === 10) {
      result = 'Excelente';
    }
    alert(`Sua pontuação final é: ${score} - ${result}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando perguntas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.description}</Text>
      <FlatList
        data={currentQuestion.options}
        renderItem={({ item }) => (
          <Button title={item} onPress={() => handleAnswer(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.scoreText}>Pontuação: {score}</Text>
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
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default Game1;
