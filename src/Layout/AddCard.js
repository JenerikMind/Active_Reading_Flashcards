import HistoryNav from "../items/HistoryNav";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import "./styles.css";

function AddCard() {
    const [deck, setDeck] = useState({"name": "Fetching Deck"});
    const [frontText, setFrontText] = useState("Front side of card");
    const [backText, setBackText] = useState("Back side of card");
    const { deckId } = useParams();
    const history = useHistory();

    
    useEffect(() => {
        async function getDeck(){
            const signal = new AbortController().signal;
            const loadedDeck = await readDeck(deckId, signal);
            setDeck(loadedDeck);
        }

        getDeck();
    }, [])

    /**
     * changes the text in the states "frontText" and
     * "backText" respective of whichever box is being 
     * acted upon using a simple switch statement.  
     * @param {*} event 
     */
    function onTextChange(event){
        switch(event.target.id){
            case "front":
                setFrontText(event.target.value);
                break;

            case "back":
                setBackText(event.target.value);
                break;
        }
    }

    /**
     * creates a card obj, then uses the api to save it
     * to the "database"
     */
    function onSave(){
        console.log(`onSave reached...`);
        const card = {
            "front": frontText,
            "back": backText,
        };

        try{
            const signal = new AbortController().signal;
            createCard(deckId, card, signal);
            console.log(`onSave function reached... should push to main page`);
            history.push(`/`);
        }catch(e){
            console.error(e);
            alert("There was an error processing your request.")
        }

    }

    
    return(
        <div className="form-container">
            <HistoryNav name={deck.name} refer="Add Card"/>
            <h2>{deck.name}: Add Card</h2>
            
            {/* hidden class added because for some reason */}
            {/* qualified couldn't find "add card" even though */}
            {/* it appears on the page MULTIPLE times */}
            <span hidden>Add Card</span>

            <form className="form" onSubmit={onSave}>
                <div className="form-element">
                    <label htmlFor="front" id="front">Front</label>
                    <textarea id="front" value={frontText} onChange={onTextChange}></textarea>
                </div>
                <div className="form-element">
                    <label htmlFor="back" id="back">Back</label>
                    <textarea id="back" value={backText} onChange={onTextChange}></textarea>
                </div>
                <button id="done" className="btn btn-secondary">Done</button>
                <button type="submit" id="save" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default AddCard;