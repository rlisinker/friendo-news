import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function QuestionForm() {
  const [answer, setAnswer] = useState("");

  const now = Timestamp.now();
  const jsDate = now.toDate(); // convert to regular JS Date
  const monthKey = `${jsDate.getFullYear()}-${String(jsDate.getMonth() + 1).padStart(2, '0')}`; // e.g. "2025-05"

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "questions"), {
      answer,
      createdAt: now,
        monthKey
    });
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>"Do you have a question you'd like the group to answer this month?"</h2>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

