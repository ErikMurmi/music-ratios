import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useUser from "../hooks/useUser"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/client"
import { addUser } from "../controllers/usersController"
import { genres } from "utils/data"

export const Signup = () => {
    const user = useUser()
    const router = useRouter()
    let selectedGenres= [];
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        preferencias:[]
    })

    useEffect(() => {
        user && router.replace("/")
    }, [user])

    const handleChange = (e) => {
        const { value, name } = e.target
        setNewUser({ ...newUser, [name]: value })
    }

    const handleGenreChange = (e) => {
        //setSelectedGenres(event.target.value);
        const {value,checked} = e.target
        if (checked){
            selectedGenres.push(value)
        }else{
            selectedGenres = Array.from(selectedGenres.filter((item)=>item!==value))
        }
        console.log('checkbox value ',selectedGenres)
      };

    const signUp = async (form) => {
        form.preventDefault()
        newUser.preferencias = selectedGenres
        if (newUser.preferencias.length<3){
            alert("Debes seleccionar al menos 3 generos musicales")
        }else{
            await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                addUser({ id: user.uid, ...newUser })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("code:", errorCode, "msg:", errorMessage)
                return null
            });
        }
    }

    return (
        <div>
            <h1>Unete a la comunidad</h1>
            <form onSubmit={signUp}>

                <label htmlFor="nombre">Nickname</label><br />
                <input id="nombre" type="text" name="name" onChange={handleChange}
                    placeholder="Tu nombre completo"></input> <br />
                <label htmlFor="email">Email</label><br />
                <input id="email" name="email" onChange={handleChange}
                    type="email" placeholder="example@mail.com"></input> <br />
                <label htmlFor="contrasenia">Contraseña</label><br />
                <input id="contrasenia" name="password" onChange={handleChange}
                    type="password" placeholder="Mínimo 6 caracteres" minLength={6}></input> <br />
                <label htmlFor="genres">Genres:</label>
                {genres.map((genre, index) => (  
                    <div key={index}>
                        <label>{genre}</label>
                        <input type="checkbox" onChange={handleGenreChange}
                         value={genre}></input>
                    </div>
                ))}
                <input type="submit" value="Registrar"></input>
            </form>
            <div className="linkCenter">
                <p>Ya tienes una cuenta? </p>
                <Link href="/" className="link">
                    Inicia sesión aquí
                </Link>
            </div>
        </div>
    )
}

export default Signup