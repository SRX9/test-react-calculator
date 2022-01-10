import { useState } from "react";
import "./App.css";
import Button from "./Button";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
const operations = ["/", "*", "-", "+"];
const KeysEnum = {
  OPERAND: "operand",
  OPERATION: "opeartion",
  CALCULATE: "calculation",
  DELETE: "delete",
  CLEAR: "clear",
};

function App() {
  const [calculationDisplay, setCalculationDisplay] = useState("0");
  const [calculationExpression, setCalculationExpression] = useState("");
  const [error, setError] = useState("");

  const getFinalCalculation = (expression) => {
    try {
      const result = eval(expression.replace(/^0+/, ""));
      return (
        result % 1 == 0 ? result : Number(result.toFixed(10)) || ""
      ).toString();
    } catch (e) {
      setError("Invalid Expression!");
      return null;
    }
  };

  const handleButtonClick = (value, type) => {
    if (
      (type === KeysEnum.OPERAND || type === KeysEnum.OPERATION) &&
      calculationExpression.length < 15
    ) {
      setCalculationExpression(calculationExpression.concat(value));
      setCalculationDisplay(calculationExpression.concat(value));
      setError("");
    } else if (type === KeysEnum.DELETE) {
      setCalculationExpression(calculationExpression.slice(0, -1));
      setCalculationDisplay(
        calculationExpression.slice(0, -1) === ""
          ? "0"
          : calculationExpression.slice(0, -1)
      );
    } else if (type === KeysEnum.CALCULATE) {
      if (calculationExpression) {
        const finalEval = getFinalCalculation(calculationExpression);
        if (finalEval) {
          setCalculationDisplay(finalEval);
          setCalculationExpression(finalEval);
          setError("");
        }
      } else {
        if (!calculationExpression) {
          setError("Please Enter Required Values");
        }
      }
    } else if (type === KeysEnum.CLEAR) {
      setCalculationDisplay("0");
      setCalculationExpression("");
      setError("");
    }
  };

  return (
    <main className="container">
      <section className="calculator-box">
        <div className="error text-center">{error}</div>
        <div className="display-bar text-right">{calculationDisplay}</div>
        <div className="keys text-center">
          {numbers.map((num) => (
            <Button
              bg="white"
              key={num}
              onClick={handleButtonClick}
              type={KeysEnum.OPERAND}
              value={num}
            />
          ))}
          {operations.map((op) => (
            <Button
              bg="yellow"
              key={op}
              onClick={handleButtonClick}
              type={KeysEnum.OPERATION}
              value={op}
            />
          ))}
          <Button
            bg="yellow"
            onClick={handleButtonClick}
            type={KeysEnum.CALCULATE}
            value={"="}
          />
          <Button
            bg="red"
            onClick={handleButtonClick}
            type={KeysEnum.DELETE}
            value={"X"}
          />
          <Button
            bg="black"
            onClick={handleButtonClick}
            type={KeysEnum.CLEAR}
            value={"AC"}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
