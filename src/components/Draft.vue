<template>
    <section id="draft" class="pack grid--contained">
        <div class="pack--meta meta--bar">
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
</template>

<script>
    import Player from './Player.vue'
    import pack from '../assets/data.json'
    export default {
        name: draft,
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
                pack: pack
            }
        },
        methods() {
            pickCard: (card) => {
                // NOTE - API call goes here

                // remove chosen card from pack
                this.pack.splice(this.pack.indexOf(card), 1);

                // set pickOrder on card and increment counter
                card.pickOrder = this.gameProgress.pick;
                this.gameProgress.pick++;

                // add chosen card to picks
                Player.picks.push(card);

                // refresh sorting
                switch(Player.sortKey) {
                    case "cost":
                        Player.sortByCost(Player.picks);
                        break;
                    case "color":
                        Player.sortByColor(Player.picks);
                        break;
                    default:
                        Player.sortByPick(Player.picks);
                }
            }
        }
    }
</script>
