import { React, useState } from 'react';
import DeckOfCard from ".//DeckOfCard.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import './App.css';
import MainScreen from './MainScreen.js';

function App() {

    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    const [allDeck, setAllDeck] = useState({});
    const [actualIdDeck, setActualIdDeck] = useState(0);
    const [idDeckInAllList, setIdDeckInAllList] = useState(0);
    const [deckKeys, setDeckKeys] = useState([]);

    let getADeck = async () => {
        console.log("the deck is received");
        const req = await axios.get(url);
        setActualIdDeck(req.data.deck_id);
        setAllDeck(prev => ({
            ...prev,
            [req.data.deck_id]: {
                counterBalance: 52,
                deckPlayerOne: [],
                deckPlayerTwo: [],
                idInList: idDeckInAllList,
                actualIdDeck: req.data.deck_id,
            }
        }));
        setIdDeckInAllList(prev => prev + 1);
    };

    let getCardPlayerOne = async () => {
        let urlCard = "https://deckofcardsapi.com/api/deck/" + actualIdDeck + "/draw/?count=1";
        const resOne = await axios.get(urlCard);
        let clonObj = Object.assign({}, allDeck);
        clonObj[actualIdDeck].deckPlayerOne.push(...resOne.data.cards);
        clonObj[actualIdDeck].counterBalance = resOne.data.remaining;
        setAllDeck(clonObj);
    };

    let getCardPlayerTwo = async () => {
        let urlCard = "https://deckofcardsapi.com/api/deck/" + actualIdDeck + "/draw/?count=1"
        const resTwo = await axios.get(urlCard);
        let clonObj = Object.assign({}, allDeck);
        clonObj[actualIdDeck].deckPlayerTwo.push(...resTwo.data.cards);
        clonObj[actualIdDeck].counterBalance = resTwo.data.remaining;
        setAllDeck(clonObj);
    };

    let restart = () => {
        setDeckKeys(Object.keys(allDeck))
    };

    let changeADeck = (value) => {
        deckKeys.forEach(keys => {
            if(allDeck[keys].idInList == value){
                setActualIdDeck(allDeck[keys].actualIdDeck);
            };
        });
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                    <MainScreen 
                        allDeck={allDeck}
                        getADeck={getADeck}
                        changeADeck={changeADeck}
                        deckKeys={deckKeys}
                    />}/>
                    <Route path="/DeckOfCard" element={
                        <DeckOfCard
                            setAllDeck={setAllDeck}
                            allDeck={allDeck}
                            getCardPlayerOne={getCardPlayerOne}
                            getCardPlayerTwo={getCardPlayerTwo}
                            actualIdDeck={actualIdDeck}
                            restart={restart}
                        />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );  
}

export default App;
