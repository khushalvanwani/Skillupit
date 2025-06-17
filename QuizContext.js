import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all quiz courses/subjects (needs token)
  const fetchCourses = async (token) => {
    setLoading(true);
    try {
      const res = await fetch('https://www.skillupitacademy.com/backend/public/api/auth/getQuizCourseData', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await res.json();
      setCourses(data?.courses || data);
    } catch (err) {
      setCourses([]);
    }
    setLoading(false);
  };

  // Fetch topics for a course (needs token)
  const fetchTopics = async (token, courseCode) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.skillupitacademy.com/backend/public/api/auth/getQuizTopicData/${courseCode}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await res.json();
      setTopics(data?.topics || data);
    } catch (err) {
      setTopics([]);
    }
    setLoading(false);
  };

  // Fetch questions for a topic (needs token)
  const fetchQuestions = async (token, topicCode) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.skillupitacademy.com/backend/public/api/auth/getQuizQuestData/${topicCode}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await res.json();
      setQuestions(data?.questions || data);
    } catch (err) {
      setQuestions([]);
    }
    setLoading(false);
  };
  

  return (
    <QuizContext.Provider
      value={{
        courses, fetchCourses,
        topics, fetchTopics,
        questions, fetchQuestions, setQuestions,
        loading
      }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);