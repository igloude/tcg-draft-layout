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
    }
})

var player = new Vue({
    el: '#player',

    data: {
        picks: picks // NOTE - this calls local data.json file referenced in the head
    }
})
