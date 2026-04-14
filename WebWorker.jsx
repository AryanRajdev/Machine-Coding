// withWorkers.jsx component

import { useState } from "react";

export default function WithWorker() {
  const [count, setCount] = useState(10000000000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompute = () => {
    setLoading(true);
    const worker = new Worker(new URL("../sumWorker.js", import.meta.url), {
      type: "module",
    });

    worker.postMessage(count);

    worker.onmessage = (e) => {
      setResult(e.data);
      setLoading(false);
      worker.terminate();
    };
  };

  return (
    <div>
      <h2>With Web Worker</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={handleCompute} disabled={loading}>
        {loading ? "Computing..." : "Compute"}
      </button>
      {result !== null && <p>Sum: {result}</p>}
    </div>
  );
}

// sumWorker.js on app.js level 

// Web Worker: runs on a separate thread
// Computes sum from 1 to count (simulates heavy computation)
self.onmessage = function (e) {
  const count = e.data;
  let sum = 0;
  for (let i = 1; i <= count; i++) {
    sum += i;
  }
  self.postMessage(sum);
};


// withoutWorker.jsx

import { useState } from "react";

function computeSum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

export default function WithoutWorker() {
  const [count, setCount] = useState(10000000000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompute = () => {
    setLoading(true);
    // setTimeout(0) lets React paint the loading state before the loop blocks the thread
    setTimeout(() => {
      const sum = computeSum(count);
      setResult(sum);
      setLoading(false);
    }, 0);
  };

  return (
    <div>
      <h2>Without Web Worker</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={handleCompute} disabled={loading}>
        {loading ? "Computing..." : "Compute"}
      </button>
      {result !== null && <p>Sum: {result}</p>}
    </div>
  );
}
