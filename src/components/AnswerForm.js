import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection,
    addDoc,
    Timestamp,
    query,
    where,
    getDocs
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default function AnswerForm(selectedMonth = "2025-06") {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    
// static questions
    const staticQuestions = [
                             "Name",
                             "One Good Thing",
                             "On Your Mind",
                             "Check it Out!",
                             "Photo Wall"
                             ];
    
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        async function fetchQuestions() {
            const q = query(
                            collection(db, "questions"),
                            where("monthKey", "==", selectedMonth)
                            );
            const snapshot = await getDocs(q);
            const dynamicQuestions = snapshot.docs.map((doc) => doc.data().question);
            
            // combine static and dynamic
            setQuestions([...staticQuestions, ...dynamicQuestions]);
        }
        
        fetchQuestions();
    }, [selectedMonth]);
    
    const handleChange = (question, value) => {
        setAnswers((prev) => ({
            ...prev,
            [question]: value,
        }));
    };
    
    const handleFileChange = (e) => {
      if (e.target.files.length > 0) {
        setPhotoFile(e.target.files[0]);
      }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const storage = getStorage();
        
        // store answers as array of {question, answer} entries
        for (const question of questions) {
            let answer = answers[question] || "";

                // Handle photo upload
                if (question === "Photo Wall" && photoFile) {
                  const photoRef = ref(storage, `photos/${selectedMonth}_${photoFile.name}`);
                  await uploadBytes(photoRef, photoFile);
                  answer = await getDownloadURL(photoRef);
                }

                await addDoc(collection(db, "responses"), {
                  monthKey: selectedMonth,
                  question,
                  answer,
                  createdAt: Timestamp.now(),
                });
        }
        
        alert("Answers submitted!");
        setAnswers({});
        setPhotoFile(null);
    };
            
           

  return (
          <form onSubmit={handleSubmit}>
                <h2>Answer This Month's Questions</h2>
                {questions.map((q, i) => (
                  <div key={i}>
                    <h3>{q}</h3>
                                          {q === "Upload a Photo" ? (
                                                                     <input type="file" accept="image/*" onChange={handleFileChange} />
                                                                     ) : (
                                                                          <textarea
                                                                          value={answers[q] || ""}
                                                                          onChange={(e) => handleChange(q, e.target.value)}
                                                                          rows={3}
                                                                          cols={50}
                                                                          />
                                                                          )}
                  </div>
                ))}
                <button type="submit">Submit</button>
              </form>
  );
}

