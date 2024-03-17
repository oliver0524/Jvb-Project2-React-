import React, {useContext} from "react";
import { DarkModeContext } from "../DarkModeContext";
import landingImage from "./landingImage.jpg"


export function LandingPage(){
    return (
        <>
            <h1> Welcome</h1>
            <img src={landingImage} alt="Landing Image" />
        </>
    )
}

export default LandingPage;