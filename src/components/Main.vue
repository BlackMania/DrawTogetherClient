<template>
    <div>
        <Menu class="left-float"/>
        <router-view :key="this.$route.fullPath" class="left-float content-container"></router-view>
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
    .content-container
    {
        width: 70%;
        margin-left: 10%;
        margin-right: 10%;
    }
</style>