import "./styles.css";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function NewDeck(){
    const history = useHistory();

    const initState = {
        "name": "Deck Name",
        "description": "Brief description of the deck",
    };
    const [state, setState] = useState(initState);

    function onChangeHandler(event){
        setState({...state, [event.target.id]: event.target.value});
    }

    function onSubmitHandler(event){
        const deck = {
            "name": state.name,
            "description": state.description,
        };

        const signal = new AbortController().signal;
        createDeck(deck, signal);
        history.push("/");
    }

    return(
        <div className="form-container">
            <h1>Create Deck</h1>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-element">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={state.name} onChange={onChangeHandler}></input>
                </div>
                <div className="form-element">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" id="description" value={state.description} onChange={onChangeHandler}></textarea>
                </div>
                <Link to="/"><button className="btn btn-secondary">Cancel</button></Link>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default NewDeck;