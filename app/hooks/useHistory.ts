"use client";

import { useState, useEffect } from "react";

const useHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("calcHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }, [history]);

  const addToHistory = (expression: string, result: number) => {
    const newHistory = [`${expression} = ${result}`, ...history];
    setHistory(newHistory);
  };

  return { history, addToHistory };
};

export default useHistory;
