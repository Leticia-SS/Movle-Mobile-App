import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Game1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Jogo 1!</Text>
    </View>
  );
}

export const options = {
  headerShown: false,
};

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
});
