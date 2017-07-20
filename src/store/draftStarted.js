import * as api from './api.js'
import goToView from "./goToView";

/**
 * This method should be called when the host clicks the "Start Draft" button. It will signal to the server that
 * packs can now be distributed, and transition the host and all players to the draft view.
 */
function draftStarted() {
    console.log('draftStarted');

    const draftId = localStorage.getItem("draftId");
    const playerId = localStorage.getItem("playerId");

    api.startDraft(draftId, function() {
        goToView("draft", draftId, playerId);
    })
}

export default draftStarted;
