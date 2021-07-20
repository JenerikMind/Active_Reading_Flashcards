import "./style.css";
import {useState, useEffect} from "react";
import NextButton from "./NextButton";

function Card(props){
    const [cardText, setCardText] = useState();
    const [nextCardBtn, setNextCardBtn] = useState(false);
    const { card, length, index, onClick } = props;
   
    // small "loading screen" if prop takes a while to load
    useEffect(() => {
        setCardText("Loading...");
        function initCard(){
            if (card) setCardText(card.front);
        }
        initCard();
    }, [card])

    function flipCard(){
        setCardText(card.back);
        setNextCardBtn(true);
    }

    function nextButtonAction(){
        onClick();
        setNextCardBtn(false);
        setCardText(card.front);
    }

    return (
        <>
            <div className="card-display">
                <div className="deck col-lg-8">
                    <div className="card-text">
                        <h3>Card {index} of {length}</h3>
                        <p>{cardText}</p>
                    </div>
                    <div className="card-btns">
                        <div className="card-left-btns">
                            <button className="flip btn btn-secondary" onClick={flipCard}>Flip</button>
                            {nextCardBtn ? <NextButton onClick={nextButtonAction} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;