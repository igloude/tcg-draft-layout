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
            this.gameProgress.pick++;
            console.log('I choose you, ' + card.name + '!');
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
        sortByA: function (picks) {
            this.sortKey = 'a';
            this.picks = _.orderBy(picks, ['name', 'cmc']);
        },
        sortByZ: function (picks) {
            this.sortKey = 'z';
            this.picks = _.orderBy(picks, ['name', 'cmc'], 'desc');
        },
        sortByCost: function (picks) {
            this.sortKey = 'cost';
            this.picks = _.orderBy(picks, ['cmc', 'name']);
        },
        sortByPick: function(picks) {
            this.sortKey = 'pick';
            this.picks = _.orderBy(picks, 'pickOrder');
        }
    }
})
