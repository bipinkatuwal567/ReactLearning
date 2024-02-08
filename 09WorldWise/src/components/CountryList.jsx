import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
import { useCity } from "../contexts/CitiesContext";

export default function CountryList() {
  const {cities, isLoading} = useCity();
  // const x = useCity();
  // console.log(x);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  //   if(!cities.)

  return (
    <ul className={styles.countryList}>
      {countries.map(country => <CountryItem country={country} key={country.emoji}/>)}
    </ul>
  );
}
