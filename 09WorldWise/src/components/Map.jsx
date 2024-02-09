import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useCity } from "../contexts/CitiesContext";

export default function Map() {
  const navigate = useNavigate();
  const {cities} = useCity();

  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => <Marker position={[city.position.lat, city.position.lng]}>
          <Popup>
            <span>{city.cityName}</span>
          </Popup>
        </Marker>)}
      </MapContainer>
    </div>
  );
}
