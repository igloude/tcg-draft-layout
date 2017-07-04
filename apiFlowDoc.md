# Draft-O-Tron 5000

## General Flow

### Create Draft
Host creates a draft, choosing a set and some other options.
<details>
<summary>REST Request/Response Format</summary>
```HTTP
POST /draft
```
```json
{
	"name": "Test Draft",
	"set": "KTK",
	"bots": 3,
	"cardsPerPack": 15,
	"packsPerPlayer": 3
}
```
```json
{
    "id": "9b07dbb5-6a73-4101-92ed-3440bc07efad",
    "name": "Test Draft",
    "players": [
        {
            "id": "7e59bddd-1a72-4c10-911b-f219bced9697",
            "name": "Bot 1"
        },
        {
            "id": "d98f1595-5b1c-4e61-869e-38b747470b65",
            "name": "Bot 2"
        },
        {
            "id": "ce9781c0-3d97-4638-89ca-2de0c0b29c4c",
            "name": "Bot 3"
        }
    ]
}
```
</details>

### Join Draft
Client finds desired draft ID from draft lobby, or by being sent a draft URL by the host. Client requests entry into draft, server registers client and opens websocket connection. Clients begin in lobby view.
<details>
<summary>REST Request/Response Format</summary>
```HTTP
POST /draft/{draftId}/players
```
```json
{
	"name": "Player Name"
}
```
```json
{
    "id": "1d8128aa-e29b-4fe5-b8f5-6ef5073b5b62",
    "name": "Player Name",
    "draft": {
        "id": "bb7f7cad-dc17-4df7-b69e-a19f0be7c536",
        "name": "Test Draft",
        "players": [
            {
                "id": "1d8128aa-e29b-4fe5-b8f5-6ef5073b5b62",
                "name": "Player Name"
            },
            {
                "id": "35b4051e-bc73-472b-9697-ddffc0ea1a03",
                "name": "Bot 1"
            },
            {
                "id": "e0e5bfb9-9ba4-4e8b-8b65-f19950327d3c",
                "name": "Bot 2"
            },
            {
                "id": "8f35c688-2e0e-491a-bd87-138609ee77cd",
                "name": "Bot 3"
            }
        ]
    }
}
```
</details>

### Lobby Notifications
Clients are notified as each new player joins.
<details>
<summary>Socket Message Format</summary>
```json
{
    "event": "player-joined",
    "data": {
        "id": "1d8128aa-e29b-4fe5-b8f5-6ef5073b5b62",
        "name": "Player Name"
    }
}
```
</details>

### Start Draft
Host starts draft when ready.
<details>
<summary>REST Request/Response Format</summary>
```HTTP
POST /draft/{draftId}/start
```
```
Empty request body
```
```
{
    "id": "bb7f7cad-dc17-4df7-b69e-a19f0be7c536",
    "name": "Test Draft",
    "players": [
        {
            "id": "1d8128aa-e29b-4fe5-b8f5-6ef5073b5b62",
            "name": "Player Name"
        },
        {
            "id": "35b4051e-bc73-472b-9697-ddffc0ea1a03",
            "name": "Bot 1"
        },
        {
            "id": "e0e5bfb9-9ba4-4e8b-8b65-f19950327d3c",
            "name": "Bot 2"
        },
        {
            "id": "8f35c688-2e0e-491a-bd87-138609ee77cd",
            "name": "Bot 3"
        }
    ]
}
```
</details>

### Pack Notifications
When host starts draft, server notifies clients with their first pack. Clients should transition to draft view.
<details>
<summary>Socket Message Format</summary>
```json
{
    "event": "new-pack",
    "data": {
        "id": "d73dc1dd-2002-4992-8843-84b9b102493a",
        "cards": [
            {
                "id": "9a0f1c96-dae0-4fe1-9494-8ceacde80c41",
                "name": "Binding Mummy",
                "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426708&type=card",
                "metadata": {
                    "artist": "Shreya Shetty",
                    "set": "AKH",
                    "text": "Whenever another Zombie enters the battlefield under your control, you may tap target artifact or creature.",
                    "flavor": "What the gods decree, the mummies enforce.",
                    "manaCost": "{1}{W}",
                    "cmc": "2.0",
                    "number": "6",
                    "rarity": "Common",
                    "power": "2",
                    "toughness": "2",
                    "colorIdentity": "W",
                    "colors": "White",
                    "type": "Creature — Zombie",
                    "types": "Creature",
                    "subtypes": "Zombie"
                }
            },
            {
                "id": "97c70ced-2bd7-434b-bcf4-23d811c10312",
                "name": "Cartouche of Solidarity",
                "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426709&type=card",
                "metadata": {
                    "artist": "Kieran Yanner",
                    "set": "AKH",
                    "text": "Enchant creature you control\nWhen Cartouche of Solidarity enters the battlefield, create a 1/1 white Warrior creature token with vigilance.\nEnchanted creature gets +1/+1 and has first strike.",
                    "manaCost": "{W}",
                    "cmc": "1.0",
                    "number": "7",
                    "rarity": "Common",
                    "colorIdentity": "W",
                    "colors": "White",
                    "type": "Enchantment — Aura Cartouche",
                    "types": "Enchantment",
                    "subtypes": "Aura,Cartouche"
                }
            },
            {
                "id": "9894fcfa-b475-4201-be5f-789593974016",
                "name": "Devoted Crop-Mate",
                "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426712&type=card",
                "metadata": {
                    "artist": "Zoltan Boros",
                    "set": "AKH",
                    "text": "You may exert Devoted Crop-Mate as it attacks. When you do, return target creature card with converted mana cost 2 or less from your graveyard to the battlefield. (An exerted creature won't untap during your next untap step.)",
                    "manaCost": "{2}{W}",
                    "cmc": "3.0",
                    "number": "10",
                    "rarity": "Uncommon",
                    "power": "3",
                    "toughness": "2",
                    "colorIdentity": "W",
                    "colors": "White",
                    "type": "Creature — Human Warrior",
                    "types": "Creature",
                    "subtypes": "Human,Warrior"
                }
            }
        ]
    }
}
```
</details>

