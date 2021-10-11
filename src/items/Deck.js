import "./style.css";
import {Link} from "react-router-dom";

function Deck({deck, cards, del}){
    return (
        <div className="card-display">
            <div className="deck col-lg-8">
                <div className="card-text">
                    <div className="deck-header">
                        <h2>{deck.name}</h2>
                        <p>{cards} cards</p>
                    </div>
                    <p>{deck.description}</p>
                </div>
                <div className="card-btns">
                    <div className="card-left-btns">
                        <Link to={`/decks/${deck.id}`}>
                            <button className="view btn btn-primary">View</button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button className="study btn btn-success">Study</button>
                        </Link>
                    </div>
                    <button className="delete btn btn-danger" onClick={() => del(deck.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Deck;