import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

const alphabet = [
  'a', 'ă', 'â', 'b', 'c', 'd', 'đ', 'e', 'ê',
  'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'ô',
  'ơ', 'p', 'q', 'r', 's', 't', 'u', 'ư', 'v',
  'x', 'y'
];

export default function AlphabetScreen() {
  const [index, setIndex] = useState(0);

  const currentLetter = alphabet[index];

  const speak = () => {
    Speech.speak(currentLetter, {
      language: 'vi-VN',
      rate: 0.7
    });
  };

  const next = () => {
    if (index + 1 < alphabet.length) {
      setIndex(index + 1);
    } else {
      setIndex(0); // học lại từ đầu
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chữ cái:</Text>
      <Text style={styles.letter}>{currentLetter}</Text>
      <Button title="Phát âm" onPress={speak} />
      <View style={{ marginTop: 20 }}>
        <Button title="Tiếp theo" onPress={next} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 10 },
  letter: {
    fontSize: 100,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  }
});
