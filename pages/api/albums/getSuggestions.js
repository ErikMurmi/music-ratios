import { collection, getDocs, addDoc, doc, getDoc, query,where } from "firebase/firestore";
import { db } from "config/client";

const base_url=process.env.NEXT_PUBLIC_base_api_url
const miminumRating = 3.5

export default async function getSuggestions(req,res){
    const {preferences} = req.body
    //console.log('body: ', req.body )
    let suggestions = []
    if(!preferences){
        res.status(400).send("Se debe enviar un preferencias")
        return
    }
    const response = await fetch(`${base_url}/albums`)
    const albums = await response.json()
    //console.log('albums: ', albums)

    for(let i=0; i<albums.length;i++){
        const album = albums[i]
        if(matchGenre(album,preferences) && album.rating > miminumRating){
            const artistRes = await fetch(`${base_url}/artists/getByName?name=${album.artist}`)
            const artist = await artistRes.json()
            if(artist.genre===album.genre){
                album.rating += 1
            }
            suggestions.push(album)     
        }
    }
    suggestions = sortByRating(suggestions)

    return res.status(200).json(suggestions)
}

function matchGenre(album,preferences){
    for(const genre of preferences){
        if(genre === album.genre){
            return true
        }
    }
    return false
}

function sortByRating(albums) {
    // Recorre cada elemento
    for (let i = 1; i < albums.length; i++) {
      // Almacena el elemento actual en una variable
      let current = albums[i];
      // Inicializa j como i - 1
      let j = i - 1;
      // Mientras j sea mayor o igual a 0 y el elemento en la posición j tenga un rating mayor que el elemento actual
      while (j >= 0 && albums[j].rating < current.rating) {
        // Desplaza el elemento en la posición j al siguiente lugar
        albums[j + 1] = albums[j];
        // Decrementa j en 1
        j--;
      }
      // Coloca el elemento actual en la posición correcta
      albums[j + 1] = current;
    }
    // Devuelve la matriz ordenada
    return albums;
}
  