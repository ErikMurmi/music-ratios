import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

const Artists = () => {
  const router = useRouter()
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch artists from API or database here
    // Once data is retrieved, set the state with setArtists
    // and set loading to false
  }, [])

  const createArtist = (artist) => {
    // Send a POST request to the API or database to create a new artist
    // Then, fetch the updated list of artists and set the state with setArtists
  }

  const updateArtist = (id, artist) => {
    // Send a PUT request to the API or database to update an existing artist
    // Then, fetch the updated list of artists and set the state with setArtists
  }

  const deleteArtist = (id) => {
    // Send a DELETE request to the API or database to delete an existing artist
    // Then, fetch the updated list of artists and set the state with setArtists
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <h2>{artist.name}</h2>
            <p>{artist.description}</p>
            <p>{artist.genre}</p>
            <button onClick={() => router.push(`/artists/edit/${artist.id}`)}>
              Edit
            </button>
            <button onClick={() => deleteArtist(artist.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/artists/create')}>Create New Artist</button>
    </div>
  )
}

export default Artists
