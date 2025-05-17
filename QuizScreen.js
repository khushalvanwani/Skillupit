import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import allQuestions from './cpp_questions.json'; // Or your appropriate subject JSON

const QuizScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subject } = route.params || {};
  const { isDarkMode } = useContext(ThemeContext);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [finished, setFinished] = useState(false);
  // Timer: 5 minutes = 300 seconds
  const [timeLeft, setTimeLeft] = useState(300);

  // Timer effect: decrement every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds as mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  // Load 30 random questions when the component mounts
  useEffect(() => {
    if (allQuestions && allQuestions.length >= 30) {
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 30);
      setQuizQuestions(selected);
    }
  }, []);

  const handleAnswer = (option) => {
    if (!quizQuestions.length) return;
    if (option === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(option);
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setFinished(true);
      }
      setSelectedAnswer(null);
    }, 1000);
  };

  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#121212';
  const optionButtonDefault = isDarkMode ? '#1E1E1E' : '#f0f0f0';

  if (quizQuestions.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.question, { color: textColor }]}>Loading questions...</Text>
      </View>
    );
  }

  if (finished) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.question, { color: textColor }]}>Quiz Completed!</Text>
        <Text style={[styles.score, { color: textColor }]}>
          Your Score: {score} / {quizQuestions.length}
        </Text>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.navigate('Options')}
        >
          <Text style={styles.buttonText}>Return to Options</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Timer Display now as part of the centered content */}
      <Text style={[styles.timerText, { color: textColor }]}>{formatTime(timeLeft)}</Text>
      
      {/* Quiz Content */}
      <Text style={[styles.progress, { color: textColor }]}>
        Question {currentQuestionIndex + 1} / {quizQuestions.length}
      </Text>
      <Text style={[styles.question, { color: textColor }]}>
        {quizQuestions[currentQuestionIndex].question}
      </Text>
      {quizQuestions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            { backgroundColor: optionButtonDefault },
            selectedAnswer === option && {
              backgroundColor: option === quizQuestions[currentQuestionIndex].answer ? 'green' : 'red',
            },
          ]}
          onPress={() => handleAnswer(option)}
          disabled={selectedAnswer !== null}
        >
          <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
        </TouchableOpacity>
      ))}
      <Text style={[styles.score, { color: textColor }]}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center', // centers content vertically
  },
  timerText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  progress: {
    fontSize: 18,
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  score: {
    fontSize: 18,
    marginTop: 20,
  },
  returnButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;
