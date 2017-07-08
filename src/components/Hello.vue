<template>
    <main id="hello" class="grid">
        <div class="name--entry grid--contained">
            <p>Well hi there, what's your name?</p>
            <input v-model="name" placeholder="Spike">
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
