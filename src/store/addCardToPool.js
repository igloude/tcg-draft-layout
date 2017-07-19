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
    // NOTE: this will be called from the pickCard() method in the Draft view
    console.log('addCardToPool');
    console.log(card);
}

export default addCardToPool;
