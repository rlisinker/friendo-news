import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function ResponseList({ selectedMonth = "2025-06" }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function fetchResponses() {
      const q = query(
        collection(db, "responses"),
        where("monthKey", "==", selectedMonth),
        orderBy("createdAt", "asc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setResponses(data);
    }

    fetchResponses();
  }, [selectedMonth]);

  return (
    <div>
      <h2>Responses for {selectedMonth}</h2>
      {responses.map((resp, idx) => {
        const nameAnswer = resp.answers?.find(a =>
          a.question.toLowerCase().includes("name")
        );
        const displayName = nameAnswer?.answer || "Anonymous";

        return (
          <div key={idx} style={{ marginBottom: "2em", padding: "1em", border: "1px solid #ccc" }}>
            <h3>{displayName}</h3>

            {resp.imageURL && (
              <div>
                <img src={resp.imageURL} alt="User upload" style={{ maxWidth: "300px", borderRadius: "8px" }} />
              </div>
            )}

            <ul>
              {resp.answers
                ?.filter(a => !a.question.toLowerCase().includes("name"))
                .map((a, i) => (
                  <li key={i}>
                    <strong>{a.question}:</strong> {a.answer}
                  </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
