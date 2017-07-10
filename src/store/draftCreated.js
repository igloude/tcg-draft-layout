/**
 * This method should be called when a host clicks to create a new draft. After the draft is created on the server
 * side, the host will be deposited in the lobby to wait for players.
 *
 * @param draftName The name of the draft to create.
 * @param hostName The name of the host player.
 * @param setCode The MTG set code that will be drafted (only supporting MTG x3 drafts for MVP)
 */
var draftCreated = (draftName, hostName, setCode) => {
    console.log('draftCreated');
    console.log(draftName);
    console.log(hostName);
    console.log(setCode);
}

export default draftCreated;
