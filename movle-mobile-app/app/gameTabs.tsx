import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GameTabs({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um Jogo!</Text>

      <View style={styles.cardContainer}>
        {[1, 2, 3, 4].map((game) => (
          <TouchableOpacity key={game} style={styles.card}>
            <Text style={styles.cardTitle}>Jogo {game}</Text>
            <Text style={styles.cardDescription}>Descrição do Jogo {game}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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

