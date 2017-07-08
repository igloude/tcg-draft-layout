import * as api from 'api'
import newPackReceived from 'newPackReceived'
import playerJoined from 'playerJoined'
import draftComplete from 'draftComplete'
import goToView from 'goToView'
import setDraftInfo from 'setDraftInfo'
import setLobbyPlayers from 'setLobbyPlayers'

/**
 * This method should be called when a host clicks to create a new draft. After the draft is created on the server
 * side, the host will be deposited in the lobby to wait for players.
 *
 * @param draftName The name of the draft to create.
 * @param hostName The name of the host player.
 * @param setCode The MTG set code that will be drafted (only supporting MTG x3 drafts for MVP)
 */
function draftCreated(draftName, hostName, setCode) {
    console.log('draftCreated');
    console.log(draftName);
    console.log(hostName);
    console.log(setCode);

    api.hostDraft(draftName, hostName, setCode, function(draftId, name, setData, playerId, players) {
        localStorage.setItem("draftId", draftId);
        localStorage.setItem("playerId", playerId);
        api.connect(draftId, playerId, newPackReceived, newPackReceived, playerJoined, draftComplete);
        goToView("lobby", draftId, playerId);
        setDraftInfo({ name: name, set: { code: setData.code, name: setData.name } });
        setLobbyPlayers(players);
    })
}

export default draftCreated;