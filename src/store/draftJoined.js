import * as api from 'api'
import newPackReceived from 'newPackReceived'
import playerJoined from 'playerJoined'
import draftComplete from 'draftComplete'
import goToView from 'goToView'
import setDraftInfo from 'setDraftInfo'
import setLobbyPlayers from 'setLobbyPlayers'

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
