import { useParams, useHistory, useRouteMatch, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HistoryNav from "../items/HistoryNav";
import { readDeck, deleteCard } from "../utils/api";
import CardListItem from "../items/CardListItem";

function ViewDeck(){

    const {deckId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();

    const initState = {
        "deck":{
            "name":null,
            "description":null,
        },
        "cards":[],
    }

    const [state, setState] = useState(initState);

    useEffect(() => {
        // first get the "deck" and save it to the "deck" state
        // then get the list of cards pertaining to the "deck"
        // and then save the list to a "cards" state
        async function loadDeck(){
            const signal = new AbortController().signal;
            const deck = await readDeck(deckId, signal);
            setState({"deck": {     // "deck" is "reconstructed" to not have
                "name":deck.name,   // the cards array saved twice
                "description":deck.description,
            }, "cards": deck.cards});

            console.log({state});
        }

        loadDeck();
    }, []);
    
    async function delCard(cardId) {
        const signal = new AbortController().signal;
        if(window.confirm("Do you want to delete this card?")){
            deleteCard(cardId, signal);
            history.go(0);
        }
        
    }

    const cardList = state.cards.map((card,index) => 
        <CardListItem card={card} key={index} del={delCard} />);

    return (
        <div className="col-lg-10">
            <HistoryNav refer={state.deck.name}/>
            <div className="deck-control-panel mt-3">
                <h2>{state.deck.name}</h2>
                <p>{state.deck.description}</p>
            </div>
            <div className="card-btns">
                <Link to={`${url}/edit`}>
                    <button className="btn btn-secondary">Edit</button>
                </Link>

                <button className="btn btn-primary mx-2">Study</button>
                
                <Link to={`${url}/cards/new`}>
                    <button className="btn btn-primary">Add Cards</button>
                </Link>

                <button className="btn btn-danger justify-right">Delete</button>
            </div>
            <h2 className="my-4">Cards</h2>
            <div className="card-list">
                {cardList}
            </div>
        </div>
    );
}

export default ViewDeck;