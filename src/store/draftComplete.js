import goToView from './goToView.js'

/**
 * Called when the draft is complete and all cards have been drafted. Transitions to the summary view where players
 * can review the cards they've drafted.
 */
function draftComplete() {
    const draftId = localStorage.getItem("draftId");
    const playerId = localStorage.getItem("playerId");

    goToView("summary", draftId, playerId);
}

export default draftComplete;
