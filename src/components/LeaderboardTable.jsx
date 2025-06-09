import React, { useEffect, useState } from "react";

export default function LeaderboardTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("/leaderboard/results_2025-06-08.json")
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  return (
    <div>
      <h2>Leaderboard (2025-06-08)</h2>
      <table border="1" cellPadding={6} style={{ width: "100%", margin: "1em 0" }}>
        <thead>
          <tr>
            <th>Model</th>
            <th>No-Context Acc.</th>
            <th>Oracle Acc.</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.model}</td>
              <td>{r.no_context_acc}%</td>
              <td>{r.oracle_acc}%</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
