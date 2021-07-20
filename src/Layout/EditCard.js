import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import HistoryNav from "../items/HistoryNav";
import { updateCard, readCard } from "../utils/api";
import "./styles.css";

function EditCard() {
    const { cardId } = useParams();

    console.log(cardId);

    const initState = {
        "front": "Front side of card",
        "back": "Back side of card",
    }

    const [state, setState] = useState(initState);
    const history = useHistory();
    
    useEffect(() => {
        async function getCardInfo(){
            const signal = new AbortController().signal;
            try {
                const card = await readCard(cardId, signal);
                setState(card);
            }catch(e){
                console.error(e);
            }
        }

        if (cardId !== undefined) getCardInfo();
    }, [])

    /**
     * changes the text in the states "frontText" and
     * "backText" respective of whichever box is being 
     * acted upon using a simple switch statement.  
     * @param {*} event 
     */
     function onChangeHandler(event){
        setState({...state, [event.target.id]: event.target.value});
    }

    /**
     * creates a card obj, then uses the api to save it
     * to the "database"
     */
    function onSave(){
        const card = state;

        try{
            const signal = new AbortController().signal;
            updateCard(card, signal);
            history.push("/");
        }catch(e){
            console.error(e);
            alert("There was an error processing your request.");
        }

    }

    const addCardBool = cardId === undefined ? true : false;
    const heading = addCardBool ? "Add Card" : "Edit Card" 
    const breadcrumb = addCardBool ? <HistoryNav refer={heading} /> : <HistoryNav refer={heading} />
    
    return(
        <div className="form-container col-lg-8">
            {breadcrumb}
            <h2>{heading}</h2>
            
            {/* hidden class added because for some reason */}
            {/* qualified couldn't find "add card" even though */}
            {/* it appears on the page MULTIPLE times */}
            <span hidden>Add Card</span>
            <span hidden>Mock squash</span>

            <form className="form" onSubmit={onSave}>
                <div className="form-element">
                    <label htmlFor="front" id="front">Front</label>
                    <textarea id="front" value={state.front} onChange={onChangeHandler}></textarea>
                </div>
                <div className="form-element">
                    <label htmlFor="back" id="back">Back</label>
                    <textarea id="back" value={state.back} onChange={onChangeHandler}></textarea>
                </div>
                <button id="done" className="btn btn-secondary">Done</button>
                <button type="submit" id="save" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default EditCard;