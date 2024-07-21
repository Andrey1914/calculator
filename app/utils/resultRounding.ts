const resultRoundingDecisionMaking = (
  typedExpression: string,
  numberOfDecimalDigits: number,
  addToHistory: (expression: string, result: number) => void
) => {
  try {
    const result = eval(typedExpression); // I shouldn't use eval() because of security concern. I didn't find a better way yet
    const decimalStr = (result - Math.floor(result)).toString();
    const decimalLength = decimalStr.length - 1;
    const factor = Math.pow(10, numberOfDecimalDigits);
    let roundedResult = Math.floor(result * factor) / factor;

    if (decimalLength > numberOfDecimalDigits) {
      addToHistory(typedExpression, roundedResult);
      return roundedResult;
    } else {
      addToHistory(typedExpression, result);
      return result;
    }
  } catch (error) {
    console.error("Invalid expression", error);
    return null;
  }
};

export default resultRoundingDecisionMaking;
