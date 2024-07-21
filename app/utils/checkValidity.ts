const operators = ["+", "-", "*", "/"];

const checkValidityOfPressedDigitKey = (
  typedExpression: string,
  pressedKey: string
): string => {
  if (operators.includes(typedExpression.slice(-1))) {
    return typedExpression + " " + pressedKey; // adds a space in the expression before a digit if the previous pressed key was an operator.
  } else {
    return typedExpression + pressedKey; // else adds typed digit without the space
  }
};

// export const checkValidityOfPressedOperatorKey = (
//   typedExpression: string,
//   pressedKey: string,
//   deleteKeyFeature: () => void
// ) => {
//   if (operators.includes(typedExpression.slice(-1)) && pressedKey !== "-") {
//     console.warn("operator key pressed multiple time in a row");
//     deleteKeyFeature();
//     return checkValidityOfPressedOperatorKey(
//       typedExpression,
//       pressedKey,
//       deleteKeyFeature
//     );
//   } else {
//     return typedExpression + " " + pressedKey; // adds a space in the expression after an operator has been typed
//   }
// };

const checkValidityOfPressedOperatorKey = (
  typedExpression: string,
  pressedKey: string,
  deleteKeyFeature: () => void
): string => {
  if (operators.includes(typedExpression.slice(-1)) && pressedKey !== "-") {
    console.warn("operator key pressed multiple time in a row");
    deleteKeyFeature();
    return checkValidityOfPressedOperatorKey(
      typedExpression,
      pressedKey,
      deleteKeyFeature
    );
  } else {
    return typedExpression + " " + pressedKey; // adds a space in the expression after an operator has been typed
  }
};

export { checkValidityOfPressedDigitKey, checkValidityOfPressedOperatorKey };
