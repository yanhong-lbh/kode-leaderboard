import React from "react";
import LeaderboardTable from "./components/LeaderboardTable";
import NewsArchive from "./components/NewsArchive";
import './App.css';

function App() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>KODE • Knowledge On-Demand Evaluation</h1>
      <p>
        <em>
          Public leaderboard and dynamic news archive for LLM benchmarking.
        </em>
      </p>
      <LeaderboardTable />
      <hr />
      <NewsArchive />
      <hr />
      <p>
        All news snapshots from <b>2025-03-01</b> onward are downloadable above.
        <br />
        No author info is stored. Results and news are double-blind.
      </p>
    </div>
  );
}

export default App;
