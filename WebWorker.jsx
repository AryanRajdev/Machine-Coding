import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [res, setRes] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const worker = new Worker(process.env.PUBLIC_URL + "/worker/dataWorker.js");
    setLoading(true);
    worker.postMessage({ number: 10 });

    worker.onmessage = function (e) {
      setRes(e.data);
      setLoading(false);
    };

    return () => worker.terminate();
  }, []);

  return (
    <div className="App">
      <div>
        {loading && <p>Loading...</p>}
        <p>Result : {res}</p>
      </div>
    </div>
  );
}


// In public folder we have workers/dataWorker.js

self.onmessage = function (e) {
  let num = e.data.number;

  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }

  postMessage(sum);
};
