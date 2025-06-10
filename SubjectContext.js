import React, { createContext, useContext, useState } from 'react';

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects] = useState([
    {
      id: '1',
      label: 'C++',
      icon: 'language-cpp',
      topics: [
        { label: 'LOGICAL', icon: 'git-branch' },
        { label: 'LOOPING', icon: 'repeat' },
        { label: 'ARRAYS AND STRINGS', icon: 'code-tags' },
        { label: 'POINTERS AND REFERENCES', icon: 'vector-link' },
        { label: 'STRUCTURES AND UNIONS', icon: 'sitemap' },
        { label: 'ADVANCED LOGIC BUILDING', icon: 'cogs' },
        { label: 'OBJECT ORIENTED PROGRAM', icon: 'chip' },
        { label: 'EXCEPTION HANDLING', icon: 'close-box-outline' },
        { label: 'FILES AND STREAMS', icon: 'file-document-outline' },
      ],
    },
    {
      id: '2',
      label: 'PYTHON',
      icon: 'language-python',
      topics: [
        { label: 'OPERATORS', icon: 'code-tags' },
        { label: 'DATATYPES', icon: 'numeric' },
        { label: 'CONDITIONAL STATEMENTS', icon: 'source-branch' },
        { label: 'LOOPS', icon: 'vector-link' },
        { label: 'FUNCTIONS', icon: 'sitemap' },
        { label: 'OOP', icon: 'cube-outline' },
        { label: 'EXCEPTION HANDLING', icon: 'close-box-outline' },
        { label: 'FILE HANDLING', icon: 'file-document-outline' },
        { label: 'PYTHON SQL CONNECTIVITY', icon: 'database' },
        { label: 'TKINTER', icon: 'laptop' },
      ],
    },
    {
      id: '3',
      label: 'JAVASCRIPT',
      icon: 'language-javascript',
      topics: [
        { label: 'VARIABLES AND DATATYPES', icon: 'numeric' },
        { label: 'OPERATORS', icon: 'code-tags' },
        { label: 'COMPARISON OPERATORS', icon: 'less-than' },
        { label: 'LOGICAL', icon: 'git-branch' },
        { label: 'EVENT', icon: 'laptop' },
        { label: 'ARRAY', icon: 'cube-outline' },
        { label: 'FUNCTIONS', icon: 'sitemap' },
        { label: 'OBJECT', icon: 'vector-link' },
        { label: 'DATE OBJECT', icon: 'format-list-bulleted' },
        { label: 'LOOP', icon: 'vector-link' },
        { label: 'NOTE MANAGER', icon: 'file-document-outline' },
        { label: 'DOM', icon: 'source-branch' },
      ],
    },
    {
      id: '4',
      label: 'JAVA',
      icon: 'language-java',
      topics: [
        { label: 'OPERATORS', icon: 'code-tags' },
        { label: 'DATATYPES', icon: 'numeric' },
        { label: 'CONDITIONAL STATEMENTS', icon: 'source-branch' },
        { label: 'SWITCH', icon: 'swap-horizontal' },
        { label: 'LOOPS', icon: 'vector-link' },
        { label: 'FUNCTIONS', icon: 'sitemap' },
        { label: 'OOP', icon: 'cube-outline' },
        { label: 'EXCEPTION HANDLING', icon: 'close-box-outline' },
        { label: 'FILE HANDLING', icon: 'file-document-outline' },
        { label: 'COLLECTION', icon: 'format-list-bulleted' },
        { label: 'MULTITHREADING', icon: 'sitemap' },
        { label: 'SYNCHRONIZATION', icon: 'cogs' },
        { label: 'NETWORKING', icon: 'lan' },
      ],
    },
    {
      id: '5',
      label: 'SQL',
      icon: 'server',
      topics: [
        { label: 'CREATE DATABASE', icon: 'database' },
        { label: 'TABLES', icon: 'table' },
        { label: 'QUERIES', icon: 'code-tags' },
        { label: 'CLAUSES', icon: 'help-circle-outline' },
        { label: 'OPERATORS', icon: 'equal' },
        { label: 'AGGREGATE FUNCTIONS', icon: 'sigma-lower' },
        { label: 'WILDCARD CHARACTERS', icon: 'percent' },
        { label: 'SUBQUERIES', icon: 'subdirectory-arrow-right' },
        { label: 'DATA CONSTRAINTS', icon: 'key' },
        { label: 'JOINS', icon: 'vector-link' },
        { label: 'FUNCTIONS', icon: 'function-variant' },
        { label: 'VIEWS', icon: 'eye-outline' },
        { label: 'INDEXES', icon: 'format-list-bulleted' },
        { label: 'STORED PROCEDURES', icon: 'source-branch' },
        { label: 'AUTO INCREMENT', icon: 'plus' },
        { label: 'SEQUENCES', icon: 'barcode' },
        { label: 'TRANSACTIONS', icon: 'swap-horizontal' },
      ],
    },
    {
      id: '6',
      label: 'REACTJS',
      icon: 'react',
      topics: [
        { label: 'PROPS AND STATES', icon: 'sitemap' },
        { label: 'CREATE REACT APP', icon: 'laptop' },
        { label: 'REACT STATE AND PATTERNS', icon: 'sitemap' },
        { label: 'REACT EVENTS', icon: 'calendar' },
        { label: 'FORMS IN REACT', icon: 'file-document-outline' },
        { label: 'LIFECYCLE METHODS', icon: 'source-branch' },
        { label: 'REACT ROUTER AND PATTERNS', icon: 'sitemap' },
        { label: 'REACT HOOKS', icon: 'hook' },
        { label: 'REACT CONTEXT', icon: 'account-multiple-outline' },
        { label: 'REACT REDUCER', icon: 'vector-link' },
      ],
    },
  ]);

  const [currentSubject, setCurrentSubject] = useState(null);

  return (
<SubjectContext.Provider value={{ subjects, currentSubject, setCurrentSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubjectContext = () => useContext(SubjectContext);