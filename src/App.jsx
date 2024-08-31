import { useState } from "react";
import "./App.css";
import { LC, NUM, SPECIAL, UC } from "./data/Character";

function App() {
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [passLength, setPassLength] = useState(5);
  const [fPass, setFPass] = useState("");

  let generatePass = () => {
    let minUppercase = uppercase ? 1 : 0;
    let minLowercase = lowercase ? 1 : 0;
    let minNumber = number ? 1 : 0;
    let minSymbol = symbol ? 1 : 0;
    let activeCheckboxCount =
      minUppercase + minLowercase + minNumber + minSymbol;

    let finalPass = "";
    let charSet = "";

    if (!(passLength >= 5 && passLength <= 20)) {
      alert(
        "Password length should be between 5 and 20 characters. Please enter a valid password length."
      );
    } else if (!(uppercase || lowercase || number || symbol)) {
      alert(
        "Please select at least one checkbox for including uppercase letters, lowercase letters, numbers, or symbols in the password."
      );
    } else {
      if (uppercase) charSet += UC;
      if (lowercase) charSet += LC;
      if (number) charSet += NUM;
      if (symbol) charSet += SPECIAL;

      let generatedCount = 0;
      let uppercaseCount = 0;
      let lowercaseCount = 0;
      let numberCount = 0;
      let symbolCount = 0;

      for (let i = 0; i < passLength; i++) {
        const randomChar = charSet.charAt(
          Math.floor(Math.random() * charSet.length)
        );
        if (generatedCount < activeCheckboxCount) {
          if (
            uppercase &&
            uppercaseCount < minUppercase &&
            UC.includes(randomChar)
          ) {
            uppercaseCount++;
          } else if (
            lowercase &&
            lowercaseCount < minLowercase &&
            LC.includes(randomChar)
          ) {
            lowercaseCount++;
          } else if (
            number &&
            numberCount < minNumber &&
            NUM.includes(randomChar)
          ) {
            numberCount++;
          } else if (
            symbol &&
            symbolCount < minSymbol &&
            SPECIAL.includes(randomChar)
          ) {
            symbolCount++;
          } else {
            i--;
            continue;
          }
        }

        generatedCount++;
        finalPass += randomChar;
      }
      setFPass(finalPass);
    }
  };

  let copyPass = () => {
    navigator.clipboard.writeText(fPass);
  };

  return (
    <div className="App">
      <div className="outer-box">
        <h1>Password Generator</h1>
        <div className="display-box">
          <input type="text" readOnly value={fPass} />{" "}
          <button onClick={copyPass}>Copy</button>
        </div>
        <form>
          <div className="label-input-box">
            <label>Password length</label>
            <input
              type="number"
              max={20}
              min={5}
              value={passLength}
              onChange={(event) => setPassLength(event.target.value)}
            />
          </div>
          <div className="label-input-box">
            <label htmlFor="">Include uppercase letters</label>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
            />
          </div>
          <div className="label-input-box">
            <label htmlFor="">Include lowercase letters</label>
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />
          </div>
          <div className="label-input-box">
            <label htmlFor="">Include numbers</label>
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber(!number)}
            />
          </div>
          <div className="label-input-box">
            <label htmlFor="">Include symbols</label>
            <input
              type="checkbox"
              checked={symbol}
              onChange={() => setSymbol(!symbol)}
            />
          </div>
        </form>
        <button className="pass-btn" onClick={generatePass}>
          Generate password
        </button>
      </div>
    </div>
  );
}

export default App;
