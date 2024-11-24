import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Jogos', headerShown: true }}
      />
      <Stack.Screen
        name="game1"
        options={{ title: 'Jogo 1', headerShown: true }}
      />
      <Stack.Screen
        name="game2"
        options={{ title: 'Jogo 2', headerShown: true }}
      />
      <Stack.Screen
        name="game3"
        options={{ title: 'Jogo 3', headerShown: true }}
      />
      <Stack.Screen
        name="game4"
        options={{ title: 'Jogo 4', headerShown: true }} 
      />
    </Stack>
  );
}
