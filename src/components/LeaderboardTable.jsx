import React, { useEffect, useState } from "react";

const leaderboardDates = [
  "2025-06-07",
  "2025-03-22",
  // Add more dates as needed, most recent first if you prefer
];

const columns = [
  { key: "model", label: "Model" },
  { key: "no_context_acc", label: "No-Context Acc." },
  { key: "oracle_acc", label: "Oracle Acc." },
  { key: "date", label: "Date" },
];

function compareRows(a, b, key, asc) {
  if (key === "no_context_acc" || key === "oracle_acc") {
    const v1 = Number(a[key]);
    const v2 = Number(b[key]);
    return asc ? v1 - v2 : v2 - v1;
  } else {
    return asc
      ? String(a[key]).localeCompare(String(b[key]))
      : String(b[key]).localeCompare(String(a[key]));
  }
}

export default function LeaderboardTable() {
  // Default to latest date (first in array)
  const [selectedDate, setSelectedDate] = useState(leaderboardDates[0]);
  const [rows, setRows] = useState([]);
  const [sortCol, setSortCol] = useState("no_context_acc");
  const [sortAsc, setSortAsc] = useState(false);

  // Fetch leaderboard results for the selected date
  useEffect(() => {
    setRows([]); // Clear old data while loading
    fetch(process.env.PUBLIC_URL + `/leaderboard/results_${selectedDate}.json`)
      .then((res) => res.json())
      .then((data) => setRows(data))
      .catch(() => setRows([]));
  }, [selectedDate]);

  const handleSort = (key) => {
    if (sortCol === key) {
      setSortAsc((asc) => !asc);
    } else {
      setSortCol(key);
      setSortAsc(false);
    }
  };

  const sortedRows = [...rows].sort((a, b) => compareRows(a, b, sortCol, sortAsc));
  const sortArrow = (key) =>
    sortCol === key ? (sortAsc ? " ▲" : " ▼") : "";

  return (
    <div>
      <h2>
        Leaderboard{" "}
        <span style={{ fontWeight: 400, fontSize: "0.9em" }}>
          (
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              fontSize: "inherit",
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid #ddd",
              background: "#f9f9fa",
              marginLeft: 2,
              marginRight: 2,
            }}
          >
            {leaderboardDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          )
        </span>
      </h2>
      <table cellPadding={6} style={{ width: "100%", margin: "1em 0" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  cursor: "pointer",
                  background: sortCol === col.key ? "#eee" : undefined,
                }}
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {sortArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ color: "#999", textAlign: "center" }}>
                No data found for {selectedDate}
              </td>
            </tr>
          ) : (
            sortedRows.map((r, i) => (
              <tr key={i}>
                <td>{r.model}</td>
                <td>{r.no_context_acc}%</td>
                <td>{r.oracle_acc}%</td>
                <td>{r.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
