<template>
    <div>
        <h1>Sala</h1>
        <input v-model="name" type="text" placeholder="Insereix el teu nom...">
        <button @click="join">Entrar</button>
    </div>
</template>

<script>
    import {socket}  from '../sockets.js';
    import { useAppStore } from '@/stores/app';

    export default {
        name: 'landing',
        data() {
            return {
                name: "",
            }
        },
        methods: {
            join() {
                socket.emit('accesUsers', this.name);
                this.$router.push('/lobby');
            }
        },
        mounted() {
        }
    }
</script>