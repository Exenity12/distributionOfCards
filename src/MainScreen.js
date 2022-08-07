import { React } from 'react';
import { NavLink } from "react-router-dom";
import './App.css';


function MainScreen(props) {

    let changeADeck = (value) => {
        console.log(value.innerHTML)
        props.allDeck.forEach(item => {
            if(item.id == value.innerHTML) {
                console.log(item)
                props.setLoadSave(item)
            };
        });
        props.setIsLoadSave(true);
    };

    return (
        <div className="App">
                <div className="App">
                    <div className='header'>Карты</div>
                    <div>
                        {props.allDeck.map(item => <NavLink to={`/DeckOfCard`} key={item.id} onClick={(e) => changeADeck(e.target)}>{item.id}</NavLink>)}
                    </div>
                    <NavLink to={`/DeckOfCard`} onClick={props.getADeck}>Start</NavLink>
                </div>
        </div>
    );  
}

export default MainScreen;
