import { createContext, useContext, useEffect, useState } from "react";

const BASED_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASED_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return(
    <CitiesContext.Provider
    value={{
        cities, 
        isLoading
    }}
    >
        {children}
    </CitiesContext.Provider>
  )
}

function useCity(){
    const cities = useContext(CitiesContext);
    return cities;
}
export {CitiesProvider, useCity}