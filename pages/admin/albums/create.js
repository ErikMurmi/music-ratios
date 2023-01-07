import React, { useState } from 'react';
import { genres } from 'utils/data';

export default function AddAlbumForm() {
  const [album, setAlbum] = useState({
    title: '',
    artist: '',
    year: '',
    genre: '',
    tracks: '',
    votes: 0,
    rating: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('album:',album)
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
      <input
        type="text"
        id="artist"
        name="artist"
        onChange={handleChange}
      />
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