import styles from "./Logo.module.css";
import img from "../img/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to='/'>
    <img src={img} alt="WorldWise logo" className={styles.logo} />
    </Link>
  )
}

export default Logo;
