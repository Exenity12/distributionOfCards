import { React } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

function MainScreen(props) {
    if(!props.allDeck[props.actualIdDeck]) return

    console.log(props.allDeck[props.actualIdDeck].deckPlayerOne)

    return (
        <div className="App">
            <div className='counterBalance'>{props.allDeck[props.actualIdDeck].counterBalance}</div>
            <div className="restart">
                <NavLink to={`/`} onClick={props.restart}>restart</NavLink>
            </div>
            <div className="playerOne">
                <button className='buttonGetCard' onClick={props.getCardPlayerOne}>playerOne</button>
                <div className="tableCardList">{props.allDeck[props.actualIdDeck].deckPlayerOne.map(item => 
                    <div key={item.code}>
                        <img className='cardsList' src={item.images.png} alt={item.code}></img>
                    </div>)}
                </div>
            </div>
            <div className="playerTwo">
                <button className='buttonGetCard' onClick={props.getCardPlayerTwo}>playerTwo</button>
                <div className="tableCardList">{props.allDeck[props.actualIdDeck].deckPlayerTwo.map(item => 
                    <div key={item.code}>
                        <img className='cardsList' src={item.images.png} alt="qwereqqr"></img>
                    </div>)}
                </div>
            </div>
        </div>
    );  
};

export default MainScreen;