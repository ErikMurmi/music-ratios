import Link from "next/link"
import styles from '../styles/Navbar.module.css'
import { auth } from "config/client"
import useUser from "hooks/useUser"
import { signOut } from "firebase/auth"
// import { useEffect, useState } from "react"
// import {getUserInfo} from 'config/client'

export const NavBar =()=>{
    const user = useUser()
    // const [userInfo,setUserInfo] = useState('')
    // useEffect(()=>{
    //     async function getInfo(){
    //         const info = await getUserInfo(user)
    //         setUserInfo(info)
    //         console.log('User info',userInfo)
    //         //console.log('Tipo: ', info.tipo==1?'user':'admin')
    //     }
    //     if(user){
    //         getInfo()
    //     }
    // },[user])

    // return(
    //     <nav className={styles.navbar}>
    //         <ul>
    //         <Link href='/'>
    //             <li>Home</li>
    //         </Link>
    //         {userInfo?
    //             (userInfo.tipo==1?<>
    //             <Link href='/instalaciones'>
    //                 <li>Instalaciones</li>
    //             </Link>
    //             <Link href='/desafios'>
    //                 <li>Desafios</li>
    //             </Link> 
    //             </>
    //             :
    //             <Link href='gestores/instalaciones'>
    //                 <li>Mis instalaciones</li>
    //             </Link> ):null}
    //         {user ? <button onClick={()=>{signOut(auth)
    //         setUserInfo('')} }  className={styles.botonCerrarSesion}>
    //             Cerrar Sesión
    //         </button> :<> 
    //             <Link href='/signin'>
    //                 <li>Login</li>
    //             </Link>
    //             <Link href='/signUp'>
    //                 <li>Registrarse</li>
    //             </Link>
    //         </>}
    //         </ul>
    //     </nav>
    // )

    return(
        <nav className={styles.navbar}>
            <ul>
            <Link href='/'>
                <li>Home</li>
            </Link>
            <Link href='/instalaciones'>
                <li>Instalaciones</li>
            </Link>
            <Link href='/desafios'>
                <li>Desafios</li>
            </Link>  
            {user ? <button onClick={()=>{signOut(auth)
                } }  >
                    Cerrar Sesión
                </button> :<> 
                <Link href='/signin'>
                    <li>Login</li>
                </Link>
                <Link href='/signup'>
                    <li>Registrarse</li>
                </Link>
            </>}
            </ul>
        </nav>
    )
}