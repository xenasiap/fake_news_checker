import React, { useState } from 'react';
import './App.css';

 function App() {
   const [url, setUrl] = useState("");
   const [manualText, setManualText] = useState("");
   const [result, setResult] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");



   const checkNews = async () => {
     setLoading(true);  // Set loading to true before the request starts
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

     if (data.error) {
         setError(data.error);
         setResult("");  // clear any previous result
     } else {
         setResult(data.result);
         setError("");  // clear any previous errors
     }

     setLoading(false);  // Set loading to false after the request completes
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
       {
           loading &&
           <div className="loader">
               <div className="spinner"></div>
               Please wait for the answer...
           </div>
       }

       {
           error && <p className="error-message">{error}</p>
       }

       <p className={result === "True News" ? "true-news" : result === "Fake News" ? "fake-news" : ""}>
           {result}
       </p>

     </div>
   );
 }

 export default App;