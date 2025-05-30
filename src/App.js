import logo from './logo.svg';
import './App.css';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionForm from "./components/QuestionForm"
import AnswerForm from "./components/AnswerForm";
import ResponseList from "./components/ResponseList";
import NewsletterView from "./components/NewsletterView";
//import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnswerForm />} />
        <Route path="/questions" element={<QuestionForm />} />
        <Route path="/responses" element={<ResponseList />} />
        <Route path="/newsletter" element={<NewsletterView />} />
      </Routes>
    </Router>
  );
}

export default App;
