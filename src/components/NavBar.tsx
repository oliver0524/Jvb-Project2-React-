import React, {useContext} from "react";
import { Link } from "react-router-dom"
import { DarkModeContext } from "../DarkModeContext";


export function Navbar(){
 /*   const {isDarkMode} = useContext(DarkModeContext); */
    

    return (
        <nav className="navbar">
      {/* Navbar content */}
            <ul> 
                <li className="navbar-item"><Link to=''>Landing Page</Link></li>
                <li className="navbar-item"><Link to='/products'>Product Page</Link></li>
                <li className="navbar-item"><Link to='/sellers'>Seller Page</Link></li>
            </ul>
         </nav>

    );
}