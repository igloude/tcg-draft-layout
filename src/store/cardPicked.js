import * as api from './api.js'
import addCardToPool from './addCardToPool.js'
import setPackCards from './setPackCards.js'

/**
 * This method should be called when a player selects a card to pick from their active pack. After the server has
 * accepted the pick, the pack will be queued for rotation, and the player will be transitioned to the "waiting" view
 * until the next available pack rotates to them.
 *
 * @param cardId GUID of the card to pick.
 */
function cardPicked(card) {
    console.log('cardPicked');
    console.log(card);

    const draftId = localStorage.getItem("draftId");
    const playerId = localStorage.getItem("playerId");

    api.pickCard(playerId, card.id, function(card) {
        addCardToPool(card);
        setPackCards([]);
    })
}

export default cardPicked;
