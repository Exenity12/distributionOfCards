import { React } from 'react';
import { NavLink } from "react-router-dom";
import './App.css';


function MainScreen(props) {

    return (
        <div className="App">
                <div className="App">
                    <div className='header'>Карты</div>
                    <div>
                        {props.deckKeys.length && 
                            props.deckKeys.map(deckKey => (
                                <NavLink to={`/DeckOfCard`} key={props.allDeck[deckKey].idInList} onClick={(e) => props.changeADeck(e.target.innerHTML)}>
                                    {props.allDeck[deckKey].idInList}
                                </NavLink>
                            ))
                        }
                    </div>
                    <NavLink to={`/DeckOfCard`} onClick={props.getADeck}>Start</NavLink>
                </div>
        </div>
    );  
}

export default MainScreen;
