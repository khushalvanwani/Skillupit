import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuiz } from '../Context/QuizContext';
import { useAuth } from '../Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const QUIZ_TIME = 10 * 60; // 10 min

/* ------------------------------------------------------------------ */
/*  MAP RAW QUESTIONS → { id, question, options[] }                   */
/* ------------------------------------------------------------------ */
function mapQuestions(rawQuestions) {
  if (!Array.isArray(rawQuestions)) return [];

  return rawQuestions.map((q, idx) => {
    const question =
      q.question || q.question_text || q.ques || q.text || `Q${idx + 1}`;

    let options = [];

    /* already an array? */
    if (Array.isArray(q.options) && q.options.length) {
      options = q.options;
    }
    /* string like "['A','B',…]" */
    else if (typeof q.options === 'string' && q.options.trim()) {
      try {
        options = JSON.parse(q.options.replace(/'/g, '"'));
      } catch {
        options = q.options
          .replace(/^\[|\]$/g, '')
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean);
      }
    }
    /* fall-back keys */
    if (!options.length) {
      options = [
        q.option1, q.option2, q.option3, q.option4,
        q.option_1, q.option_2, q.option_3, q.option_4,
        q.a, q.b, q.c, q.d,
      ].filter(Boolean);
    }

    return { id: q.id ?? idx, question, options };
  });
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */
export default function QuizScreen() {
  const { questions, loading, fetchQuestions, setQuestions } = useQuiz();
  const { token } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  const mappedQuestions = mapQuestions(questions);

  const [showInstructions, setShowInstructions] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(QUIZ_TIME);
  const [bookmarked, setBookmarked] = useState({});

  /* ───── fetch questions on mount ───── */
  useEffect(() => {
    async function loadQuestions() {
      if (route.params?.topicCode && token) {
        await fetchQuestions(token, route.params.topicCode);
      } else if (route.params?.subject) {
        let data = [];
        const subj = route.params.subject.toLowerCase();
        if (subj.includes('javascript')) {
          data = require('./js_questions.json');
        } else if (subj.includes('c++') || subj.includes('cpp')) {
          data = require('./cpp_questions.json');
        }
        if (data.length) setQuestions(data);
      }
    }
    loadQuestions();
  }, [route.params, token]);

  /* ───── DEBUG: see raw payload ───── */
  useEffect(() => {
    if (questions?.length) {
      console.log('first raw question:', questions[0]);
    }
  }, [questions]);

  /* ───── count-down timer ───── */
  useEffect(() => {
    if (showInstructions) return;
    if (timer <= 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, showInstructions]);

  /* ───── handlers ───── */
  const handleAnswer = (qid, idx) => setAnswers((p) => ({ ...p, [qid]: idx }));
  const handleClear = (qid) =>
    setAnswers((p) => {
      const c = { ...p };
      delete c[qid];
      return c;
    });
  const handleBookmark = (qid) =>
    setBookmarked((p) => ({ ...p, [qid]: !p[qid] }));

  const handlePrev = () => current > 0 && setCurrent((i) => i - 1);
  const handleNext = () =>
    current < mappedQuestions.length - 1 && setCurrent((i) => i + 1);
  const goTo = (idx) => setCurrent(idx);

  function handleSubmit() {
    Alert.alert('Quiz Submitted', 'Your answers have been submitted!');
    navigation.goBack();
  }

  /* ───── early returns ───── */
  if (loading) {
    return (
      <Text style={{ color: '#222', textAlign: 'center', marginTop: 50 }}>
        Loading questions…
      </Text>
    );
  }

  if (showInstructions) {
    return (
      <SafeAreaView style={styles.instructionsBg}>
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsHeader}>Quiz Instructions</Text>
          <Text style={styles.instructionsText}>
            • Total number of questions: {mappedQuestions.length}
          </Text>
          <Text style={styles.instructionsText}>
            • You have 10&nbsp;minutes to complete the quiz.
          </Text>
          <Text style={styles.instructionsText}>
            • Timer will show remaining time.
          </Text>
          <Text style={styles.instructionsText}>
            • Select the correct answer for each question.
          </Text>
          <Text style={styles.instructionsText}>
            • You can bookmark questions and jump to any.
          </Text>
          <Text style={styles.instructionsText}>
            • Submit before timer runs out!
          </Text>
          <Pressable
            style={styles.startBtn}
            onPress={() => setShowInstructions(false)}
          >
            <Text style={styles.startBtnText}>Start Test</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!mappedQuestions.length) {
    return (
      <Text style={{ color: '#222', textAlign: 'center', marginTop: 50 }}>
        No Questions Found. Please try another topic.
      </Text>
    );
  }

  /* ───── render main quiz ───── */
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
        <Text style={styles.questionText}>
          {current + 1}. {q.question}
        </Text>

        {q.options.map((opt, idx) => (
          <Pressable
            key={idx}
            style={[
              styles.option,
              answers[q.id] === idx && styles.selectedOption,
            ]}
            onPress={() => handleAnswer(q.id, idx)}
          >
            <Text style={styles.optionLetter}>{letters[idx] || ''}</Text>
            <Text style={styles.optionText}>{opt}</Text>
          </Pressable>
        ))}

        {answers[q.id] !== undefined && (
          <Pressable style={styles.clearBtn} onPress={() => handleClear(q.id)}>
            <Text style={styles.clearBtnText}>Clear Answer</Text>
          </Pressable>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.btnRow}>
        <Pressable
          style={styles.quizBtn}
          onPress={handlePrev}
          disabled={current === 0}
        >
          <Text style={styles.btnLabel}>Prev</Text>
        </Pressable>

        <Pressable style={styles.quizBtn} onPress={() => handleBookmark(q.id)}>
          <Text
            style={[
              styles.btnLabel,
              bookmarked[q.id] && { color: '#f863b5' },
            ]}
          >
            Bookmark
          </Text>
        </Pressable>

        <Pressable
          style={styles.quizBtn}
          onPress={handleNext}
          disabled={current === mappedQuestions.length - 1}
        >
          <Text style={styles.btnLabel}>Next</Text>
        </Pressable>

        {/* GRADIENT SUBMIT BUTTON */}
        <LinearGradient
          colors={['#ff6ec4', '#7873f5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.submitGradient}
        >
          <Pressable style={styles.submitTap} onPress={handleSubmit}>
            <Text style={[styles.btnLabel, { color: '#fff' }]}>Submit</Text>
          </Pressable>
        </LinearGradient>
      </View>

      {/* Jump Grid */}
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

/* ------------------------------------------------------------------ */
/*  STYLES                                                            */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  /* instructions modal ------------------------------------------------ */
  instructionsBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
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
  instructionsHeader: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#193974',
    marginBottom: 16,
  },
  instructionsText: {
    fontSize: 17,
    marginVertical: 2,
    color: '#222',
    textAlign: 'left',
  },
  startBtn: {
    backgroundColor: '#193974',
    padding: 12,
    borderRadius: 7,
    marginTop: 18,
  },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  /* main screen ------------------------------------------------------- */
  quizBg: {
    flex: 1,
    backgroundColor: '#f9f9ff', // soft off-white
    alignItems: 'center',
    paddingVertical: 14,
  },
  timerBox: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
    borderRadius: 9,
    marginTop: 12,
    padding: 7,
    elevation: 2,
  },
  timerText: {
    color: '#e33690',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },

  questionCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    elevation: 3,
    shadowColor: '#222',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    padding: 24,
    marginBottom: 20,
    maxHeight: 350,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#193974',
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5fa',
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: { borderColor: '#c84490', backgroundColor: '#fbe9f6' },
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

  /* action row -------------------------------------------------------- */
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 7,
    width: '90%',
  },
  quizBtn: {
    backgroundColor: '#ede0fc',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
    marginHorizontal: 2,
    elevation: 2,
  },
  /* gradient submit container */
  submitGradient: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    marginHorizontal: 2,
  },
  /* pressable inside gradient */
  submitTap: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 100,
    alignItems: 'center',
  },
  btnLabel: { fontWeight: 'bold', color: '#222', fontSize: 16 },

  /* number grid ------------------------------------------------------- */
  numberGrid: { marginTop: 17, marginBottom: 12, width: '100%' },
  numberBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: 46,
    alignItems: 'center',
    margin: 4,
    elevation: 1,
  },
  currentBox: { borderColor: '#c84490', backgroundColor: '#fbe9f6' },
  bookmarkedBox: { borderColor: '#f863b5' },
  answeredBox: { backgroundColor: '#e5ffde', borderColor: '#5ad173' },
  numberText: { fontWeight: 'bold', color: '#193974', fontSize: 15 },
});