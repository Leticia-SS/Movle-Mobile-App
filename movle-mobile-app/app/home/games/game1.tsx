import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Modal, ScrollView } from 'react-native';
import useMovies from '../../../components/MovieList';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GameResult {
  score: number;
  date: string;
  result: string;
}

const Game1 = () => {
  const { movies, loading, error } = useMovies();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [lastScore, setLastScore] = useState<GameResult | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    description: string;
    options: string[];
    correctAnswer: string;
  } | null>(null);

  useEffect(() => {
    loadLastScore();
  }, []);

  useEffect(() => {
    if (movies.length > 0 && questionIndex < 10) {
      generateQuestion();
    }
  }, [movies, questionIndex]);

  const loadLastScore = async () => {
    try {
      const savedScore = await AsyncStorage.getItem('lastGameScore');
      if (savedScore) {
        setLastScore(JSON.parse(savedScore));
      }
    } catch (error) {
      console.error('Error loading last score:', error);
    }
  };

  const saveScore = async (newScore: GameResult) => {
    try {
      await AsyncStorage.setItem('lastGameScore', JSON.stringify(newScore));
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const generateQuestion = () => {
    if (movies.length === 0 || questionIndex >= 10) return;

    const movie = movies[Math.floor(Math.random() * movies.length)];
    const description = movie.overview;

    let options = [movie.title];
    while (options.length < 4) {
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

  const getResultMessage = (score: number): string => {
    if (score >= 0 && score <= 2) return 'Nem tentou';
    if (score >= 3 && score <= 5) return 'Sabe... mas sabe pouco';
    if (score >= 6 && score <= 9) return 'Quase lá';
    return 'Excelente';
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (questionIndex < 9) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const newResult: GameResult = {
        score: score + (isCorrect ? 1 : 0),
        date: new Date().toLocaleDateString(),
        result: getResultMessage(score + (isCorrect ? 1 : 0))
      };
      saveScore(newResult);
      setGameEnded(true);
      setShowModal(true);
    }
  };

  const playAgain = () => {
    setQuestionIndex(0);
    setScore(0);
    setGameEnded(false);
    setShowModal(false);
    loadLastScore();
  };

  const ScoreModal = () => (
    <Modal
      transparent={true}
      visible={showModal}
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <ScrollView 
          contentContainerStyle={styles.modalScrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fim de Jogo!</Text>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.currentScoreText}>
                Pontuação: {score}/10
                {'\n'}
                {getResultMessage(score)}
              </Text>
              
              {lastScore && (
                <View style={styles.comparisonContainer}>
                  <Text style={styles.lastScoreText}>
                    Última Pontuação: {lastScore.score}/10
                    {'\n'}
                    {lastScore.result}
                    {'\n'}
                  </Text>
                  
                  <Text style={styles.comparisonText}>
                    {score > lastScore.score 
                      ? '🎉 Você melhorou!'
                      : score < lastScore.score 
                      ? '😢 Continue tentando!'
                      : '🤝 Mesmo resultado!'}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.playAgainButton}
              onPress={playAgain}
            >
              <Text style={styles.playAgainText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <ScrollView 
        contentContainerStyle={styles.centered}
        keyboardShouldPersistTaps="handled"
      >
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>Carregando perguntas...</Text>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <ScrollView 
        contentContainerStyle={styles.centered}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.errorText}>{error}</Text>
      </ScrollView>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerContainer}>
        <Text style={styles.gameTitle}>Adivinhe o filme pela sua descrição</Text>
        <Text style={styles.questionCounter}>
          {questionIndex + 1}/10
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.description}</Text>
      </View>

      <FlatList
        data={currentQuestion.options}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleAnswer(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.optionsList}
      />

      <ScoreModal />
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
    paddingTop: 20,
    alignItems: 'center',
  },
  gameTitle: {
    color: '#8B5CF6',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionCounter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2d1f3d',
  },
  questionText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 24,
  },
  optionsList: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#2d1f3d',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#2d1f3d',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreContainer: {
    marginBottom: 20,
  },
  currentScoreText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  comparisonContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 8,
    padding: 15,
  },
  lastScoreText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  comparisonText: {
    color: '#8B5CF6',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  playAgainButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  playAgainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Game1;