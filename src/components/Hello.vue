<template>
    <main id="hello" class="grid">
        <div class="name--entry grid--contained">
            <p>Well hi there, what's your name?</p>
            <input v-model="name" placeholder="Spike">
            <button @click="joinLobby(name)" class="with--bumper-top">Go To Draft</button>
        </div>
    </main>
</template>

<script>
    import addLobbyPlayer from '../store/addLobbyPlayer.js'
    import goToView from '../store/goToView.js'

    export default {
        data() {
            return {
                name: ""
            }
        },
        methods: {
            joinLobby(name) {
                const player = new Object;
                player.name = name;
                addLobbyPlayer(player);

                this.$router.push({
                    name: 'draft',
                    params: {
                        draft_id: 123,
                        player_id: 321
                    }
                })
            }
        }
    }
</script>
