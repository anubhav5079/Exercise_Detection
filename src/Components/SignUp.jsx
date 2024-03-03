import React, { useContext, useState } from "react";
import "../Styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { Context } from "../App";
import { isEmpty } from "validator";
import { isString } from "@tensorflow/tfjs-core/dist/util_base";
import isEmail from "validator/lib/isEmail";

function SignUp(props) {
  const {
    name,
    setName,
    age,
    setAge,
    gender,
    setGender,
    email,
    setEmail,
    // number,
    setNumber,
  } = useContext(Context);

  const [err, setErr] = useState("");
  const submit = () => {
    let e = [];
    if (isEmpty(name) || !isString(name)) {
      e.push("name");
    }

    if (isNaN(age) || age < 12) {
      e.push("age");
    }

    if (isEmpty(gender) || !isString(email)) {
      e.push("gender");
    }

    if (isEmpty(email) || !isEmail(email)) {
      e.push("email");
    }

    if (e.length === 0) {
      navigate("/selectExcercise");
    } else {
      setErr(e.join(","));
    }
  };
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <form
        className={styles.login}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {err !== "" ? <div className={styles.err}>Invalid {err}</div> : null}
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
