import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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

const TestScreen = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileMap: any = {
    'addition.json': require('../assets/data/toan/addition.json'),
    'subtraction.json': require('../assets/data/toan/subtraction.json'),
    'comparison.json': require('../assets/data/toan/comparison.json'),
    'pattern.json': require('../assets/data/toan/pattern.json'),
    'arrange.json': require('../assets/data/toan/arrange.json'),
    'find-missing.json': require('../assets/data/toan/find-missing.json'),
    'height.json': require('../assets/data/toan/height.json'),
    'position.json': require('../assets/data/toan/position.json'),
    'counting.json': require('../assets/data/toan/counting.json'),
    'quantity-compare.json': require('../assets/data/toan/quantity-compare.json'),
  };

  const shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5);

  const loadQuestions = async () => {
    setLoading(true);
    let all: Question[] = [];

    for (const file of allTopicFiles) {
      const res = await fetch(fileMap[file]);
      const data = await res.json();
      all.push(...data);
    }

    const randomQuestions = shuffle(all).slice(0, 10);
    setQuestions(randomQuestions);
    setLoading(false);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

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
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    loadQuestions();
  };

  if (loading || questions.length === 0) {
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

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  progress: {
    fontSize: 16,
    marginBottom: 12,
    color: '#666',
  },
});
