import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function QuestionForm() {
  const [question, setQuestion] = useState("");

  const now = Timestamp.now();
  const jsDate = now.toDate(); // convert to regular JS Date
  const monthKey = `${jsDate.getFullYear()}-${String(jsDate.getMonth() + 1).padStart(2, '0')}`; // e.g. "2025-05"

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "questions"), {
      question,
      createdAt: now,
        monthKey
    });
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>"Do you have a question you'd like the group to answer this month?"</h2>
      <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows = {3}
          />
      <button type="submit">Submit</button>
    </form>
  );
}

