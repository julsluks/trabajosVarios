<script>
import { socket } from '@/socket'
import { useAppStore  } from '@/stores/app.js'

 export default{
    data(){
        return{
            checked: false,
            usuari : '',
            password:'',  
        } 

    },
    methods: {
      votar(id){
            socket.emit('votacion',id);
        }
    },
    created(){
        const appStore = useAppStore();
        if (appStore.loginInfo.username == ''){
            this.$router.push('/');
        }
    },
    computed:{
        votos(){
            const store = useAppStore();
            return store.getVotos();
        }
    }
 }
</script>

<template>
  <div>
    <Button @click="votar(0)">Option 1</Button>
    {{ votos[0] }}
    <br>
    <br>
    <Button @click="votar(1)">Option 2</Button>
    {{ votos[1] }}
    <br>
    <br>
    <Button @click="votar(2)">Option 3</Button>
    {{ votos[2] }}
    <br>
    <br>
    <Button @click="votar(3)">Option 4</Button>
    {{ votos[3] }}
  </div>
</template>

<style lang="scss" scoped>

</style>