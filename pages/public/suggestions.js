import React from 'react'
import { useState } from 'react'
import { getAlbums } from 'controllers/albumsController'
import { rateAlbum } from 'controllers/albumsController'

const suggestions = ({albums}) => {
  //const router = useRouter()
  return (
    <div>
        <h1>For me</h1>
      <ul>
        {albums.map((album, index) => (
          <li key={index}>
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <p>{album.year}</p>
            <p>{album.genre}</p>
            <p>{album.tracks}</p>
            {/* <button onClick={() => ratingAlbum(album)}>Rate</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default suggestions

export const getServerSideProps = async () => {
  const albums = await getAlbums()
  return {
    props: {
      albums: albums
    }
  }

}
