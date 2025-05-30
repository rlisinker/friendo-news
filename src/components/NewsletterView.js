import React from "react";
import ResponseList from "./ResponseList";

export default function NewsletterView({ selectedMonth = "2025-06" }) {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2em", fontFamily: "Georgia, serif" }}>
      <header style={{ textAlign: "center", marginBottom: "2em" }}>
        <h1 style={{ fontSize: "2.5em", marginBottom: "0.5em" }}>🌟 Our Monthly Newsletter</h1>
        <p style={{ fontSize: "1.2em", color: "#666" }}>For {selectedMonth}</p>
      </header>

      <ResponseList selectedMonth={selectedMonth} />

      <footer style={{ textAlign: "center", marginTop: "3em", fontSize: "0.9em", color: "#888" }}>
        <p>Ta-ta for now!! 💌</p>
      </footer>
    </div>
  );
}

