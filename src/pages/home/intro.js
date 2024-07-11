import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3>Welcome to my chat app</h3>
        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={() => {
            navigate("/login", { replace: true });
          }}
        >
          Login
        </button>
        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={() => {
            navigate("/register", { replace: true });
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Intro;
