"use client";

import React, { useState, useEffect } from "react";
import { VscHistory } from "react-icons/vsc";

const operators = ["+", "-", "*", "/"];

const Calculator: React.FC = () => {
  const [typedExpression, setTypedExpression] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
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

  const formulaWrittenOnScreen = typedExpression;
  const finalResultWrittenOnScreen = result;

  const checkValidityOfPressedDigitKey = (pressedKey: string) => {
    if (operators.includes(typedExpression.slice(-1))) {
      setTypedExpression((prev) => prev + " " + pressedKey); // adds a space in the expression before a digit if the previous pressed key was an operator.
    } else {
      setTypedExpression((prev) => prev + pressedKey); // else adds typed digit without the space
    }
  };

  const checkValidityOfPressedOperatorKey = (pressedKey: string) => {
    if (operators.includes(typedExpression.slice(-1)) && pressedKey !== "-") {
      console.warn("operator key pressed multiple time in a row");
      deleteKeyFeature();
      checkValidityOfPressedOperatorKey(pressedKey);
      // If user types multiple time an operator key, the key is updated with last operator EXCEPT if that operator is "-" (because of negative numbers)
    } else {
      setTypedExpression((prev) => prev + " " + pressedKey); // adds a space in the expression after an operator has been typed
    }
  };

  const resultRoundingDecisionMaking = (numberOfDecimalDigits: number) => {
    try {
      const result = eval(typedExpression); // I shouldn't use eval() because of security concern. I didn't find a better way yet
      const decimalStr = (result - Math.floor(result)).toString();
      const decimalLength = decimalStr.length - 1;
      const factor = Math.pow(10, numberOfDecimalDigits);
      let roundedResult = Math.floor(result * factor) / factor;
      //   if (decimalLength > numberOfDecimalDigits) {
      //     setResult(roundedResult);
      //   } else {
      //     setResult(result);
      //   }
      if (decimalLength > numberOfDecimalDigits) {
        setResult(roundedResult);
        addToHistory(typedExpression, roundedResult);
      } else {
        setResult(result);
        addToHistory(typedExpression, result);
      }
    } catch (error) {
      console.error("Invalid expression", error);
    }
  };

  const deleteKeyFeature = () => {
    setTypedExpression((prev) => prev.slice(0, -1));
  };

  const resetCalculator = () => {
    setTypedExpression("");
    setResult(null);
  };

  const handleButtonClick = (value: string) => {
    if (!isNaN(parseFloat(value)) || value === ".") {
      checkValidityOfPressedDigitKey(value);
    } else if (operators.includes(value)) {
      checkValidityOfPressedOperatorKey(value);
    } else if (value === "=") {
      resultRoundingDecisionMaking(5);
    } else if (value === "AC") {
      resetCalculator();
    } else if (value === "DEL") {
      deleteKeyFeature();
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 p-4 bg-gray-900 rounded-sm">
      <div className="w-full bg-gray-700 text-white font-semibold text-right text-3xl p-4 rounded-sm mb-4">
        <div
          id="final_result"
          className="text-white font-bold text-right text-4xl"
        >
          {finalResultWrittenOnScreen !== null
            ? finalResultWrittenOnScreen
            : ""}
        </div>
        <div id="displayed_pressed_keys">{formulaWrittenOnScreen || "0"}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          "AC",
          "DEL",
          "/",
          "*",
          "+",
          "-",
          "7",
          "8",
          "9",
          "4",
          "5",
          "6",
          "1",
          "2",
          "3",
          "0",
          ".",
          "=",
        ].map((key) => (
          <button
            key={key}
            className={`w-20 h-20 text-2xl font-bold rounded-full ${
              isNaN(parseFloat(key)) && key !== "."
                ? "bg-orange-500 text-white"
                : "bg-gray-700 text-white"
            }`}
            onClick={() => handleButtonClick(key)}
          >
            {key}
          </button>
        ))}
        <button
          onClick={() => alert(history.join("\n"))}
          className="w-20 h-20 bg-orange-500 text-white text-2xl font-bold p-2 rounded-full flex justify-center items-center"
        >
          <VscHistory size={30} />
        </button>
      </div>
    </div>
  );
};

export default Calculator;
