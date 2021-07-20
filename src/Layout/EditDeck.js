import "./styles.css";
import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function EditDeck(){
    const history = useHistory();
    const {deckId} = useParams();

    const initState = {
        "name": "The name of the deck",
        "description": "The description of the deck",
    };
    const [state, setState] = useState(initState);

    useEffect(() => {
        async function loadDeckInfo(){
            const signal = new AbortController().signal;
            const deck = await readDeck(deckId, signal);

            setState({["name"]: deck.name, ["description"]: deck.description});
        }

        loadDeckInfo();
    }, [])

    function onChangeHandler(event){
        setState({...state, [event.target.id]: event.target.value});
    }

    function onSubmitHandler(){
        const deck = {
            "name": state.name,
            "description": state.description,
            "id": deckId
        };

        const signal = new AbortController().signal;
        updateDeck(deck, signal);
        history.push("/");
    }

    return(
        <div className="form-container col-lg-8">
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

export default EditDeck;