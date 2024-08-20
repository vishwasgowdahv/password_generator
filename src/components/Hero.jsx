import React, { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  // Defining and Initializing Hooks
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [userNmuber, setUserNumber] = useState(false);
  const [spChar, setSpChar] = useState(false);
  const copyref = useRef();

  // Random Password Generator Function
  function passwordGenerte() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nums = "12345678901234567890123456789";
    let chars = "!@#$&!@#$!#@$$#@!@#!$#@";
    if (userNmuber) {
      letters += nums;
    }
    if (spChar) {
      letters += chars;
    }
    let newPassword = "";

    for (let i = 0; i < length; i++) {
      let n = Math.floor(Math.random() * letters.length);
      newPassword += letters[n];
    }
    setPassword(newPassword);
  }
  // function to copy generated Password to Clipboard
  function handleCopy() {
    document.querySelector("#copytext").select();
    console.log(copyref.current?.value);
    navigator.clipboard.writeText(copyref.current?.value);
  }

  // useEffect to rerender when given dependencies changes
  useEffect(() => {
    passwordGenerte();
  }, [length, userNmuber, spChar]);

  return (
    <>
      <h1>PASSWORD GENERATOR</h1>
      <div className={styles.main}>
        <div>
          <input
            className={styles.pwdisp}
            id="copytext"
            ref={copyref}
            value={password}
            type="text"
            readOnly
          />
          <button className={styles.copybtn} onClick={handleCopy}>
            copy
          </button>
        </div>
        <div>
          <div className={styles.lengthdiv}>
            <label htmlFor="length">Length ({length})</label>
            <input
              id="length"
              min={8}
              max={30}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              value={length}
              type="range"
            />
          </div>

          <div className={styles.checkboxdiv}>
            <label htmlFor="number">number</label>
            <input
              className={styles.checkbox}
              onClick={() => {
                userNmuber ? setUserNumber(false) : setUserNumber(true);
              }}
              id="number"
              type="checkbox"
            />

            <label htmlFor="char">char</label>
            <input
              className={styles.checkbox}
              onClick={() => {
                spChar ? setSpChar(false) : setSpChar(true);
              }}
              id="char"
              type="checkbox"
            />
          </div>
        </div>
      </div>
    </>
  );
}
