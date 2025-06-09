// For demo: update this list as new news files are added
const newsDates = [
  "2025-03-01",
  "2025-03-02",
  // ...
];

export default function NewsArchive() {
  return (
    <div>
      <h2>Download News Snapshots</h2>
      <ul>
        {newsDates.map(date => (
          <li key={date}>
            <a href={process.env.PUBLIC_URL + `/news_snapshots/news_${date}.json`} download>
              {date}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
