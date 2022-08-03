import { React, useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let idDeckCard;
let idIsReceived = false;

function App() {

    const [isDisable, setIsDisable] = useState(true);
    const [counterBalance, setCounterBalance] = useState();
    const [deckPlayerTwo, setDeckPlayerTwo] = useState([]);
    const [deckPlayerOne, setDeckPlayerOne] = useState([]);
    
    let getADeck = async () => {
        if(idIsReceived) return;
        console.log("the deck is received");
        setIsDisable(false);
        idIsReceived = true;
        const req = await axios.get(url);
        idDeckCard = req.data.deck_id;
        setCounterBalance(req.data.remaining);
    };

    let getCardPlayerOne = async () => {
        if(!idIsReceived) return;
        setIsDisable(true);
        idIsReceived = true;
        let urlCard = "https://deckofcardsapi.com/api/deck/" + idDeckCard + "/draw/?count=1";
        const resOne = await axios.get(urlCard);
        setDeckPlayerOne([...deckPlayerOne, ...resOne.data.cards]);
        setCounterBalance(resOne.data.remaining);
        setIsDisable(false);
    };

    let getCardPlayerTwo = useCallback(
        async () => {
            setIsDisable(true);
            if(!idIsReceived) return;
            idIsReceived = true;
            let urlCard = "https://deckofcardsapi.com/api/deck/" + idDeckCard + "/draw/?count=1"
            const resTwo = await axios.get(urlCard);
            setDeckPlayerTwo([...deckPlayerTwo, ...resTwo.data.cards]);
            setCounterBalance(resTwo.data.remaining);
            setIsDisable(false);
        }, [deckPlayerTwo]
    );

    let restart = () => {
        setDeckPlayerOne([]);
        setDeckPlayerTwo([]);
        setCounterBalance();
        setIsDisable(true);
        idIsReceived = false;
    }


    useEffect(() => {
        console.log(deckPlayerOne);
    }, [deckPlayerOne]);
     
    useEffect(() => {
        console.log(deckPlayerTwo);
    }, [deckPlayerTwo]);



    return (
        <div className="App">
            <div className='counterBalance'>{counterBalance}</div>
            <div className="distribution">
                <button id="getADeck" onClick={getADeck}>Start game</button>
            </div>
            <div className="restart">
                <button onClick={restart} disabled={isDisable}>restart</button>
            </div>
            <div className="playerOne">
                <button  className='buttonGetCard' onClick={getCardPlayerOne} disabled={isDisable}>playerOne</button>
                <div className="tableCardList">{deckPlayerOne.map(item => 
                    <div key={item.code}>
                        <img className='cardsList' src={item.images.png} alt={item.code}></img>
                    </div>)}
                </div>
            </div>
            <div className="playerTwo">
                <button className='buttonGetCard' onClick={getCardPlayerTwo} disabled={isDisable}>playerTwo</button>
                <div className="tableCardList">{deckPlayerTwo.map(item => 
                    <div key={item.code}>
                        <img className='cardsList' src={item.images.png} alt="qwereqqr"></img>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default App;
