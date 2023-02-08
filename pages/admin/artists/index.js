//import React from 'react'
import * as React from 'react';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { getArtists } from 'controllers/artistasControllers'
import { deleteArtist } from 'controllers/artistasControllers'
import { connectStorageEmulator } from 'firebase/storage'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Artists = ({ artists }) => {
  const router = useRouter()

  const createArtist = (artist) => {
  }

  const updateArtist = (id, artist) => {
  }

  const removeArtist = async (id) => {
    const res = await deleteArtist(id)
    console.log('res is: ', res)
    if (res.ok) {
      alert('Se borro correctamente')
      router.reload()
    } else {
      alert('No se pudo borrar')
    }
  }

  return (
    <div style={{marginLeft:"2em"}}>
      <h1>Artists</h1>
      <Button onClick={() => router.replace('/admin/artists/create')}>Create New Artist</Button>
       <div style={{display:'flex', justifyContent:'left'}}>
      <ul className='artist-list'>
        {artists.map((artist, index) => (
          <li key={index}><br/>
            <Card sx={{ width: "20rem", backgroundColor:'#2d3436', color:'white' }}>
              <CardActionArea >                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" >
                  {artist.name}
                  </Typography>
                  <Typography variant="body2" >
                  {artist.description}<br/><br/>
                  {artist.genre}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => router.push(`/artists/edit/${artist.id}`)}>
                  Edit
                </Button>
                <Button size="small" color="primary" onClick={() => removeArtist(artist.id)}>
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

export default Artists

export const getServerSideProps = async () => {
  const artists = await getArtists()
  return {
    props: {
      artists: artists
    }
  }

}
