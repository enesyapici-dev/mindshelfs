import React from 'react'
import "./Allmovies.css"
import Movielist from '../Movielist/Movielist'
const Allmovies = ({movies}) => {
  return (
    <div>
      <Movielist movies={movies} />
    </div>
  )
}

export default Allmovies
