import { useNavigate } from "react-router-dom";
import styles from "./CSS/NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.text}>
        The page you are looking for does not exist.
      </p>

      <button
        className={styles.button}
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
