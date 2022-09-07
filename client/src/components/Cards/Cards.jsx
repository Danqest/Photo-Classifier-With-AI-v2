import React from 'react';
import { FaCentercode } from 'react-icons/fa';
// import img1 from '../../assets/beach_sunset.jpeg';
import '../Cards/card-style.css';
// import Button from 'react-bootstrap/Button';


const Card =props =>{
    return(
        <div className="card text-center">
        <div className="overflow">
            <img src={props.imgsrc} alt="Image 1" className='card-img-top'/>
        </div>
        <div className="card-body text">
            <h4 className="card-title">{props.title}</h4>
            <p className="card-text text secondary">
                Lorem ipsum, dolor sit amet cgonsectetur adipisicing elit. Qui nulla ipsum quos expedita.
                 Illum quasi sequi quos veritatis non. Ab unde neque ipsa magni aspernatur enim praesentium accusamus magnam asperiores.
            </p>
            <a href ="#" className='btn btn-outline-sucess'>Select</a>
        </div>
        </div>
    );
}

export default Card;
