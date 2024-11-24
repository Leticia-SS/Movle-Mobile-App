import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Jogos', headerShown: false }}
      />
      <Stack.Screen
        name="games/game1"
        options={{ title: 'Jogo 1', headerShown: false, headerBackTitle: 'Voltar' }}
      />
      <Stack.Screen
        name="games/game2"
        options={{ title: 'Jogo 2', headerShown: false, headerBackTitle: 'Voltar' }}
      />
      <Stack.Screen
        name="games/game3"
        options={{ title: 'Jogo 3', headerShown: false, headerBackTitle: 'Voltar' }}
      />
      <Stack.Screen
        name="games/game4"
        options={{ title: 'Jogo 4', headerShown: false, headerBackTitle: 'Voltar' }}
      />
    </Stack>
  );
}
