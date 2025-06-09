import React, { useState } from "react";

// For demo: update this list as new news files are added
const newsDates = [
  "2025-04-09",
  "2025-04-10",
  "2025-04-11",
  "2025-04-12",
  "2025-04-13",
  "2025-04-14",
  "2025-04-15",
  "2025-04-16",
  "2025-04-17",
  "2025-04-18",
  "2025-04-19",
  "2025-04-20",
  "2025-04-21",
  "2025-04-22",
  "2025-04-23",
  "2025-04-24",
  "2025-04-25",
  "2025-04-26",
  "2025-04-27",
  "2025-04-28",
  "2025-04-29",
  "2025-04-30",
  "2025-05-01",
  "2025-05-02",
  "2025-05-03",
  "2025-05-04",
  "2025-05-05",
  "2025-05-06",
  "2025-05-07",
  "2025-05-08",
  "2025-05-09",
  "2025-05-10",
  "2025-05-11",
  "2025-05-12",
  "2025-05-13",
  "2025-05-14",
  "2025-05-15",
  "2025-05-16",
  "2025-05-17",
  "2025-05-18",
  "2025-05-19",
  "2025-05-20",
  "2025-05-21",
  "2025-05-22",
  "2025-05-23",
  "2025-05-24",
  "2025-05-25",
  "2025-05-26",
  "2025-05-27",
  "2025-05-28",
  "2025-05-29",
  "2025-05-30",
  "2025-05-31",
  "2025-06-01",
  "2025-06-02",
  "2025-06-03",
  "2025-06-04",
  "2025-06-05",
  "2025-06-06",
  "2025-06-07",
];

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
