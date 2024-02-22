<template>
    <div>
        <h1>Chat</h1>
        <div id="chat">
            <div id="messages">
                <ul>
                    <li v-for="message in messages">
                        {{ message }}
                    </li>
                </ul>
            </div>
            <div id="send">
                <input v-model="message" type="text" placeholder="Escriu el teu missatge...">
                <button @click="sendMessage()">Enviar</button>
            </div>
        </div>
        <button @click="leaveChat(myUser)">Sortir</button>
    </div>
</template>

<script>
    import { computed } from 'vue';
    import { useAppStore } from '@/stores/app';
    import {socket}  from '../sockets.js';
    import { dataPeer } from '../comunicationManager.js';

    export default {
        name: 'chat',
        data() {
            const appStore = useAppStore();
            return {
                messages: computed( () => appStore.getMessages()),
                message: '',
                myUser: computed( () => appStore.getMyUser()),
            }
        },
        methods: {
            leaveChat(myUser) {
                socket.emit('leaveChat', myUser);
                this.$router.push('/lobby');
            },
            sendMessage() {
                const appStore = useAppStore();
                let message = {
                    user: appStore.getMyUser(),
                    data: this.message
                }
                appStore.addNewMessage(message);
                dataPeer(message);
                this.message = '';
            }
        },
        mounted() {
            
        }
    }

</script>