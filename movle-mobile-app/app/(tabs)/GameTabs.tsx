import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GameTabs() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Escolha um Jogo</Text>

      <View style={styles.cardContainer}>
        {['Jogo 1', 'Jogo 2', 'Jogo 3', 'Jogo 4'].map((game, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{game}</Text>
            <Text style={styles.cardDescription}>Clique para saber mais sobre {game}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#2196F3',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    color: '#fff',
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
  },
});
