/**
 * This method should be called when a player joins a draft, either via loading a URL with a draft ID in it, or by
 * clicking on a lobby from the public drafts list. After the server has added the player to the draft, the player will
 * be deposited in the lobby to wait for the draft to start.
 *
 * @param draftId GUID of the draft to join. This can be retrieved from the lobby URL if a player is joining that way,
 *                or via an ID from the public drafts method.
 * @param playerName Name of the player joining.
 */
var draftJoined = (draftId, playerName) => {
    // TODO: Justin to implement, Ian to call
    console.log('draftJoined');
    console.log(draftId);
    console.log(playerName);
}

export default draftJoined;
