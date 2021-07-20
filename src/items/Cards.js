import Card from "./Card";
import {useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
import { listCards } from "../utils/api";

/**
 * Cards main function to control what is displayed by Card component
 * all states of whichever the current card will be maintained
 * by this component
 * @returns a single card element
 */
function Cards({deckId}){
    const history = useHistory();

    const defaultCard = {
        "front": "Loading Cards",
        "back": "Patience is not your virtue, is it?",
    }
    const [card, setCard] = useState(defaultCard);
    const [cards, setCards] = useState([]);
    const [index, setIndex] = useState(0);

    // get the cards in the selected deck
    useEffect(() => {
        async function getCards(){
            const signal = new AbortController().signal;
            const cardArr = await listCards(deckId, signal);

            setCards(cardArr);
        }

        getCards();
    }, [])

    // set the default card to the first one in the array
    useEffect(() => {
        if (cards.length !== 0) setCard(cards[0]);
    }, [cards]);

    function nextCard(){
        if (index < cards.length - 1){
            setIndex(prevIndex => { 
                console.log(prevIndex); 
                return prevIndex + 1;
            });
            setCard(prevCard => cards[index]);
        }else{
            if(window.confirm("Restart Cards?")){
                history.go(0);
            }else{
                history.push("/");
            };
        }
        
        console.log({index});
        console.log({cards});
    }

    return <Card card={card} length={cards.length > 3 ? cards.length : 3} index={index+1} onClick={nextCard}/>
}

export default Cards;