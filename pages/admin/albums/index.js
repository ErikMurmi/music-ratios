import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAlbums } from 'controllers/albumsController'

const Albums = ({albums}) => {
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
      <h1>Albums</h1>
      <ul>
        {albums.map((album,index) => (
          <li key={index}>
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <p>{album.year}</p>
            <p>{album.genre}</p>
            <p>{album.tracks}</p>
            <p>{'Votes: '+album.votes}</p>
            <p>{'Rating: '+album.rating}</p>
            <button onClick={() => router.push(`/artists/edit/${artist.id}`)}>
              Edit
            </button>
            <button onClick={() => deleteArtist(artist.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/admin/albums/create')}>Create New Album</button>
    </div>
  )
}

export default Albums

export const getServerSideProps = async () => {
  const albums = await getAlbums()
  return {
    props: {
      albums: albums
    }
  }

}
