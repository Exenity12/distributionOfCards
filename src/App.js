import { React, useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let idDeckCard;
let idIsReceived = false


function App() {

    const [deckPlayerTwo, setDeckPlayerTwo] = useState([]);
    const [deckPlayerOne, setDeckPlayerOne] = useState([]);
    
    let getADeck = async () => {
        if(idIsReceived) return;
        console.log("the deck is received")
        idIsReceived = true;
        const req = await axios.get(url);
        idDeckCard = req.data.deck_id;
    };

    let getCardPlayerOne = async () => {
        if(!idIsReceived) return;
        idIsReceived = true;
        let urlCard = "https://deckofcardsapi.com/api/deck/" + idDeckCard + "/draw/?count=1"
        const resOne = await axios.get(urlCard);
        setDeckPlayerOne([...deckPlayerOne, ...resOne.data.cards]);
    };

    let getCardPlayerTwo = useCallback(
        async () => {
            if(!idIsReceived) return;
            idIsReceived = true;
            let urlCard = "https://deckofcardsapi.com/api/deck/" + idDeckCard + "/draw/?count=1"
            const resTwo = await axios.get(urlCard);
            setDeckPlayerTwo([...deckPlayerTwo, ...resTwo.data.cards]);
        }, [deckPlayerTwo]
    );

    let restart = () => {
        setDeckPlayerOne([]);
        setDeckPlayerTwo([]);
        idIsReceived = false
    }


    useEffect(() => {
        console.log(deckPlayerOne)
    }, [deckPlayerOne]);

    useEffect(() => {
        console.log(deckPlayerTwo)
    }, [deckPlayerTwo]);


    return (
        <div className="App">
            <div className="distribution">
                <button onClick={getADeck}>distribution</button>
            </div>
            <div className="restart">
                <button onClick={restart}>restart</button>
            </div>
            <div className="playerOne">
                <button  className='buttonGetCard' onClick={getCardPlayerOne}>playerOne</button>
                <div className="tableCardList">{deckPlayerOne.map(item => 
                    <div key={item.code}>
                        <img className='cardsList' src={item.images.png} alt={item.code}></img>
                    </div>)}
                </div>
            </div>
            <div className="playerTwo">
                <button className='buttonGetCard' onClick={getCardPlayerTwo}>playerTwo</button>
                <div className="tableCardList">{deckPlayerTwo.map(item => 
                    <div key={item.code}>
                        <img className='cardsList' src={item.images.png} alt={item.code}></img>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default App;
