import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const baseUrl = "http://localhost:8080";

/**
 * Connects a player to the server for an active draft. Once connected, draft events will be received and passed
 * into the corresponding callbacks.
 *
 * @param draftId The draft ID to connect to.
 * @param playerId
 *
 * @param onNewPack Callback triggered when a fresh pack is opened for the player.
 * @param onPackRotated Callback triggered when
 * @param onPlayerJoined
 * @param onDraftComplete
 */
function connect(draftId, playerId, onNewPack, onPackRotated, onPlayerJoined, onDraftComplete) {
    const socket = new SockJS(baseUrl + '/socket');
    this.stompClient = new Stomp(socket);

    this.stompClient.connect({}, (frame) => {
        this.stompClient.subscribe('/topic/draft/'+draftId+'/player/'+playerId+'/newPack', (message) => {
            const pack = JSON.parse(message);
            onNewPack(pack.cards);
        });
        this.stompClient.subscribe('/topic/draft/'+draftId+'/player/'+playerId+'/packRotated', (message) => {
            const pack = JSON.parse(message);
            onPackRotated(pack.cards);
        });
        this.stompClient.subscribe('/topic/draft/'+draftId+'/playerJoined', (message) => {
            const player = JSON.parse(message);
            onPlayerJoined(player.id, player.name);
        });
        this.stompClient.subscribe('/topic/draft/'+draftId+'/draftComplete', (message) => {
            onDraftComplete();
        });
    });
}

/**
 * Disconnects any open websocket connections to the server.
 */
function disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
}

/**
 * Creates a new draft.
 *
 * @param name The name of the draft.
 * @param hostName The name of the player hosting.
 * @param setCode MTG set code to load cards/packs from.
 * @param onJoin Callback triggered when the server has registered the new draft.
 */
function hostDraft(name, hostName, setCode, onJoin) {
    request("POST", "/draft", {
        name: name,
        hostName: hostName,
        set: setCode,
        bots: 0,
        cardsPerPack: 15,
        packsPerPlayer: 3
    }, (response) => {
        console.log("Started draft of " + response.set.name);
        // TODO: can't just grab the first player when bots are introduced
        onJoin(response.id, response.name, response.set, response.players[0].id, response.players);
    });
}

/**
 * Joins an active draft.
 *
 * @param id GUID of the draft.
 * @param name Name of the joining player.
 * @param onJoin Callback triggered when the player is registered with the server.
 */
function joinDraft(id, name, onJoin) {
    request("POST", "/draft/"+id+"/players", {
        name: name
    }, (response) => {
        console.log("Joined '"+response.name+"' draft of " + response.set.name);
        onJoin(response.draft, response.id);
    });
}

/**
 * Selects a card from a player's active pack.
 *
 * @param playerId GUID of the picking player.
 * @param cardId GUID of the card being picked.
 * @param onPick Callback triggered when the pick is accepted by the server.
 */
function pickCard(playerId, cardId, onPick) {
    request("POST", "/player/"+playerId+"/pick/"+cardId, {},
        (response) => {
            console.log("Picked card "+ cardId);
            onPick(response)
        });
}

/**
 * Execute a REST request with the draft server.
 *
 * @param method HTTP method to execute
 * @param endpoint URL endpoint
 * @param data String data, will be JSONified
 * @param callback Callback which will be triggered on a success result
 */
function request(method, endpoint, data, callback) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
    });

    xhr.open(method, baseUrl + endpoint);
    xhr.setRequestHeader("content-type", "application/json");

    if(data !== null) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

export {
    connect,
    disconnect,
    hostDraft,
    joinDraft,
    pickCard
};