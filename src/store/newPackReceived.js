import setPackCards from './setPackCards.js'
import goToView from './goToView.js'

/**
 * Called when a pack is received by the player, whether it is a fresh pack or rotated from the next player over.
 * Refreshes the view with the cards from this pack.
 *
 * @param cards The cards in the new pack.
 */
function newPackReceived(cards) {
    const draftId = localStorage.getItem("draftId");
    const playerId = localStorage.getItem("playerId");

    setPackCards(cards);
    goToView("draft", draftId, playerId);
}

export default newPackReceived;
