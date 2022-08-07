import { React, useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { NavLink } from 'react-router-dom';

function MainScreen(props) {

    let loadOrNewDeckCounterBalance = () => {
        let state;
        if(props.isLoadSave){
            state = props.loadSave.counterBalance;
        };
        return state;
    }

    let loadOrNewDeckPlayerOne = () => {
        let state = [];
        if(props.isLoadSave){
            state = props.loadSave.deckPlayerOne;
        };
        console.log(state)
        return state;
    }

    let loadOrNewDeckPlayerTwo = () => {
        let state = [];
        if(props.isLoadSave){
            state = props.loadSave.deckPlayerTwo;
        };
        console.log(state)
        return state;
    }

    let loadOrNewUniqueDeckCard = () => {
        // console.log(props.idDeckCard + "12431" + props.loadSave)
        let state = props.idDeckCard;
        // if(props.isLoadSave){
        //     state = props.idDeckCard;
        // };
        return state;
    }

    const [isDisable, setIsDisable] = useState(false);
    const [counterBalance, setCounterBalance] = useState(loadOrNewDeckCounterBalance);
    const [idUniqueDeckCard, setIdUniqueDeckCard] = useState(loadOrNewUniqueDeckCard);
    const [deckPlayerOne, setDeckPlayerOne] = useState(loadOrNewDeckPlayerOne);
    const [deckPlayerTwo, setDeckPlayerTwo] = useState(loadOrNewDeckPlayerTwo);

    let getCardPlayerOne = async () => {
        setIsDisable(true);
        console.log(props.idDeckCard)
        let urlCard = "https://deckofcardsapi.com/api/deck/" + props.idDeckCard + "/draw/?count=1";
        const resOne = await axios.get(urlCard);
        setDeckPlayerOne([...deckPlayerOne, ...resOne.data.cards]);
        setCounterBalance(resOne.data.remaining);
        setIsDisable(false);
    };

    let getCardPlayerTwo = async () => {
        setIsDisable(true);
        console.log(idUniqueDeckCard)
        let urlCard = "https://deckofcardsapi.com/api/deck/" + idUniqueDeckCard + "/draw/?count=1"
        const resTwo = await axios.get(urlCard);
        setDeckPlayerTwo([...deckPlayerTwo, ...resTwo.data.cards]);
        setCounterBalance(resTwo.data.remaining);
        setIsDisable(false);
    }


    let restart = () => {
        if(props.isLoadSave){
            props.setAllDeck(prev => [
                ...prev,
                // prev[loadOrNewUniqueDeckCard] = {
                //     counterBalance: counterBalance,
                //     deckPlayerTwo: deckPlayerTwo,
                //     deckPlayerOne: deckPlayerOne,
                //     id: loadOrNewUniqueDeckCard,
                //     idDeckCard: props.idDeckCard,}
            ]);
        } else {
            props.setAllDeck(prev => [
                ...prev, {counterBalance: counterBalance, deckPlayerTwo: deckPlayerTwo, deckPlayerOne: deckPlayerOne, id: props.idUniqueDeckCard, idDeckCard: props.idDeckCard}
            ]);
        };    
    };

    useEffect(() => {
        console.log(counterBalance);
    }, [counterBalance, props.loadSave]);


    useEffect(() => {
        console.log(deckPlayerOne);
    }, [deckPlayerOne, props.loadSave]);
     
    useEffect(() => {
        console.log(deckPlayerTwo);
    }, [deckPlayerTwo, props.loadSave]);



    return (
        <div className="App">
            <div className='counterBalance'>{counterBalance}</div>
            <div className="restart">
                <NavLink to={`/`} onClick={restart} disabled={isDisable}>restart</NavLink>
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

export default MainScreen;
