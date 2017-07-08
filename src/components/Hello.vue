<template>
    <main id="hello" class="grid">
        <div class="name--entry grid--contained">
            <p>Well hi there, what's your name?</p>
            <input v-model="name" placeholder="Spike">
            <router-link to="/draft" class="with--bumper-top">Go to Draft</router-link>
        </div>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                name: ""
            }
        }
    }
</script>
