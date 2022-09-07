import {Link} from "react-router-dom";
import  background from "../../assets/background.webp";
import './homepage.css';

function LandingPageButton() {

    return <Link to="/classifier" className="nav-link">
        <button className="btn" > 
            <span className = "Click" style={{"fontsSize": "24px"}}>
                Click Me!
            </span>
        </button>
    </Link>
}

const Hero = ({imgSrc})=> {
    return ( 
        
        <div className="hero">
            <img src={imgSrc} alt="Frames" className="heroimg"/>

        </div>
    )
}

function LandingFrameMessage() {

    const style = {
        margin: "auto",
        padding: "10% 35% 10% 15%",
        color: "white"
    }

    return <div style={style}>
        
        <div className= "text" style={{"fontSize": "65px"}}>
            Smart Photo Organizer
        </div>
        
        <div className= "text" style={{"fontSize": "36px"}}>
            Digital photo clutter? Automatically organize your photos with AI.  Classify your images into pre-set categories using artificial intelligence. 
        </div>

        <br />

        <LandingPageButton />

    </div>
}

function LandingFrame() {
    const style = {

        "backgroundImage": `url("images/tablet.jpg")`,
        "backgroundRepeat": "no-repeat",
        "backgroundSize": "cover",
        position: "absolute",
        height: "100%",
        width: "100%"
    }

    return <div style={style}>
        <LandingFrameMessage />        
    </div>
}

function HomePage() {
    return <div>
        <LandingFrame />
    </div>
}

export default HomePage;