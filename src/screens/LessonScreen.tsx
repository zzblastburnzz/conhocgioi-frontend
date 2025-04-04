import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import QuestionCard from '../components/QuestionCard';
import ResultCard from '../components/ResultCard';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

const LessonScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { fileName, title } = route.params;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

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

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(fileMap[fileName]);
      const data = await res.json();
      setQuestions(data);
    };
    loadData();
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
  };

  if (questions.length === 0) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  if (showResult) {
    return (
      <ResultCard
        score={score}
        total={questions.length}
        onRetry={handleRestart}
        onBack={() => navigation.navigate('Math')}
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

export default LessonScreen;

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
