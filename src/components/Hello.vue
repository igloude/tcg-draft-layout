<template>
    <main id="hello" class="grid">
        <div class="name--entry grid--contained">
            <p>Well hi there, what's your name?</p>

            <!-- Create a Draft -->
            <input v-model="name" placeholder="Player Name">
            <input v-model="draft" placeholder="Draft Name">
            <select v-model="set">
                <option value="false">Choose a Set</option>
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
                set: "false",
                sets: []
            }
        },
        beforeMount() {
            this.fetchSets()
        },
        methods: {
            fetchSets(sets) {
                fetch('https://mtgjson.com/json/SetList.json')
                .then(res => res.json())
                .then((out) => {
                  this.sets = out;
                })
                .catch(err => console.error(err));
            },
            startDraft(draft, name, set) {
                if (set != false) {
                    draftCreated(draft, name, set)
                } else {
                    console.log('pick a set, dummy');
                }
            }
        }
    }
</script>
