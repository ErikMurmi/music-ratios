import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAlbums } from 'controllers/albumsController'
import { deleteAlbum } from 'controllers/albumsController'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

//import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';

//import StarBorder from '@mui/icons-material/StarBorder';


const Albums = ({ albums }) => {
  const router = useRouter()

  const createArtist = (artist) => {

  }

  const updateArtist = (id, artist) => {

  }

  const removeAlbum = async (id) => {
    const res = await deleteAlbum(id)
    if (res.ok) {
      alert('Se borro correctamente')
      router.reload()
    } else {
      alert('No se pudo borrar')
    }
  }

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{ marginLeft: "2em" }}>
        <h1>Albums</h1>
        <Button onClick={() => router.replace('/admin/albums/create')}>Create New Album</Button>
      <div style={{display:'flex', justifyContent:'left'}}>
        <ul style={{ listStyleType: 'none' }} className="albums-list">
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

                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" >
                    Edit
                  </Button>
                  <Button size="small" color="primary" onClick={() => removeAlbum(album.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </li>
          ))}
        </ul>
       
      </div>

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
