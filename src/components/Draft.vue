<template>
    <main id="draft" class="grid">

        <!-- temporary navigation -->
        <a @click="goToSummary()" class="grid--contained">Go to Summary View</a>

        <section class="pack grid--contained">
            <div class="meta--bar meta--bar__push">
                <p class="meta--title">Pack {{ gameProgress.pack }} | Pick {{ gameProgress.pick }}</p>
                <p class="meta--info">
                    <span class="info--players">{{ players }} Players</span>
                    <span class="info--description">{{ description.long }}</span>
                </p>
            </div>
            <ul class="pack--list">
                <li v-for="card in pack" :key="card.multiverseid" class="card" @click="pickCard(card)">
                    <img :src="card.imageUrl" :alt="card.name">
                </li>
            </ul>
        </section>
        <section class="picks grid--contained with--bumper__top">
            <div class="meta--bar meta--bar__push">
                <p class="meta--title">Your Picks</p>
                <ul class="meta--sort">
                    <li><a @click="sortByColor(picks)" class="meta--anchor" :class="{ active: sortKey == 'color' }">Color</a></li>
                    <li><a @click="sortByCost(picks)" class="meta--anchor" :class="{ active: sortKey == 'cost' }">Cost</a></li>
                    <li><a @click="sortByPick(picks)" class="meta--anchor" :class="{ active: sortKey == 'pick' }">Pick</a></li>
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
    import pack from '../assets/data.json' // NOTE - temporary
    import cardPicked from '../store/cardPicked.js'
    import addCardToPool from '../store/addCardToPool.js'
    import setDraftInfo from '../store/setDraftInfo.js'

    var _ = require('lodash');

    export default {
        data() {
            return {
                description: {
                    long: 'Khans of Tarkir',
                    short: 'KTK'
                },
                gameProgress: {
                    pack: 1,
                    pick: 1
                },
                players: 3,
                pack: [],
                picks: [],
                sortKey: 'pick'
            }
        },
        created() {
            this.pack = pack // get pack data

            // if (picks) { // check for picks from server (if pack 2 or 3)
            //     this.picks = picks // get pick data
            // }
        },
        methods: {
            goToSummary() {
                this.$router.push({
                    name: 'summary',
                    params: {
                        draft_id: 123,
                        player_id: 321
                    }
                })
            },
            pickCard(card) {
                // remove chosen card from pack
                pack.splice(pack.indexOf(card), 1);

                // set pickOrder on card and increment counter
                card.pickOrder = this.gameProgress.pick;
                this.gameProgress.pick++;

                // add chosen card to picks
                this.picks.push(card);

                // refresh sorting
                switch(this.sortKey) {
                    case "cost":
                        this.sortByCost(this.picks);
                        break;
                    case "color":
                        this.sortByColor(this.picks);
                        break;
                    default:
                        this.sortByPick(this.picks);
                }

                cardPicked(card);
            },
            sortByCost(picks) { // sort by cost, then name
                this.sortKey = 'cost';
                this.picks = _.orderBy(picks, ['cmc', 'name']);
            },
            sortByPick(picks) { // sort by pick order
                this.sortKey = 'pick';
                this.picks = _.orderBy(picks, 'pickOrder');
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
            }
        }
    }
</script>
