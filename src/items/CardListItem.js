import { useRouteMatch, Link } from "react-router-dom";

function CardListItem({card, del}){

    const { url } = useRouteMatch();

    return(
        <div className="card-display p-2">
            <div className="deck col-lg-8">
                <div className="card-list-text-container">
                    <div className="card-list-text">{card.front}</div>
                    <div className="card-list-text">{card.back}</div>
                </div>
                <div className="card-btns">
                    <Link to={`${url}/cards/${card.id}`}>
                        <button className="btn btn-secondary ml-auto">Edit</button>
                    </Link>
                    <button className="btn btn-danger ml-1" onClick={() => del(card.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default CardListItem;