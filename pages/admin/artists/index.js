import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { getArtists } from 'controllers/artistasControllers'

const Artists = ({artists}) => {
  const router = useRouter()
  //const [loading, setLoading] = useState(true)

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

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map((artist,index) => (
          <li key={index}>
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
      <button onClick={() => router.push('/admin/artists/create')}>Create New Artist</button>
    </div>
  )
}

export default Artists

export const getServerSideProps = async () => {
  const artists = await getArtists()
  return {
    props: {
      artists: artists
    }
  }

}
