<template>
    <div class="lobby-list">
        <h1 class="lobby-header-text">LOBBY LIST</h1>
        <v-row>
            <LobbyListHeader/>
            <div class="lobby-items">
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
                <LobbyListItem v-bind:lobby-name="'Testlobby'" v-bind:player-count="2"/>
            </div>
            <v-col cols="0"/>
            <v-spacer/>
            <v-col cols="4">
                <CreateLobbyButton/>
            </v-col>
            <v-col cols="4" style="padding-right: 0">
                <JoinLobbyButton v-bind:lobby-id="selectedLobby"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import LobbyListItem from "@/components/Lobbylist/LobbyListItem";
    import LobbyListHeader from "@/components/Lobbylist/LobbyListHeader";
    import CreateLobbyButton from "@/components/Lobbylist/CreateLobbyButton";
    import JoinLobbyButton from "@/components/Lobbylist/JoinLobbyButton";

    export default {
        name: "Lobbies",
        components: {JoinLobbyButton, CreateLobbyButton, LobbyListHeader, LobbyListItem},
        data() {
            return {
                selectedLobby: null,
                lobbies: []
            }
        }
    }
</script>

<style scoped>
    .lobby-list {
        width: 50%;
        margin: 10% auto auto;
    }

    .lobby-header-text {
        color: white;
    }

    .lobby-items {
        width: 100%;
        max-height: 490px;
        overflow-y: scroll;
    }

    /* width */
    .lobby-items::-webkit-scrollbar {
        width: 10px;
        display: inline-block;
    }

    /* Track */
    .lobby-items::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    .lobby-items::-webkit-scrollbar-thumb {
        background: #49666b;
    }

    /* Handle on hover */
    .lobby-items::-webkit-scrollbar-thumb:hover {
        background: #374e52;
    }
</style>