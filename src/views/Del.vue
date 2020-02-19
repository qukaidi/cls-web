<template>
    <div>
        <button @click="clearCookie">
            清楚token
        </button>
    </div>
</template>
<script>
export default {
    methods: {
        clearCookie() {
            this.$store.commit("REMOVE_TOKEN")
        }
    },
}
</script>
