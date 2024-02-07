import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <p className={styles.name}>{cityName}</p>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
