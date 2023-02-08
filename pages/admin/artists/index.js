import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { getArtists } from 'controllers/artistasControllers'
import { deleteArtist } from 'controllers/artistasControllers'
import { connectStorageEmulator } from 'firebase/storage'

const Artists = ({artists}) => {
  const router = useRouter()

  const createArtist = (artist) => {
  }

  const updateArtist = (id, artist) => {
  }

  const removeArtist = async (id) => {
    const res = await deleteArtist(id)
    console.log('res is: ' , res)
    if(res.ok){
      alert('Se borro correctamente')
      router.reload()
    }else{
      alert('No se pudo borrar')
    }
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
            <button onClick={() => removeArtist(artist.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.replace('/admin/artists/create')}>Create New Artist</button>
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
