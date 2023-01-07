import { getArtists } from 'controllers/artistasControllers';
import React, { useState } from 'react';
import { genres } from 'utils/data';
import { addAlbum } from 'controllers/albumsController';

export default function AddAlbumForm(props) {
  const [album, setAlbum] = useState({
    title: '',
    artist: '',
    year: '',
    genre: '',
    tracks: '',
    votes: 0,
    ratingSum:0,
    rating: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('album:',album)
    const res = await addAlbum(album)
    if(res.ok){
      alert('El disco se añadió')
    }else{
      alert('Error al guardar el disco')
    }
    // Submit form data to backend here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={handleChange}
      />
      <br />
      <label htmlFor="artist">Artist:</label>
      <select
        id="artist"
        name="artist"
        onChange={handleChange}
      >
        {props.artists.map((artist,index) => (
          <option key={index} value={artist.name}>
            {artist.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="year">Year:</label>
      <input
        type="text"
        id="year"
        name="year"
        onChange={handleChange}
      />
      <br />
      <label htmlFor="genre">Genre:</label>
      <select
        id="genre"
        name="genre"
        onChange={handleChange}
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="tracks">Tracks:</label> <br/>
      <textarea
        id="tracks"
        name="tracks"
        onChange={handleChange}
        rows="12"
      />
      <br />
      <button type='submit'>Add</button>
    </form>)
}

export const getServerSideProps = async () => {
  const artists = await getArtists()
  return {
    props: {
      artists: artists
    }
  }

}
