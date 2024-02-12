import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";

const BASED_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function reducer(state, action){
  switch(action.type){
    case 'loading': 
      return{
        ...state,
        isLoading: true
      }
    case 'cities/loaded':
      return{
        ...state,
        isLoading: false,
        cities: action.payload
      }
    case 'city/loaded':
      return{
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'city/created':
      return{
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'city/deleted': 
      return{
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => action.payload !== city.id),
        currentCity: {}
      }
    case 'error': 
      return{
        ...state,
        error: action.payload
      }
    default: 
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

  
  useEffect(() => {
    async function fetchCities() {
      dispatch({type: "loading"})
      try {
        const res = await fetch(`${BASED_URL}/cities`);
        const data = await res.json();
        dispatch({type: "cities/loaded", payload: data})
      } catch {
        dispatch({type: "error", payload: "There was an error loading..."});
      } 
    }
    fetchCities();
  }, []);
  
  const fetchCity = useCallback(async function fetchCity(id) {
    // console.log(Number(id), currentCity.id);
    if(Number(id) === currentCity.id) return;

    dispatch({type: "loading"})
    try {
      const res = await fetch(`${BASED_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type: "city/loaded", payload: data})
    } catch {
      dispatch({type: "error", payload: "There was an error loading..."});
    } 
  }, [currentCity.id]);
  
  async function createCity(newCity) {
    dispatch({type: "loading"})
    try {
      const res = await fetch(`${BASED_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      dispatch({type: "city/created", payload: data})
    } catch {
      dispatch({type: "error", payload: "There was an error creating..."});
    } 
  }
  
  async function deleteCity(id) {
    dispatch({type: "loading"})
    try {
      await fetch(`${BASED_URL}/cities/${id}`, {method: "DELETE"});
      dispatch({type: "city/deleted", payload: id})
      
    } catch {
      dispatch({type: "error", payload: "There was an error deleting..."});
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
