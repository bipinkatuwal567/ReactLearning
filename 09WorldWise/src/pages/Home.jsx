import React from 'react'
import PageNav from '../components/PageNav'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <PageNav />
      <h1>Home</h1>
      <Link to='/app'>Go to app</Link>
    </div>
  )
}
