import { React } from 'react';
import { NavLink } from "react-router-dom";
import './App.css';


function MainScreen(props) {

    return (
        <div className="App">
                <div className="App">
                    <div className='header'>Карты</div>
                    <div className='listOfSave'>
                        {props.deckKeys.length && 
                            props.deckKeys.map(deckKey => (
                                <div key={props.allDeck[deckKey].idInList}>
                                    <NavLink id={props.allDeck[deckKey].idInList} to={`/DeckOfCard`} onClick={(e) => props.changeADeck(e.target.id)}>
                                        Игра {(props.allDeck[deckKey].idInList + 1)}
                                    </NavLink>
                                </div>
                            ))
                        }
                    </div>
                    <NavLink to={`/DeckOfCard`} onClick={props.getADeck}>Новая игра</NavLink>
                </div>
        </div>
    );  
}

export default MainScreen;
