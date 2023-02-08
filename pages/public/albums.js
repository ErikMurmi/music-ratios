import React from 'react'
import { useState } from 'react'
import { getAlbums } from 'controllers/albumsController'
import { rateAlbum } from 'controllers/albumsController'

/**Libreria estilos */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Select, MenuItem } from '@mui/material';

//import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';

const Albums = ({ albums }) => {
  //const router = useRouter()
  const [rate, setRate] = useState(1);
  const defaultRate = 1;

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  async function ratingAlbum(album) {
    const res = await rateAlbum(album.id, rate)
    if (res.ok) {
      alert('Valoraste a ', album.title)
    } else {
      alert('No se pudo valorar el album')
    }
  }


  /**FUNCIONES LISTA */
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    // <div>
    //   <ul>
    //     {albums.map((album, index) => (
    //       <li key={index}>
    //         <h2>{album.title}</h2>
    //         <p>{album.artist}</p>
    //         <p>{album.year}</p>
    //         <p>{album.genre}</p>
    //         <p>{album.tracks}</p>
    //         <p>{'Rate'}</p>
    //         <select
    //           id="rate"
    //           name="rate"
    //           onChange={handleRateChange}
    //         >
    //           <option value={1}>1</option>
    //           <option value={2}>2</option>
    //           <option value={3}>3</option>
    //           <option value={4}>4</option>
    //           <option value={5}>5</option>
    //         </select>
    //         <button onClick={() => ratingAlbum(album)}>Rate</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <div style={{ "display": "flex" }}>
      {albums ?
        <ul className='albums-list'>
          {albums.map((album, index) => (
            <li key={index}><br />

              <Card sx={{ width: "30rem", backgroundColor: '#2d3436', color: 'white' }}>
                <CardActionArea >
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div" >
                      {album.title}
                    </Typography>
                    <Typography variant="h5" >
                      {album.artist}
                    </Typography>
                    <Typography variant="body1" >
                      {album.year} • {album.genre} <br />
                      Votes: {album.votes} / Rating: {album.rating}
                    </Typography><br />

                    <ListItemButton onClick={handleClick}>

                      <ListItemText primary="Tracks" />

                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <ListItemText primary={album.tracks} />
                    </Collapse>
                    {/* <p>{'Rate'}</p>
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
                    </select> */}
                    {/* <button onClick={() => ratingAlbum(album)}>Rate</button> */}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {/* <InputLabel id="demo-simple-select-label">Value</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="rate"
                    defaultValue={defaultRate}
                    label="value"
                    color='success'
                    onChange={handleRateChange} style={{"backgroundColor":'white'}}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <Button size="small" color="primary" onClick={() => ratingAlbum(album)}>
                    Rate
                  </Button>
                </CardActions>
              </Card>
            </li>
          ))}
        </ul> : null}
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
