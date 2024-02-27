<template>
    <div>
        <h1>Usuaris</h1>
        <ul>
            <li v-for="user in users">
                {{ user.name }}
                <button v-if="user.status == 'available' && user.name != myUser.name" @click="joinToChat(user)" style="color: white; background-color: rgb(13, 116, 81);">Chat</button>
                <button v-else-if="user.name != myUser.name" disabled="disabled">In Chat</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { computed } from 'vue';
    import {socket}  from '../sockets.js';
    import { useAppStore } from '@/stores/app';

    export default {
        name: 'lobby',
        data() {
            const appStore = useAppStore();
            return {
                users: computed( () => appStore.getUsersList()),
                myUser: computed( () => appStore.getMyUser()),
            }
        },
        methods: {
            joinToChat(user) {
                socket.emit('joinToChat', this.myUser, user);
                this.$router.push('/chat');
            }
        }
    }
</script>