import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

const CONSONANTS = ['b', 'm', 'v', 'd', 'n', 'l'];
const VOWELS = ['a', 'o', 'ô', 'e', 'ă', 'u'];

export default function SyllableScreen() {
  const [consonant, setConsonant] = useState('');
  const [vowel, setVowel] = useState('');

  const fullWord = consonant + vowel;

  const speak = () => {
    if (fullWord.length > 0) {
      Speech.speak(fullWord, {
        language: 'vi-VN',
        rate: 0.7
      });
    }
  };

  const reset = () => {
    setConsonant('');
    setVowel('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ghép vần</Text>

      <Text style={styles.label}>Chọn âm đầu:</Text>
      <View style={styles.row}>
        {CONSONANTS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.button, consonant === c && styles.selected]}
            onPress={() => setConsonant(c)}
          >
            <Text style={styles.buttonText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Chọn vần:</Text>
      <View style={styles.row}>
        {VOWELS.map((v) => (
          <TouchableOpacity
            key={v}
            style={[styles.button, vowel === v && styles.selected]}
            onPress={() => setVowel(v)}
          >
            <Text style={styles.buttonText}>{v}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.result}>Kết quả: <Text style={styles.word}>{fullWord}</Text></Text>

      <View style={styles.actions}>
        <Button title="Phát âm" onPress={speak} />
        <View style={{ height: 10 }} />
        <Button title="Ghép từ mới" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 18, marginVertical: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10
  },
  selected: {
    backgroundColor: '#ffd966'
  },
  buttonText: { fontSize: 20 },
  result: { fontSize: 18, marginVertical: 20 },
  word: { fontWeight: 'bold', fontSize: 24, color: '#333' },
  actions: { marginTop: 10 }
});
