import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

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
          onPress: () => {
            if (index + 1 < questions.length) {
              setIndex(index + 1);
            } else {
              Alert.alert('Hoàn thành!', 'Bé đã làm xong bài học.');
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  question: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  option: {
    backgroundColor: '#ffecb3',
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: 'center'
  },
  optionText: { fontSize: 20 }
});
