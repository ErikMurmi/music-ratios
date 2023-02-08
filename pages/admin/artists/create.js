import React, { useState } from 'react';
import { genres } from 'utils/data';
import { addArtist } from 'controllers/artistasControllers';

function AddArtistForm() {

  const [newArtist, setNewArtist] = useState({
    name: '',
    description: '',
    genre:''
})

  const handleChange = (e) => {
    const { value, name } = e.target
    setNewArtist({ ...newArtist, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addArtist(newArtist)
    console.log('res is :' + res)
    // if(res.ok){
    //   alert("Se agrego su artista")
    // }else{
    //   alert("No se pudo agregar el artista")
    // }
    // Submit form data to backend here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" onChange={handleChange} />
      <br />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name='description'
        onChange={handleChange}
      />
      <br />
      <label htmlFor="genre">Genre:</label>
      <select
        id="genre"
        name='genre'
        onChange={handleChange}
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <br />
      <button type="submit">Add Artist</button>
    </form>
  );
}

export default AddArtistForm;
