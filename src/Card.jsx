import { useState, useEffect } from 'react';


function Card({ cardData }) {
    return (
        <div>
            <img src={cardData.image} alt={cardData.code} />
        </div>
    );
}


export default Card;

