import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateProgress } from '../utils/progress';

const questions = [
  { question: '1 + 1 = ?', correctAnswer: '2', options: ['1', '2', '3'] },
  { question: '2 + 3 = ?', correctAnswer: '5', options: ['4', '5', '6'] },
  { question: '5 - 2 = ?', correctAnswer: '3', options: ['2', '3', '4'] }
];

export default function MathScreen() {
  const [index, setIndex] = useState(0);
  const current = questions[index];

  const handleAnswer = (option: string) => {
    if (option === current.correctAnswer) {
      Alert.alert('Chính xác!', '', [
        {
          text: 'Tiếp tục',
          onPress: async () => {
            if (index + 1 < questions.length) {
              setIndex(index + 1);
            } else {
              await updateProgress('Bon', 'Toán');
              Alert.alert('Hoàn thành!', 'Bé đã làm xong bài Toán.');
              setIndex(0);
            }
          }
        }
      ]);
    } else {
      Alert.alert('Sai rồi!', 'Thử lại nhé!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{current.question}</Text>
      {current.options.map((opt) => (
        <TouchableOpacity key={opt} style={styles.option} onPress={() => handleAnswer(opt)}>
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.progress}>Câu {index + 1} / {questions.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  question: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  option: {
    backgroundColor: '#d9f8ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5
  },
  optionText: { fontSize: 18 },
  progress: { marginTop: 20, textAlign: 'center', color: '#666' }
});
