import { createContext, useContext, useEffect, useState } from "react";

const BASED_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  
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
  
  async function fetchCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASED_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASED_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setCities(city => [...city, data]);

    } catch {
      alert("There was an error creating...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASED_URL}/cities/${id}`, {method: "DELETE"});

      setCities(cities => cities.filter(city => city.id !== id));

    } catch {
      alert("There was an error deleting...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCity() {
  const cities = useContext(CitiesContext);
  if (cities === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return cities;
}
export { CitiesProvider, useCity };
