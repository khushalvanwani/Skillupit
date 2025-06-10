import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useQuiz } from './QuizContext';
import { useNavigation } from '@react-navigation/native';

const QUIZ_TIME = 10 * 60; // 10 minutes

function mapQuestions(rawQuestions) {
  if (!Array.isArray(rawQuestions)) return [];
  return rawQuestions.map((q, idx) => {
    let question = q.question || q.question_text || q.ques || q.text || `Q${idx + 1}`;
    let options = 
      q.options && Array.isArray(q.options) ? q.options :
      [q.option1, q.option2, q.option3, q.option4].filter(Boolean);
    if (!Array.isArray(options) || options.length === 0) {
      options = [q.a, q.b, q.c, q.d].filter(Boolean);
    }
    return {
      id: q.id || idx,
      question,
      options,
    };
  });
}

export default function QuizScreen() {
  const { questions, loading } = useQuiz();
  const navigation = useNavigation();

  const mappedQuestions = mapQuestions(questions);

  const [showInstructions, setShowInstructions] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(QUIZ_TIME);
  const [bookmarked, setBookmarked] = useState({});

  // Timer effect
  useEffect(() => {
    if (showInstructions) return;
    if (timer <= 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, showInstructions]);

  // Handle answer selection
  const handleAnswer = (qid, optIdx) => {
    setAnswers(prev => ({ ...prev, [qid]: optIdx }));
  };

  // Clear answer
  const handleClear = (qid) => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[qid];
      return copy;
    });
  };

  // Bookmark question
  const handleBookmark = (qid) => {
    setBookmarked(prev => ({ ...prev, [qid]: !prev[qid] }));
  };

  // Navigation
  const handleNext = () => {
    if (current < mappedQuestions.length - 1) setCurrent(current + 1);
  };
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };
  const goTo = (idx) => setCurrent(idx);

  // Submit
  function handleSubmit() {
    Alert.alert("Quiz Submitted", "Your answers have been submitted!");
    navigation.goBack();
  }

  // Loading/Instructions/No Questions
  if (loading) {
    return <Text style={{ color: '#222', textAlign: 'center', marginTop: 50 }}>Loading questions...</Text>;
  }
  if (showInstructions) {
    return (
      <SafeAreaView style={styles.instructionsBg}>
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsHeader}>Quiz Instructions</Text>
          <Text style={styles.instructionsText}>• Total number of questions: {mappedQuestions.length}</Text>
          <Text style={styles.instructionsText}>• You have 10 minutes to complete the quiz.</Text>
          <Text style={styles.instructionsText}>• Timer will show remaining time.</Text>
          <Text style={styles.instructionsText}>• Select the correct answer for each question.</Text>
          <Text style={styles.instructionsText}>• You can bookmark questions and jump to any.</Text>
          <Text style={styles.instructionsText}>• Submit before timer runs out!</Text>
          <Pressable style={styles.startBtn} onPress={() => setShowInstructions(false)}>
            <Text style={styles.startBtnText}>Start Test</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  if (!mappedQuestions || mappedQuestions.length === 0) {
    return <Text style={{ color: '#222', textAlign: 'center', marginTop: 50 }}>No Questions Found. Please try another topic.</Text>;
  }

  // Current question
  const q = mappedQuestions[current];
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <SafeAreaView style={styles.quizBg}>
      {/* Timer */}
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>
          {String(Math.floor(timer / 60)).padStart(2, '0')}:
          {String(timer % 60).padStart(2, '0')}
        </Text>
      </View>

      {/* Question Card */}
      <ScrollView style={styles.questionCard}>
        <Text style={styles.questionText}>{current + 1}. {q.question}</Text>
        {q.options.map((opt, idx) => (
          <Pressable
            key={idx}
            style={[
              styles.option,
              answers[q.id] === idx && styles.selectedOption
            ]}
            onPress={() => handleAnswer(q.id, idx)}
          >
            <Text style={styles.optionLetter}>{letters[idx] || ''}</Text>
            <Text style={styles.optionText}>{opt}</Text>
          </Pressable>
        ))}
        {/* Clear answer */}
        {answers[q.id] !== undefined &&
          <Pressable style={styles.clearBtn} onPress={() => handleClear(q.id)}>
            <Text style={styles.clearBtnText}>Clear Answer</Text>
          </Pressable>
        }
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.btnRow}>
        <Pressable style={styles.quizBtn} onPress={handlePrev} disabled={current === 0}>
          <Text style={styles.btnLabel}>Prev</Text>
        </Pressable>
        <Pressable style={styles.quizBtn} onPress={() => handleBookmark(q.id)}>
          <Text style={[styles.btnLabel, bookmarked[q.id] && { color: '#f863b5' }]}>Bookmark</Text>
        </Pressable>
        <Pressable style={styles.quizBtn} onPress={handleNext} disabled={current === mappedQuestions.length - 1}>
          <Text style={styles.btnLabel}>Next</Text>
        </Pressable>
        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnLabel}>Submit</Text>
        </Pressable>
      </View>

      {/* Jump to Question */}
      <FlatList
        data={mappedQuestions}
        horizontal={false}
        numColumns={5}
        keyExtractor={(_, idx) => '' + idx}
        style={styles.numberGrid}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item, index }) => (
          <Pressable
            style={[
              styles.numberBox,
              index === current && styles.currentBox,
              bookmarked[item.id] && styles.bookmarkedBox,
              answers[item.id] !== undefined && styles.answeredBox,
            ]}
            onPress={() => goTo(index)}
          >
            <Text style={styles.numberText}>{index + 1}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  instructionsBg: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  instructionsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    elevation: 3,
    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: 'center',
    width: '85%',
  },
  instructionsHeader: { fontWeight: 'bold', fontSize: 28, color: '#193974', marginBottom: 16 },
  instructionsText: { fontSize: 17, marginVertical: 2, color: '#222', textAlign: 'left' },
  startBtn: { backgroundColor: '#193974', padding: 12, borderRadius: 7, marginTop: 18 },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  quizBg: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingVertical: 14 },
  timerBox: { backgroundColor: '#fff', alignSelf: 'flex-start', marginLeft: 20, borderRadius: 9, marginTop: 12, padding: 7 },
  timerText: { color: '#e33690', fontSize: 23, fontWeight: 'bold', fontFamily: 'monospace' },

  questionCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    width: '90%',
    elevation: 1,
    shadowColor: '#222',
    padding: 20,
    marginBottom: 16,
    maxHeight: 350,
  },
  questionText: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#193974' },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5fa',
    borderRadius: 12,
    padding: 13,
    marginVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    borderColor: '#c84490',
    backgroundColor: '#fbe9f6',
  },
  optionLetter: {
    fontWeight: 'bold',
    color: '#c84490',
    marginRight: 12,
    fontSize: 17,
  },
  optionText: { fontSize: 16, color: '#222' },
  clearBtn: {
    backgroundColor: '#f863b5',
    marginTop: 8,
    borderRadius: 7,
    alignSelf: 'flex-end',
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  clearBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 7,
    width: '90%',
  },
  quizBtn: {
    backgroundColor: '#ede0fc',
    padding: 10,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  submitBtn: {
    backgroundColor: '#3f3ffc',
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  btnLabel: { fontWeight: 'bold', color: '#222', fontSize: 16 },

  numberGrid: { marginTop: 17, marginBottom: 12, width: '100%' },
  numberBox: {
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fafaff',
    borderRadius: 9,
    padding: 12,
    width: 44,
    alignItems: 'center',
    margin: 4,
  },
  currentBox: { borderColor: '#c84490', backgroundColor: '#fbe9f6' },
  bookmarkedBox: { borderColor: '#f863b5' },
  answeredBox: { backgroundColor: '#e5ffde', borderColor: '#5ad173' },
  numberText: { fontWeight: 'bold', color: '#193974', fontSize: 15 },
});