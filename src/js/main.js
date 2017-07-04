var draft = new Vue({
    el: '#draft',

    data: {
        description: {
            long: 'Khans of Tarkir',
            short: 'KTK'
        },
        gameProgress: {
            pack: 1,
            pick: 3
        },
        players: 3,
        pack: pack // NOTE - this calls local data.json file referenced in the head
    },

    methods: {
        pickCard: function(card) {
            // NOTE - API call
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
        aFirst: function (picks) { // return picks sorted alpha a-z
            this.sortKey = 'a';
            this.picks = _.orderBy(picks, 'name');
        },
        zFirst: function (picks) { // return picks sorted alpha z-a
            this.sortKey = 'z';
            this.picks = _.orderBy(picks, 'name', 'desc');
        },
        cost: function (picks) { // return picks sorted by cost
            this.sortKey = 'cost';
            this.picks = _.orderBy(picks, ['cmc', 'name']);
        },
        pick: function(picks) {
            this.sortKey = 'pick';
            this.picks = _.orderBy(picks, 'pickOrder');
        }
    }
})
