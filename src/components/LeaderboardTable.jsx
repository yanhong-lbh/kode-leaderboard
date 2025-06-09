import React, { useEffect, useState } from "react";

const columns = [
  { key: "model", label: "Model" },
  { key: "no_context_acc", label: "No-Context Acc." },
  { key: "oracle_acc", label: "Oracle Acc." },
  { key: "date", label: "Date" },
];

function compareRows(a, b, key, asc) {
  // Numeric sort for accuracies, string for others
  if (key === "no_context_acc" || key === "oracle_acc") {
    const v1 = Number(a[key]);
    const v2 = Number(b[key]);
    return asc ? v1 - v2 : v2 - v1;
  } else {
    // String/lexical sort for model and date
    return asc
      ? String(a[key]).localeCompare(String(b[key]))
      : String(b[key]).localeCompare(String(a[key]));
  }
}

export default function LeaderboardTable() {
  const [rows, setRows] = useState([]);
  const [sortCol, setSortCol] = useState("no_context_acc");
  const [sortAsc, setSortAsc] = useState(false); // default to descending

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/leaderboard/results_2025-03-22.json")
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  const handleSort = (key) => {
    if (sortCol === key) {
      setSortAsc((asc) => !asc); // Toggle
    } else {
      setSortCol(key);
      setSortAsc(false); // Default to descending
    }
  };

  // Sort the rows
  const sortedRows = [...rows].sort((a, b) => compareRows(a, b, sortCol, sortAsc));

  // Arrow indicator for sorted column
  const sortArrow = (key) =>
    sortCol === key ? (sortAsc ? " ▲" : " ▼") : "";

  return (
    <div>
      <h2>Leaderboard (2025-03-22)</h2>
      <table border="1" cellPadding={6} style={{ width: "100%", margin: "1em 0" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ cursor: "pointer", background: sortCol === col.key ? "#eee" : undefined }}
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {sortArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((r, i) => (
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
