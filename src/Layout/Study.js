import {useParams, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import { readDeck } from "../utils/api";
import Cards from "../items/Cards";
import NotFound from "./NotFound";
import HistoryNav from "../items/HistoryNav";
import NotEnough from "./NotEnough";

function Study(){

    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [numCards, setNumCards] = useState(0);
    const history = useHistory();
    
    // Load the Deck
    useEffect(() => {
        const signal = new AbortController().signal;
        async function loadDeck(){
            const loadedDeck =  await readDeck(deckId, signal);
            const {cards} = loadedDeck;
            setDeck(loadedDeck);
            setNumCards(prevVal => cards.length);
        }

        loadDeck();
    }, []);

    function addCardLink(){
        history.push(`/decks/${deckId}/cards/new`);
    }
    
    const checkCardCount = () => {
        if (numCards < 3){
            return <NotEnough numCards={numCards} addCardLink={addCardLink} />
        }else{
            return <Cards deckId={deckId}/>
        }
    }

    if(deck){
        return (
            <>
                <HistoryNav name={deck.name} refer="Study"/>
                <div className="center-text">
                    <h1>{deck ? deck.name : "No Deck Loaded"}: Study</h1>
                </div>
                {checkCardCount()}
            </>
        )
    }else{
        <NotFound />
    }
    
}

export default Study;