### Pick Card
Client requests pick of their choice. Server responds with their updated pool.
<details>
<summary>REST Request/Response Format</summary> m
```HTTP
POST /player/{playerId}/pick/{cardId}
```
```json
Empty request body.
```
```json
{
    "id": "cd35181c-8e93-482b-97ed-0faab41fc0ae",
    "name": "Bot 2",
    "pool": [
        {
            "id": "ea1cbc5e-c05b-415e-87e3-5bec42128539",
            "name": "Anointed Procession",
            "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426704&type=card",
            "metadata": {
                "artist": "Victor Adame Minguez",
                "cmc": "4.0",
                "colorIdentity": "W",
                "colors": "White",
                "flavor": "\"The gods here may walk among the people, but they are not with them.\"\n—Gideon Jura",
                "manaCost": "{3}{W}",
                "number": "2",
                "rarity": "Rare",
                "set": "AKH",
                "text": "If an effect would create one or more tokens under your control, it creates twice that many of those tokens instead.",
                "type": "Enchantment",
                "types": "Enchantment"
            }
        },
        {
            "id": "97c70ced-2bd7-434b-bcf4-23d811c10312",
            "name": "Cartouche of Solidarity",
            "imageUrl": "http://gatherer.wizards.com/Handlers/Image.        ashx?multiverseid=426709&type=card",
            "metadata": {
                "artist": "Kieran Yanner",
                "set": "AKH",
                "text": "Enchant creature you control\nWhen Cartouche of Solidarity enters         the battlefield, create a 1/1 white Warrior creature token with vigilance.        \nEnchanted creature gets +1/+1 and has first strike.",
                "manaCost": "{W}",
                "cmc": "1.0",
                "number": "7",
                "rarity": "Common",
                "colorIdentity": "W",
                "colors": "White",
                "type": "Enchantment — Aura Cartouche",
                "types": "Enchantment",
                "subtypes": "Aura,Cartouche"
            }
        }
    ]
}
```
</details>

### Pack Rotation
When all players have picked, server adds picked cards to pools, notifies clients with their new rotated pack.

<details>
<summary>Socket Message Format</summary>
```json
{
    "event": "pack-rotated",
    "data": {
        "id": "d73dc1dd-2002-4992-8843-84b9b102493a",
        "cards": [
            {
                "id": "9a0f1c96-dae0-4fe1-9494-8ceacde80c41",
                "name": "Binding Mummy",
                "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426708&type=card",
                "metadata": {
                    "artist": "Shreya Shetty",
                    "set": "AKH",
                    "text": "Whenever another Zombie enters the battlefield under your control, you may tap target artifact or creature.",
                    "flavor": "What the gods decree, the mummies enforce.",
                    "manaCost": "{1}{W}",
                    "cmc": "2.0",
                    "number": "6",
                    "rarity": "Common",
                    "power": "2",
                    "toughness": "2",
                    "colorIdentity": "W",
                    "colors": "White",
                    "type": "Creature — Zombie",
                    "types": "Creature",
                    "subtypes": "Zombie"
                }
            },
            {
                "id": "9894fcfa-b475-4201-be5f-789593974016",
                "name": "Devoted Crop-Mate",
                "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426712&type=card",
                "metadata": {
                    "artist": "Zoltan Boros",
                    "set": "AKH",
                    "text": "You may exert Devoted Crop-Mate as it attacks. When you do, return target creature card with converted mana cost 2 or less from your graveyard to the battlefield. (An exerted creature won't untap during your next untap step.)",
                    "manaCost": "{2}{W}",
                    "cmc": "3.0",
                    "number": "10",
                    "rarity": "Uncommon",
                    "power": "3",
                    "toughness": "2",
                    "colorIdentity": "W",
                    "colors": "White",
                    "type": "Creature — Human Warrior",
                    "types": "Creature",
                    "subtypes": "Human,Warrior"
                }
            }
        ]
    }
}
```
</details>

Clients continue to pick cards until pack is drafted. When each pack has been completely drafted, server distributes new packs and notifies clients with new pack info. Clients continue to pick cards until all packs are drafted.

### Draft Complete
When all packs have been drafted, server notifies clients that draft is over. Clients should transition to draft summary view.
<details>
<summary>Socket Message Format</summary>
```json
{
    "event": "draft-complete",
    "data": {}
}
```
</details>