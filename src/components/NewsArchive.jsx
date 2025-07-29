import React, { useState } from "react";

function buildDateRange(start, end) {
  const dates = [];
  const cur = new Date(start);
  const last = new Date(end);

  while (cur <= last) {
    dates.push(cur.toISOString().slice(0, 10)); // YYYY-MM-DD
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

// For demo: update these when new files appear
const newsDates = buildDateRange("2025-04-09", "2025-06-07");

// Group dates by month (YYYY-MM)
function groupByMonth(dates) {
  // Sort dates descending (latest first)
  const sorted = [...dates].sort((a, b) => b.localeCompare(a));
  const groups = {};
  sorted.forEach(date => {
    const month = date.slice(0, 7); // "YYYY-MM"
    if (!groups[month]) groups[month] = [];
    groups[month].push(date);
  });
  return groups;
}

export default function NewsArchive() {
  const monthGroups = groupByMonth(newsDates);
  // All months open by default
  const allMonths = Object.keys(monthGroups);
  const [openMonths, setOpenMonths] = useState(() => {
    const obj = {};
    allMonths.forEach(m => { obj[m] = true; });
    return obj;
  });

  const toggleMonth = (month) => {
    setOpenMonths(prev => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  return (
    <div>
      <h2>Download News Snapshots</h2>
      <div>
        {allMonths.map(month => (
          <div key={month} style={{ marginBottom: "1em" }}>
            <button
              style={{
                border: "none",
                background: "none",
                fontWeight: 600,
                fontSize: "1em",
                cursor: "pointer",
                padding: 0,
                color: "#222",
                outline: "none",
              }}
              aria-expanded={openMonths[month]}
              onClick={() => toggleMonth(month)}
            >
              {openMonths[month] ? "▼" : "►"} {month}
            </button>
            {openMonths[month] && (
              <ul style={{ margin: "0.5em 0 0.5em 1.5em", padding: 0 }}>
                {monthGroups[month].map(date => (
                  <li key={date} style={{ listStyle: "disc" }}>
                    <a
                      href={process.env.PUBLIC_URL + `/news_snapshots/news_${date}.json`}
                      download
                    >
                      {date}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
