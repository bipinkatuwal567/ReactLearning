import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './PageNav.module.css';

export default function PageNav() {
  return (
    <div className={styles.nav}>
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/pricing'>Pricing</NavLink>
            </li>
            <li>
                <NavLink to='/product'>Product</NavLink>
            </li>
        </ul>
    </div>
  )
}
