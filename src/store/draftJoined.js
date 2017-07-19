import * as api from './api.js'
import newPackReceived from './newPackReceived.js'
import playerJoined from './playerJoined.js'
import draftComplete from './draftComplete.js'
import goToView from './goToView.js'
import setDraftInfo from './setDraftInfo.js'
import setLobbyPlayers from './setLobbyPlayers.js'

/**
 * This method should be called when a player joins a draft, either via loading a URL with a draft ID in it, or by
 * clicking on a lobby from the public drafts list. After the server has added the player to the draft, the player will
 * be deposited in the lobby to wait for the draft to start.
 *
 * @param draftId GUID of the draft to join. This can be retrieved from the lobby URL if a player is joining that way,
 *                or via an ID from the public drafts method.
 * @param playerName Name of the player joining.
 */
function draftJoined(draftId, playerName) {
    console.log('draftJoined');
    console.log(draftId);
    console.log(playerName);

    api.joinDraft(draftId, playerName, function(draft, playerId) {
        localStorage.setItem("draftId", draftId);
        localStorage.setItem("playerId", playerId);
        api.connect(draft.id, playerId, newPackReceived, newPackReceived, playerJoined, draftComplete);
        goToView("lobby", draft.id, playerId);
        setDraftInfo({ name: draft.name, set: { code: draft.setData.code, name: draft.setData.name } });
        setLobbyPlayers(draft.players);
    })
}

export default draftJoined;
