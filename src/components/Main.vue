<template>
    <div>
        <Menu class="left-float"/>
        <router-view :key="this.$route.fullPath" class="left-float"></router-view>
    </div>
</template>

<script>
    import Menu from "@/components/Menu";
    export default {
        name: "Main",
        components: {Menu},
    }
</script>

<style scoped>
>>>.v-application .mx-auto {
    margin: 0 !important;
}

    .left-float {
        float: left;
    }
</style>