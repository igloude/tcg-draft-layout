var draft = new Vue({
    el: '#draft',

    data: {
        description: {
            long: 'Khans of Tarkir',
            short: 'KTK'
        },
        gameProgress: {
            pack: 1,
            pick: 1
        },
        players: 3,
        pack: pack // NOTE - this calls local data.json file referenced in the head
    },

    methods: {
        pickCard: function(card) {
            // NOTE - API call

            // remove chosen card from pack
            this.pack.splice(this.pack.indexOf(card), 1)

            // set pickOrder on card and increment counter
            card.pickOrder = this.gameProgress.pick;
            this.gameProgress.pick++;

            // add chosen card to picks
            player.picks.push(card);

            // refresh sorting
            switch(player.sortKey) {
                case "cost":
                    player.sortByCost(player.picks);
                    break;
                case "color":
                    player.sortByColor(player.picks);
                    break;
                default:
                    player.sortByPick(player.picks);
            }
        }
    }
})

var player = new Vue({
    el: '#player',

    data: {
        sortKey: 'pick',
        picks: picks // NOTE - this calls local data.json file referenced in the head
    },

    methods: {
        sortByCost: function (picks) { // sort by cost, then name
            this.sortKey = 'cost';
            this.picks = _.orderBy(picks, ['cmc', 'name']);
        },
        sortByPick: function(picks) { // sort by pick order
            this.sortKey = 'pick';
            this.picks = _.orderBy(picks, 'pickOrder');
        },
        sortByColor: function(picks) { // sort by color (WUBRG, colorless, gold, land), then cmc
            this.sortKey = 'color';
            _.forEach(this.picks, function(card) {
                var k;
                if (card.colors === undefined) {
                    k = 8;
                } else if (card.colors.length === 1) {
                    switch(card.colors[0]) {
                        case "White":
                            k = 1;
                            break;
                        case "Blue":
                            k = 2;
                            break;
                        case "Black":
                            k = 3;
                            break;
                        case "Red":
                            k = 4;
                            break;
                        case "Green":
                            k = 5;
                            break;
                        case "Colorless":
                            k = 6;
                            break;
                        default:
                            k = 8;
                    }
                    card.colorKey = k;
                } else if (card.colors.length > 1) {
                    card.colorKey = 7;
                }
                console.log(card);
            });
            this.picks = _.orderBy(picks, ['colorKey', 'cmc']);
        }
    }
})
