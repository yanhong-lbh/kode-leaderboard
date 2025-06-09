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
        All news snapshots from <b>2025-04-10</b> onward are downloadable above.
      </p>
    </div>
  );
}

export default App;
