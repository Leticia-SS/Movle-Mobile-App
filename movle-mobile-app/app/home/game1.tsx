import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Game1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo 1</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
  },
});
