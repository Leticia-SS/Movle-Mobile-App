import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function GameTabs() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um Jogo!</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/home/games/game1')}
        >
          <Text style={styles.cardTitle}>Jogo 1</Text>
          <Text style={styles.cardDescription}>Descrição do Jogo 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/home/games/game2')}
        >
          <Text style={styles.cardTitle}>Jogo 2</Text>
          <Text style={styles.cardDescription}>Descrição do Jogo 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/home/games/game3')}
        >
          <Text style={styles.cardTitle}>Jogo 3</Text>
          <Text style={styles.cardDescription}>Descrição do Jogo 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/home/games/game4')}
        >
          <Text style={styles.cardTitle}>Jogo 4</Text>
          <Text style={styles.cardDescription}>Descrição do Jogo 4</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardDescription: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#f44336',
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
