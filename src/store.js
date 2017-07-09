/**
 * Transition to the lobby view. Called when the host creates the draft or the player joins a draft that hasn't started yet.
 */
function goToLobbyView() {
    router.push({
        name: 'user',
        params: { someData: 123 }
    })
}

/**
 * Transition to the pack view. Called when a new pack is available for picking, and when the host starts a draft.
 */
function goToPackView() {
    // TODO: Ian to implement, Justin to call
}

/**
 * Transition to the "waiting for next pack" view. Called when a pack has been passed away.
 */
function goToWaitingView() {
    // TODO: Ian to implement, Justin to call
}

/**
 * Transition to the pool summary view. Called when the draft is over.
 */
function goToSummaryView() {
    // TODO: Ian to implement, Justin to call
}

/**
 * Update the basic draft info displayed to the player. Called when the player joins a lobby or already-started draft.
 *
 * @param draftInfo Information about the current draft.
 *   {
 *     "name": "Draft Name",
 *     "set": {
 *       "code": "ISD",
 *       "name": "Innistrad"
 *     }
 *   }
 */
function setDraftInfo(draftInfo) {
    // TODO: Ian to implement, Justin to call
}

/**
 * Update the list of players in the current draft. Called when the player joins a lobby or already-started draft.
 *
 * @param players Players in the current draft.
 *   [
 *     { "name": "Player 1" },
 *     { "name": "Player 2" }
 *   ]
 */
function setLobbyPlayers(players) {
    // TODO: Ian to implement, Justin to call
}

/**
 * Add to the list of players shown in the lobby. Called when a new player joins a lobby.
 *
 * @param player New player joining the draft.
 *   { "name": "Player 3" }
 */
function addLobbyPlayer(player) {
    // TODO: Ian to implement, Justin to call
}

/**
 * Set the cards shown in the player's current pack. Called when a new pack reaches the player.
 *
 * @param cards Cards in the pack.
 *   [
 *     {
 *       "id": "a3105a30-2bd3-40d5-87f9-8e793ba09f13",
 *       "name": "Skaab Goliath",
 *       "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=222913&type=card",
 *       "metadata": {
 *         "artist": "Volkan Baga",
 *         "set": "ISD",
 *         "text": "As an additional cost to cast Skaab Goliath, exile two creature cards from your graveyard.\nTrample (This creature can deal excess combat damage to defending player or planeswalker while attacking.)",
 *         "flavor": "\"Three heads, six arms, and some armor grafts are better than . . . the normal numbers of those things.\"\n—Stitcher Geralf",
 *         "manaCost": "{5}{U}",
 *         "cmc": "6.0",
 *         "number": "76",
 *         "rarity": "Uncommon",
 *         "power": "6",
 *         "toughness": "9",
 *         "colorIdentity": "U",
 *         "colors": "Blue",
 *         "type": "Creature — Zombie Giant",
 *         "types": "Creature",
 *         "subtypes": "Zombie,Giant"
 *       }
 *     }, [...]
 *   ]
 */
function setPackCards(cards) {
    // TODO: Ian to implement, Justin to call
}

/**
 * Adds a card to the player's drafted pool for the current draft. Called when a pick is accepted by the server.
 *
 * @param card Card to add.
 *   {
 *     "id": "a3105a30-2bd3-40d5-87f9-8e793ba09f13",
 *     "name": "Skaab Goliath",
 *     "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=222913&type=card",
 *     "metadata": {
 *       "artist": "Volkan Baga",
 *       "set": "ISD",
 *       "text": "As an additional cost to cast Skaab Goliath, exile two creature cards from your graveyard.\nTrample (This creature can deal excess combat damage to defending player or planeswalker while attacking.)",
 *       "flavor": "\"Three heads, six arms, and some armor grafts are better than . . . the normal numbers of those things.\"\n—Stitcher Geralf",
 *       "manaCost": "{5}{U}",
 *       "cmc": "6.0",
 *       "number": "76",
 *       "rarity": "Uncommon",
 *       "power": "6",
 *       "toughness": "9",
 *       "colorIdentity": "U",
 *       "colors": "Blue",
 *       "type": "Creature — Zombie Giant",
 *       "types": "Creature",
 *       "subtypes": "Zombie,Giant"
 *     }
 *   }
 */
function addCardToPool(card) {
    // TODO: Ian to implement, Justin to call
}

/**
 * This method can be called to retrieve a list of public drafts available to join. The ID from a draft can then
 * be used to join that draft.
 */
function getPublicDrafts() {
   // TODO: Justin to implement, Ian to call (optional, not necessarily MVP)
}

/**
 * This method should be called when a host clicks to create a new draft. After the draft is created on the server
 * side, the host will be deposited in the lobby to wait for players.
 *
 * @param draftName The name of the draft to create.
 * @param hostName The name of the host player.
 * @param setCode The MTG set code that will be drafted (only supporting MTG x3 drafts for MVP)
 */
function draftCreated(draftName, hostName, setCode) {

}

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
    // TODO: Justin to implement, Ian to call
}

/**
 * This method should be called when a player selects a card to pick from their active pack. After the server has
 * accepted the pick, the pack will be queued for rotation, and the player will be transitioned to the "waiting" view
 * until the next available pack rotates to them.
 *
 * @param cardId GUID of the card to pick.
 */
function cardPicked(cardId) {
    // TODO: Justin to implement, Ian to call
}
