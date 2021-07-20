function NotEnough({numCards, addCardLink}){
    
    return (
        <div>
            <h1>Not enough cards</h1>
            <p>You need at least 3 cards to study.  There are {numCards} cards in this deck.</p>
                <button className="btn btn-primary" onClick={addCardLink}>+ Add Cards</button>
        </div>
    )
}

export default NotEnough;