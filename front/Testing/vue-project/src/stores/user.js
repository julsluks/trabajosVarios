import { defineStore } from "pinia"
import { reactive } from "vue"

export const useUserStore = defineStore("user", () => {
    const userData = reactive({ email: "", name: "" })

    function insertData(userInput) {
        const { email, name } = userInput

        userData.email = email
        userData.name = name
    }

    return { userData, insertData }
})