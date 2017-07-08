import addLobbyPlayer from 'addLobbyPlayer'

/**
 * Called when a new player joins the draft. Updates the lobby view with the new player added.
 *
 * @param player The player which has joined.
 */
function playerJoined(player) {
    addLobbyPlayer(player);
}

export default playerJoined;