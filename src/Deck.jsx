import { useState, useEffect } from 'react';
import Card from './Card';
import "./Deck.css";

const CARD_BASE_URL = "https://www.deckofcardsapi.com/api/deck";

function Deck() {
    const [drawnCards, setDrawnCards] = useState([]);
    const [deck, setDeck] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            const response = await fetch(`${CARD_BASE_URL}/new/shuffle`);
            const deckResult = await response.json();
            setDeck(deckResult);
            setLoading(false);
        }
        fetchDeck();
    }, []);

    if (isLoading) return <h1>Loading...</h1>;

    async function draw() {
        const response = await fetch(`${CARD_BASE_URL}/${deck.deck_id}/draw`);
        const cardResult = await response.json();
        if (cardResult.success === true) {
            const card = cardResult.cards[0];
            setDrawnCards(
                cards => [
                    ...cards,
                    {
                        code: card.code,
                        image: card.image
                    }
                ]
            );
        } else {
            alert("Error: no cards remaining!");
        }

    }

    console.log(drawnCards);
    return (
        <div>
            <button
                className='Deck-draw'
                onClick={draw}>Draw!
            </button>
            <div className='Deck-cardContainer'>
                {drawnCards.map(c =>
                    <Card
                        key={c.code}
                        cardData={c}
                    />
                )}
            </div>

        </div>
    );



}





export default Deck;
