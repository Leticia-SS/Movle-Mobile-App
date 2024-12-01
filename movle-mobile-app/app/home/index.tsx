import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

export default function GameTabs() {
  const router = useRouter();

  return (
  <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha um Jogo!</Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/home/games/game1')}
          >
            <Text style={styles.cardTitle}>Adivinhe!</Text>
            <Text style={styles.cardDescription}>Adivinhe o nome do filme pela sinopse.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/home/games/game2')}
          >
            <Text style={styles.cardTitle}>Quem é o intruso?</Text>
            <Text style={styles.cardDescription}>Selecione o único dos filmes que tem uma categoria diferente.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/home/games/game3')}
          >
            <Text style={styles.cardTitle}>Jogo 3</Text>
            <Text style={styles.cardDescription}>Em Breve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/home/games/game4')}
          >
            <Text style={styles.cardTitle}>Jogo 4</Text>
            <Text style={styles.cardDescription}>Em Breve</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 20,
  },
  cardContainer: {
    marginTop: 20,
    width: '100%',
  },
  card: {
    backgroundColor: '#2d1f3d',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    elevation: 5,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardDescription: {
    color: '#8B5CF6',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#2d1f3d',
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    elevation: 5,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});