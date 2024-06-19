import React from 'react'
import { Link } from 'react-router-dom'
import {Heading, Image} from "@chakra-ui/react"
import girl from "../../src/img/girl.png"

function Header() {
  return (
    <div className='headerDiv'>

<Image margin="auto" alt='girl' src={girl}/>
    <Heading mb="30px" mt="5" as="h1" textAlign="center">Realtime Voting App</Heading>
   
        
    <nav className='headerNav'>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/newQuestion">New Question</Link>
                </li>
            </ul>
        </nav>


    </div>
  )
}

export default Header