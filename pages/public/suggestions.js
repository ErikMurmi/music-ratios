import React from 'react'
import { useState, useEffect } from 'react'
import { getSuggestions } from 'controllers/albumsController'
import useUser from 'hooks/useUser'
import { getUser } from "controllers/usersController"

/**Libreria estilos */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

//import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';

const Suggestions = () => {
  const user = useUser()

  const [userInfo, setUserInfo] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [percentajes, setPercentajes] = useState(undefined)
  useEffect(() => {
    async function getInfo(id) {
      const info = await getUser({ id: id })
      setUserInfo(info)
    }
    if (user) {
      getInfo(user.uid)
    }
  }, [user])

  useEffect(() => {
    async function getMySuggestions() {
      const suggestionsList = await getSuggestions(userInfo.preferencias)
      setSuggestions(suggestionsList)
    }

    if (userInfo) {
      getMySuggestions()
    }

  }, [userInfo])


  useEffect(() => {
    if (userInfo.preferencias !== undefined && suggestions != undefined) {
      solvePercentajes()
    }
  }, [suggestions])

  function solvePercentajes() {
    const genres = userInfo.preferencias
    let conteo = {}
    for (const genre of genres) {
      conteo[genre] = 0
    }
    for (const suggestion of suggestions) {
      conteo[suggestion.genre] += 1
    }
    for (const genre of genres) {
      conteo[genre] = conteo[genre] / suggestions.length
    }
    setPercentajes(conteo)
  }


  /**FUNCIONES LISTA */
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <h1>For me</h1>
      {userInfo ? <p>{userInfo.preferencias}</p> : null}
      {/* 
        <h2>Porcentajes</h2>
        {/* {
          suggestions?<ul>
          {percentajes.map((genre, index) => (
            <li key={index}>
              <h4>{genre.name +" "+ genre.percentaje }</h4>
            </li>
          ))}</ul>:null
        } }

        {
          percentajes?<p>{JSON.stringify(percentajes)}</p>:null
        } */}
      {/* {suggestions? 
      <ul>
        {suggestions.map((album, index) => (
          <li key={index}>
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <p>{album.year}</p>
            <p>{album.genre}</p>
            <p>{album.tracks}</p>
          </li>
        ))}</ul>:null} */}
      <div style={{"display":"flex"}}>
        {suggestions ?
          <ul className='albums-list'>
            {suggestions.map((album, index) => (
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
          </ul> : null}
      </div>
    </div>
  );
}

export default Suggestions

