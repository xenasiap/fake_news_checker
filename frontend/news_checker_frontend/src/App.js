import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState("");
  const [manualText, setManualText] = useState("");
  const [result, setResult] = useState("");

  const checkNews = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/check-news/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        manual_text: manualText
      }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div className="App">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter article URL"
      />
      <textarea
        value={manualText}
        onChange={(e) => setManualText(e.target.value)}
        placeholder="Or manually paste the article here"
      />
      <button onClick={checkNews}>Check News</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
