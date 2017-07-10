<template>
    <div id="draft" class="grid">
        <section class="grid--contained">
            <p>{{ players }} player {{ description.long }} Draft Results</p>
            <div class="meta--bar">
                <p class="stat--num">{{ numberOfCards }} cards</p>

                <ul class="stat--count-wubrg">
                    <li class="count--w">{{ wubrg.w }}</li>
                    <li class="count--u">{{ wubrg.u }}</li>
                    <li class="count--b">{{ wubrg.b }}</li>
                    <li class="count--r">{{ wubrg.r }}</li>
                    <li class="count--g">{{ wubrg.g }}</li>
                </ul>

                <p>Average CMC: {{ averageCost }}</p>
            </div>
        </section>
        <section class="picks grid--contained with--bumper__top">
            <div class="meta--bar meta--bar__push">
                <p class="meta--title">Your Picks</p>
                <ul class="meta--sort">
                    <li><a @click="exportToText(picks)" class="meta--anchor__open">Export</a></li>
                    <li><a @click="sortByColor(picks)" class="meta--anchor" :class="{ active: sortKey == 'color' }">Color</a></li>
                    <li><a @click="sortByCost(picks)" class="meta--anchor" :class="{ active: sortKey == 'cost' }">Cost</a></li>
                </ul>
            </div>
            <ul class="pick--list">
                <li v-for="card in picks" :key="card.multiverseid" class="card">
                    <img :src="card.imageUrl" :alt="card.name">
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import pack from '../assets/data.json' // NOTE - temporary

    var _ = require('lodash');

    export default {
        data() {
            return {
                description: {
                    long: 'Khans of Tarkir',
                    short: 'KTK'
                },
                players: 3,
                picks: [],
                sortKey: 'color'
            }
        },
        computed: {
            numberOfCards: (that) => {
                return that.picks.length;
            },
            averageCost: (that) => {
                var costs = 0;
                _.forEach(that.picks, function(card) {
                    if (card.cmc >= 0) {
                        costs += card.cmc;
                    }
                });
                return _.floor( (costs / that.picks.length), 2 );
            },
            wubrg: (that) => {
                var symbols = {
                    w: 0,
                    u: 0,
                    b: 0,
                    r: 0,
                    g: 0
                };
                _.forEach(that.picks, function(card) {
                    _.forEach(_.words(card.manaCost), function(word) {
                        switch(word) {
                            case "W":
                                symbols.w++;
                                break;
                            case "U":
                                symbols.u++;
                                break;
                            case "B":
                                symbols.b++;
                                break;
                            case "R":
                                symbols.r++;
                                break;
                            case "G":
                                symbols.g++;
                                break;
                        }
                    });
                });
                return symbols;
            }
        },
        created() {
            this.picks = pack; // get picks data
        },
        beforeMount() {
            this.sortByColor(this.picks);
        },
        methods: {
            sortByCost(picks) { // sort by cost, then name
                this.sortKey = 'cost';
                this.picks = _.orderBy(picks, ['cmc', 'name']);
            },
            sortByColor(picks) { // sort by color (WUBRG, colorless, gold, land), then cmc
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
                });
                this.picks = _.orderBy(picks, ['colorKey', 'cmc']);
            },
            exportToText(picks) {
                const list = [];
                _.forEach(this.picks, function(card) {
                    list.push(card.name);
                });
                console.log(list);
                // activate modal
                // populate w/ list
            }
            // sortByType(picks) {
            //
            // },
            // hideColor(color) {
            //
            // }
            // unhideColor(color) {
            //
            // }
        }
    }
</script>

<style lang="scss">
    .stat--count-wubrg {
        list-style: none;

        li {
            display: inline-block;
            position: relative;
            top: 3px;
            padding: 3px 8.5px;
            border: 1px solid;
            border-radius: 50%;
            color: #222;

            @each $class, $color in (w, #fffcd9),
                                    (u, #a9e0f9),
                                    (b, #c6c6c6),
                                    (r, #faaa8f),
                                    (g, #9bd3ae) {
                &.count--#{$class} {
                    border-color: darken($color, 20%);
                    background: $color;
                }
            }
        }
    }
</style>
