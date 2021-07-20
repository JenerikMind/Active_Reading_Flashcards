import { useRouteMatch, Route, Switch, Link, useParams } from "react-router-dom";
import NewDeck from "./NewDeck";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import HistoryNav from "../items/HistoryNav";

function Decks({history}){

    const { url } = useRouteMatch();
    const params = useParams();

    return(
        <div className="container-center">
            <Switch>
                <Route path={`${url}/new`}>
                    <HistoryNav refer="Create Deck"/>
                    <NewDeck />
                </Route>

                <Route path={`${url}/:deckId/edit`}>
                    <EditDeck />
                </Route>

                <Route path={`${url}/:deckId/cards/:cardId`}>
                    <HistoryNav refer="Edit Card"/>
                    <EditCard history={history}/>
                </Route>

                <Route path={`${url}/:deckId`}>
                    <ViewDeck />
                </Route>
            </Switch>
        </div>
    );
}

export default Decks;