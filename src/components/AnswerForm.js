import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AnswerForm(selectedMonth = "2025-06") {
  const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuestions(){
            const q = query(
                            collection(db, "questions"),
                            where("monthKey", "==", selectedMonth)
                            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => doc.data());
            setQuestions(data);
        }
        fetchQuestions();
    }, [selectedMonth]);
    
           

  return (
    <form onSubmit={handleSubmit}>
      <h2>One Good Thing</h2>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
     
      <h2>On Your Mind</h2>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
          
      <h2>Check it Out!</h2>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
         
      <h2>{questions.map((r, i) => (
                <li key = (i)>{r.question}</li>
                ))}
      </h2>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
          
      <h2>Monthly Question: What brought you joy this month?</h2>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />


          
      <button type="submit">Submit</button>
    </form>
  );
}

