<script>
    import { ref } from 'vue'

    const email = ref('')

    const Submit = () => {
        console.log(email.value)  
    }
</script>

<template>
    <form @submit.prevent="Submit">
        <input v-model="email" type="email" placeholder="your@email.com" required />
        <button type="submit">Submit</button>
    </form>
</template>