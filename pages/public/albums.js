import React from 'react'
import { useState } from 'react'
import { getAlbums } from 'controllers/albumsController'
import { rateAlbum } from 'controllers/albumsController'

const Albums = ({albums}) => {
  //const router = useRouter()
  const [rate, setRate] = useState(1);

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  async function ratingAlbum(album){
    const res = await rateAlbum(album.id,rate)
    if(res.ok){
        alert('Valoraste a ', album.title)
    }else{
        alert('No se pudo valorar el album')
    }
  }


  return (
    <div>
      <ul>
        {albums.map((album, index) => (
          <li key={index}>
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <p>{album.year}</p>
            <p>{album.genre}</p>
            <p>{album.tracks}</p>
            <p>{'Rate'}</p>
            <select
              id="rate"
              name="rate"
              onChange={handleRateChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button onClick={() => ratingAlbum(album)}>Rate</button>
          </li>
        ))}
      </ul>
    </div>
  );
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
