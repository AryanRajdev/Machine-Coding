import React, { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const limit = 10;

  const fetchData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await res.json();

      setItems((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + limit);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(); // initial load
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loading) {
          fetchData();
        }
      },
      {
        root: null, // viewport
        threshold: 1, // fully visible
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}

      <div ref={loaderRef} style={{ height: "20px" }} />

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
