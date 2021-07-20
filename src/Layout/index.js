import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "../items/Deck";
import Study from "./Study";
import Decks from "./Decks";
import { listDecks } from "../utils/api";
import { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";


function Layout({history}) {
  const [decks, setDecks] = useState([]);
  const { url } = useRouteMatch();

  // use to get initial list of Decks
  useEffect(()=> {
    async function getDeckList(){
      const deckList = await listDecks();
      setDecks(deckList);
    }
    getDeckList();
  }, []);


  const createDecks = decks.map((deck, index) => <Deck deck={deck} key={index} cards={deck.cards ? deck.cards.length : 0}/>);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>

          <Route path={`${url}decks/:deckId/study`}>``
            <Study />
          </Route>

          <Route path={`${url}decks/`}>``
            <Decks history={history}/>
          </Route>

          <Route path="/">
            <Link to={`${url}decks/new`}><button className="btn btn-secondary">Create Deck</button></Link>
            {decks.length !== 0 ? createDecks : <NotFound />}
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
