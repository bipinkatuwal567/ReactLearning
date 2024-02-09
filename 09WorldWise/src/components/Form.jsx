// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";

const URL_BASE = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoLocationError, setGeoLocationError] = useState("");

  const [lat, lng] = useUrlPosition();

  const [isLoadingUrlPostion, setIsLoadingUrlPosition] = useState(false);
  // console.log(geoLocationError);

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingUrlPosition(true);
        setGeoLocationError("");
        const res = await fetch(`${URL_BASE}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else.😊"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);

        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoLocationError(err.message);
      } finally {
        setIsLoadingUrlPosition(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if(isLoadingUrlPostion) return <Spinner />
  if(geoLocationError) return <Message message={geoLocationError} />

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
