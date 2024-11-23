import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#3b0c4f' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo3.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Movle!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('GameTabs')}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Jogar</Text>
            <Text style={styles.cardDescription}>Clique para explorar jogos!</Text>
          </View>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  cardContainer: {
    marginTop: 20,
    padding: 15,
  },
  card: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
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
