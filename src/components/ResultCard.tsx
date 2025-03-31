import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ResultCardProps {
  score: number;
  total: number;
  onRetry: () => void;
  onBack: () => void;
}

const ResultCard = ({ score, total, onRetry, onBack }: ResultCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Hoàn thành rồi!</Text>
      <Text style={styles.score}>Bạn đúng {score}/{total} câu 🎉</Text>

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>🔁 Làm lại</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={onBack}>
        <Text style={styles.buttonText}>🏠 Về trang chính</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFDE7',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#4CAF50',
  },
  score: {
    fontSize: 20,
    marginBottom: 30,
    color: '#2E7D32',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#89CFF0',
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
    width: '70%',
  },
  backButton: {
    backgroundColor: '#FFB84C',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
