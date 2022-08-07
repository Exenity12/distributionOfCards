import { React, useState } from 'react';
import DeckOfCard from ".//DeckOfCard.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import './App.css';
import MainScreen from './MainScreen.js';

function App() {

    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    const [allDeck, setAllDeck] = useState([]);
    const [idDeckCard, setIdDeckCard] = useState();
    const [idUniqueDeckCard, setIdUniqueDeckCard] = useState(-1);
    const [loadSave, setLoadSave] = useState();
    const [isLoadSave, setIsLoadSave] = useState(false);

    let getADeck = async () => {
        console.log("the deck is received");
        const req = await axios.get(url);
        setIdDeckCard(req.data.deck_id)
        setIdUniqueDeckCard(prev => prev + 1);
        setIsLoadSave(false);
    };


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                    <MainScreen 
                        getADeck={getADeck}
                        allDeck={allDeck}
                        setLoadSave={setLoadSave}
                        setIsLoadSave={setIsLoadSave}
                    />}/>
                    <Route path="/DeckOfCard" element={
                        <DeckOfCard
                            setAllDeck={setAllDeck}
                            idDeckCard={idDeckCard}
                            idUniqueDeckCard={idUniqueDeckCard}
                            loadSave={loadSave}
                            isLoadSave={isLoadSave}
                        />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );  
}

export default App;
