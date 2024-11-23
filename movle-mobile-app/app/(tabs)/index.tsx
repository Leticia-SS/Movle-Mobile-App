// HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movle App!</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('/gameTabs')} 
      >
        <Text style={styles.cardTitle}>Jogar</Text>
        <Text style={styles.cardDescription}>Clique para explorar jogos!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
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
});
