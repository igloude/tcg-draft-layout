<template>
    <main id="hello" class="grid">
        <div class="name--entry grid--contained">
            <p>Well hi there, what's your name?</p>

            <!-- Create a Draft -->
            <input v-model="name" placeholder="Player Name">
            <input v-model="draft" placeholder="Draft Name">
            <select v-model="set">
                <option value="">Choose a Set</option>
                <option v-for="s in sets" :value="s.code">{{ s.name }}</option>
            </select>

            <button @click="startDraft(name, draft, set)" class="with--bumper-top">Create Draft</button>
        </div>
    </main>
</template>

<script>
    import draftCreated from '../store/draftCreated.js'
    import addLobbyPlayer from '../store/addLobbyPlayer.js'

    export default {
        data() {
            return {
                name: "",
                draft: "",
                set: "",
                sets: []
            }
        },
        beforeMount() {
            this.fetchSets()
        },
        methods: {
            fetchSets(sets) {
                // NOTE - temporary data source, we'll want a better list in the future
                fetch('https://mtgjson.com/json/SetList.json')
                .then(res => res.json())
                .then((out) => {
                  this.sets = out;
                })
                .catch(err => console.error(err));
            },
            startDraft(draft, name, set) {
                if (set.length === 3) {
                    draftCreated(draft, name, set);

                    this.$router.push({
                        name: 'draft',
                        params: {
                            draft_id: localStorage.draftId,
                            player_id: localStorage.playerId
                        }
                    });
                } else {
                    // NOTE - throw a better error
                    console.log('pick a set, dummy');
                }
            }
        }
    }
</script>
