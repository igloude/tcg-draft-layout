<template>
    <main id="hello" class="grid">
        <div class="name--entry grid--contained">
            <p>Well hi there, what's your name?</p>
            <input v-model="name" placeholder="Spike">
            <a @click="goToDraft(name)" class="with--bumper-top">Go To Draft</a>
        </div>
    </main>
</template>

<script>


    export default {
        data() {
            return {
                name: ""
            }
        },
        methods: {
            goToDraft(name) {
                this.$router.push({
                    name: 'draft',
                    params: { draft_id: 123 }
                });
            }
        }
    }
</script>
