import React from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
        <h2>Positions</h2>
        <p>Lat : {lat}</p>
        <p>Lng : {lng}</p>
        <button onClick={() => setSearchParams({lat: 50, lng: 60})}>Get back</button>
    </div>
  )
}
