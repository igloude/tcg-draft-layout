<template>
    <main id="draft" class="grid">
        <section class="pack grid--contained">
            <div class="pack--meta meta--bar">
                <p class="meta--title text--center">{{ players }} player {{ description.long }} Draft Results</p>
            </div>
        </section>
        <section class="picks grid--contained with--bumper__top">
            <div class="picks--meta meta--bar">
                <p class="meta--title">Your Picks</p>
                <ul class="meta--sort">
                    <li><a @click="sortByColor(picks)" class="sort--anchor" :class="{ active: sortKey == 'color' }">Color</a></li>
                    <li><a @click="sortByCost(picks)" class="sort--anchor" :class="{ active: sortKey == 'cost' }">Cost</a></li>
                </ul>
            </div>
            <ul class="pick--list">
                <li v-for="card in picks" :key="card.multiverseid" class="card">
                    <img :src="card.imageUrl" :alt="card.name">
                </li>
            </ul>
        </section>
    </main>
</template>

<script>
    // NOTE - temporary
    import pack from '../assets/data.json'

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
