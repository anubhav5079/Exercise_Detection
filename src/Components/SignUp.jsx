import React, { useContext, useState } from "react";
import "../Styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { Context } from "../App";

function SignUp(props) {
  const {
    name,
    setName,
    age,
    setAge,
    gender,
    setGender,
    // email,
    setEmail,
    // number,
    setNumber,
  } = useContext(Context);

  const [err, setErr] = useState("");
  const submit = () => {
    if (name === "" || age === 0 || gender === "") {
      setErr("name / age / gender");
      return;
    } else {
      navigate("/selectExcercise");
    }
  };
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <img className={styles.logo} src="logo.png" alt="Logo" />
      <form
        className={styles.login}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {err !== "" ? <div className={styles.err}>Missing {err}</div> : null}
        <input
          className={styles.input}
          type="text"
          placeholder="Enter you name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.input}
          min="0"
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Gender"
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="tel"
          placeholder="Phone Number"
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
          className={styles.submit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
