import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  selected: string | null;
  onSelect: (option: string) => void;
}

const QuestionCard = ({ question, options, correctAnswer, selected, onSelect }: QuestionCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => {
        const isCorrect = selected && option === correctAnswer;
        const isWrong = selected && option === selected && option !== correctAnswer;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              isCorrect && styles.correct,
              isWrong && styles.wrong
            ]}
            onPress={() => onSelect(option)}
            disabled={!!selected}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  option: {
    backgroundColor: '#FFE4B5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  correct: {
    backgroundColor: '#A0E7A0',
  },
  wrong: {
    backgroundColor: '#F8A5A5',
  },
});
