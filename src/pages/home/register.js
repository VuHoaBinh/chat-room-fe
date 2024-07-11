import { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { registerForm } from "./api";

const Register = ({ email, setEmail, password, setPassword }) => {
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^.{6,}$/;

  const handleRegister = async () => {
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Response: ", { email, password });
    try {
      const res = await registerForm({ email, password });
      console.log("Response: ", res.data);
      localStorage.setItem(
        "userAccounts",
        JSON.stringify([{ email, password }])
      );
      alert("Registration successful. Please log in.");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error: ", error.response.data); // Log detailed error response
      alert("Registration failed. Please try again.");
    }
  };

  const handleBackButton = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <>
          <h1>Register</h1>
          <input
            className={styles.input}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Password Confirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-secondary"
            style={{ width: "100%" }}
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className=""
            style={{
              width: "100%",
              border: "none",
              background: "none",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleBackButton}
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
        </>
      </div>
    </div>
  );
};

export default Register;
