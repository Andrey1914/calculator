"use client";

import React, { useState } from "react";
import { VscHistory } from "react-icons/vsc";

import useHistory from "@/app/hooks/useHistory";

import {
  checkValidityOfPressedDigitKey,
  checkValidityOfPressedOperatorKey,
} from "@/app/utils/checkValidity";

import resultRoundingDecisionMaking from "@/app/utils/resultRounding";

const operators = ["+", "-", "*", "/"];

const Calculator: React.FC = () => {
  const [typedExpression, setTypedExpression] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const { history, addToHistory } = useHistory();
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const formulaWrittenOnScreen = typedExpression;
  const finalResultWrittenOnScreen = result;

  const deleteKeyFeature = () => {
    setTypedExpression((prev) => prev.slice(0, -1));
  };

  const resetCalculator = () => {
    setTypedExpression("");
    setResult(null);
  };

  const handleButtonClick = (value: string) => {
    if (!isNaN(parseFloat(value)) || value === ".") {
      setTypedExpression((prev) => checkValidityOfPressedDigitKey(prev, value));
      setShowHistory(false); // Hide history when a digit or decimal point is pressed
    } else if (operators.includes(value)) {
      setTypedExpression((prev) =>
        checkValidityOfPressedOperatorKey(prev, value, deleteKeyFeature)
      );
      setShowHistory(false); // Hide history when an operator is pressed
    } else if (value === "=") {
      const res = resultRoundingDecisionMaking(
        typedExpression,
        5,
        addToHistory
      );
      setResult(res);
    } else if (value === "AC") {
      resetCalculator();
    } else if (value === "DEL") {
      deleteKeyFeature();
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 p-4 bg-gray-900 rounded-sm">
      <div className="w-full bg-gray-900 text-white font-semibold text-right text-3xl p-4 rounded-sm mb-4">
        <div
          id="final_result"
          className={`text-white font-bold text-right text-4xl ${
            showHistory ? "hidden" : "block"
          }`}
        >
          {finalResultWrittenOnScreen !== null
            ? finalResultWrittenOnScreen
            : ""}
        </div>
        <div
          id="displayed_pressed_keys"
          className={`${showHistory ? "hidden" : "block"}`}
        >
          {formulaWrittenOnScreen || "0"}
        </div>
        <div className={`text-left ${showHistory ? "block" : "hidden"}`}>
          {history.length === 0 && (
            <div className="text-slate-300 font-thin text-left text-sm">
              There`s no history.
            </div>
          )}
          <ul>
            {history.map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
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
          onClick={() => setShowHistory(!showHistory)}
          className="bg-orange-500 text-white text-2xl font-bold p-2 rounded-full flex justify-center items-center"
        >
          <VscHistory size={30} />
        </button>
      </div>
    </div>
  );
};

export default Calculator;
