import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// Danh sách câu hỏi mẫu từ 3 chủ đề
const allQuestions = [
  // Toán học
  { id: 'q1', question: '1 + 2 = ?', options: ['2', '3', '4'], answer: '3' },
  { id: 'q2', question: '5 - 3 = ?', options: ['1', '2', '3'], answer: '2' },
  // Chữ cái
  { id: 'q3', question: 'Chữ nào đứng sau "b"?', options: ['c', 'd', 'a'], answer: 'c' },
  { id: 'q4', question: 'Chữ nào trước "e"?', options: ['d', 'g', 'f'], answer: 'd' },
  // Ghép vần
  { id: 'q5', question: 'b + a = ?', options: ['ba', 'ab', 'bo'], answer: 'ba' },
  { id: 'q6', question: 'c + o = ?', options: ['oc', 'co', 'cu'], answer: 'co' }
];

export default function PracticeScreen() {
  const [numQuestions, setNumQuestions] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

  const startPractice = (count: number) => {
    const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, count);
    setShuffledQuestions(shuffled);
    setNumQuestions(count);
    setCurrentIndex(0);
    setSelectedAnswers([]);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswers([...selectedAnswers, answer]);
    if (currentIndex + 1 < (numQuestions || 0)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getScore = () => {
    return shuffledQuestions.reduce((score, q, idx) => {
      return q.answer === selectedAnswers[idx] ? score + 1 : score;
    }, 0);
  };

  if (!numQuestions) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bạn muốn luyện tập bao nhiêu câu?</Text>
        {[5, 10, 15].map((num) => (
          <TouchableOpacity key={num} style={styles.choiceBtn} onPress={() => startPractice(num)}>
            <Text style={styles.choiceText}>{num} câu</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const currentQuestion = shuffledQuestions[currentIndex];
  const isFinished = selectedAnswers.length === numQuestions;

  return (
    <View style={styles.container}>
      {!isFinished ? (
        <>
          <Text style={styles.title}>Câu {currentIndex + 1}/{numQuestions}</Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          <FlatList
            data={currentQuestion.options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.optionBtn} onPress={() => handleAnswer(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <View style={styles.resultBox}>
          <Text style={styles.title}>Hoàn thành rồi!</Text>
          <Text style={styles.score}>
            Bạn đúng {getScore()} / {numQuestions} câu 🎉
          </Text>
          <TouchableOpacity style={styles.choiceBtn} onPress={() => setNumQuestions(null)}>
            <Text style={styles.choiceText}>Làm lại</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  choiceBtn: {
    backgroundColor: '#ffd966',
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: 'center'
  },
  choiceText: { fontSize: 18, fontWeight: '600' },
  question: { fontSize: 20, textAlign: 'center', marginBottom: 16 },
  optionBtn: {
    backgroundColor: '#fef4d3',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: 'center'
  },
  optionText: { fontSize: 18 },
  resultBox: { alignItems: 'center', gap: 12 },
  score: { fontSize: 24, fontWeight: 'bold', color: '#28c76f' }
});
