import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
        <Link to="/">
            Fast React Pizza Co.
        </Link>
    </header>
  )
}
