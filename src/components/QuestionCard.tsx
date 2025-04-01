🔹 src/components/QuestionCard.tsx (hỗ trợ voice + hình minh hoạ)

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as Speech from 'expo-speech';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  question: string;
  options: string[];
  correctAnswer: string;
  selected: string | null;
  onSelect: (option: string) => void;
  image?: any;
  hotspots?: Hotspot[];
}

const QuestionCard = ({ question, options, correctAnswer, selected, onSelect, image, hotspots }: Props) => {
  useEffect(() => {
    if (question) {
      Speech.stop();
      Speech.speak(question);
    }
  }, [question]);

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>

      {image && hotspots ? (
        <ImageBackground source={image} style={styles.image}>
          {hotspots.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              style={[styles.spot, {
                top: spot.y,
                left: spot.x,
                width: spot.width,
                height: spot.height,
              }]}
              onPress={() => onSelect(spot.id)}
              disabled={!!selected}
            />
          ))}
        </ImageBackground>
      ) : (
        options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = selected && option === correctAnswer;
          const isWrong = selected && isSelected && option !== correctAnswer;

          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, isSelected && styles.selected, isCorrect && styles.correct, isWrong && styles.wrong]}
              onPress={() => onSelect(option)}
              disabled={!!selected}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#FFFBEA',
    borderRadius: 16,
    elevation: 2,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#E0E0E0',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  correct: {
    backgroundColor: '#C8E6C9',
  },
  wrong: {
    backgroundColor: '#FFCDD2',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 12,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  spot: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6,
  },
});
