import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import QuestionCard from '../components/QuestionCard';
import ResultCard from '../components/ResultCard';

const allTopicFiles = [
  'addition.json',
  'subtraction.json',
  'comparison.json',
  'pattern.json',
  'arrange.json',
  'find-missing.json',
  'height.json',
  'position.json',
  'counting.json',
  'quantity-compare.json',
];

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

const PracticeScreen = () => {
  const [numQuestions, setNumQuestions] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5);

  const loadQuestions = async (total: number) => {
    setLoading(true);
    let all: Question[] = [];

    for (const file of allTopicFiles) {
      const filePath = require(`../assets/data/toan/${file}`);
      const res = await fetch(filePath);
      const data = await res.json();
      all.push(...data);
    }

    const randomQuestions = shuffle(all).slice(0, total);
    setQuestions(randomQuestions);
    setLoading(false);
  };

  const startPractice = async (num: number) => {
    setNumQuestions(num);
    await loadQuestions(num);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 700);
  };

  const handleRestart = () => {
    setNumQuestions(null);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  if (!numQuestions) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📝 Bạn muốn luyện bao nhiêu câu?</Text>
        {[5, 10, 15].map((n) => (
          <TouchableOpacity key={n} style={styles.choiceButton} onPress={() => startPractice(n)}>
            <Text style={styles.buttonText}>{n} câu hỏi</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  if (showResult) {
    return (
      <ResultCard
        score={score}
        total={questions.length}
        onRetry={handleRestart}
        onBack={handleRestart}
      />
    );
  }

  const q = questions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Câu {current + 1}/{questions.length}</Text>
      <QuestionCard
        question={q.question}
        options={q.options}
        correctAnswer={q.answer}
        selected={selected}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: '#FFD580',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  progress: {
    fontSize: 16,
    marginBottom: 12,
    color: '#666',
  },
});
