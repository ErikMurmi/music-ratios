import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAlbums } from 'controllers/albumsController'
import { deleteAlbum } from 'controllers/albumsController'

const Albums = ({albums}) => {
  const router = useRouter()

  const createArtist = (artist) => {

  }

  const updateArtist = (id, artist) => {

  }

  const removeAlbum = async (id) => {
    const res = await deleteAlbum(id)
    if(res.ok){
      alert('Se borro correctamente')
      router.reload()
    }else{
      alert('No se pudo borrar')
    }
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
            <button>
              Edit
            </button>
            <button onClick={() => removeAlbum(album.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.replace('/admin/albums/create')}>Create New Album</button>
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
