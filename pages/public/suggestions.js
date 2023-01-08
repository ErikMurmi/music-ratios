import React from 'react'
import { useState,useEffect } from 'react'
import { getSuggestions } from 'controllers/albumsController'
import useUser from 'hooks/useUser'
import { getUser } from "controllers/usersController"

const Suggestions = () => {
  const user = useUser()

  const [userInfo,setUserInfo] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [percentajes, setPercentajes] = useState(undefined)
  useEffect(()=>{
      async function getInfo(id){
          const info = await getUser({id:id})
          setUserInfo(info)
      }
      if(user){
          getInfo(user.uid)
      }
  },[user])
  
  useEffect(()=>{
    async function getMySuggestions(){
        const suggestionsList = await getSuggestions(userInfo.preferencias)
        setSuggestions(suggestionsList)
    }
    
    if(userInfo){
        getMySuggestions()
    }

},[userInfo])


useEffect(()=>{
  if(userInfo.preferencias !== undefined && suggestions!=undefined){
    solvePercentajes()
  }
},[suggestions])

function solvePercentajes(){
  const genres =  userInfo.preferencias
  let conteo = {}
  for(const genre of genres ){
    conteo[genre] = 0
  }
  for(const suggestion of suggestions){
    conteo[suggestion.genre] +=1
  }
  for(const genre of genres ){
    conteo[genre] = conteo[genre]/suggestions.length
  }
  setPercentajes(conteo)
}

// function solvePercentajes(){
//   const genres =  userInfo.preferencias
//   let conteo = {}
//   for(const genre of genres ){
//     conteo[genre] = {name:genre,percentaje:0}
//   }

//   for(const suggestion of suggestions){
//     conteo[suggestion.genre].percentaje +=1
//   }
  
//   for(const genre of genres ){
//     conteo[genre].percentaje = conteo[genre].percentaje/suggestions.length
//   }
//   setPercentajes(conteo)
// }


  return (
    <div>
        <h1>For me</h1>
        {userInfo?<p>{userInfo.preferencias}</p>:null}

        <h2>Porcentajes</h2>
        {/* {
          suggestions?<ul>
          {percentajes.map((genre, index) => (
            <li key={index}>
              <h4>{genre.name +" "+ genre.percentaje }</h4>
            </li>
          ))}</ul>:null
        } */}

        {
          percentajes?<p>{JSON.stringify(percentajes)}</p>:null
        }
      {suggestions? 
      <ul>
        {suggestions.map((album, index) => (
          <li key={index}>
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <p>{album.year}</p>
            <p>{album.genre}</p>
            <p>{album.tracks}</p>
          </li>
        ))}</ul>:null}
        
      
    </div>
  );
}

export default Suggestions

