import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Switch } from 'react-native';
import * as Speech from 'expo-speech';

const alphabet = [
  'a', 'ă', 'â', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g',
  'h', 'i', 'k', 'l', 'm', 'n', 'o', 'ô', 'ơ',
  'p', 'q', 'r', 's', 't', 'u', 'ư', 'v', 'x', 'y'
];

function getRandomLetter(current: string): string {
  let newLetter = current;
  while (newLetter === current) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    newLetter = alphabet[randomIndex];
  }
  return newLetter;
}

export default function AlphabetScreen() {
  const [index, setIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const currentLetter = alphabet[index];

  useEffect(() => {
    Speech.speak(currentLetter, { language: 'vi-VN' });
  }, [index]);

  const handleNext = () => {
    if (shuffle) {
      const random = getRandomLetter(currentLetter);
      const newIndex = alphabet.findIndex((ch) => ch === random);
      setIndex(newIndex);
    } else {
      setIndex((prev) => (prev + 1) % alphabet.length);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleNext}>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>🔀 Trộn chữ cái</Text>
          <Switch value={shuffle} onValueChange={setShuffle} />
        </View>

        <Text style={styles.letter}>{currentLetter}</Text>
        <Text style={styles.instruction}>👆 Chạm màn hình để học chữ tiếp theo</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fffdf2',
    justifyContent: 'center', alignItems: 'center', padding: 20
  },
  switchContainer: {
    position: 'absolute', top: 50, right: 20,
    flexDirection: 'row', alignItems: 'center'
  },
  switchLabel: { marginRight: 8, fontSize: 16 },
  letter: {
    fontSize: 100, fontWeight: 'bold', color: '#333'
  },
  instruction: {
    marginTop: 30,
    fontSize: 16,
    color: '#888',
    textAlign: 'center'
  }
});
