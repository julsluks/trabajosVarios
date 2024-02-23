import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useUserStore } from '../user'

describe('The user store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('has the user values', () => {
        const email = ref('jane@doe.com')
        const name = ref('Jane Doe')

        const userStore = useUserStore()

        userStore.insertData({
            email: email.value,
            name: name.value
        })

        expect(userStore.userData.email).toBe('jane@doe.com')
        expect(userStore.userData.name).toBe('Jane Doe')
    })
})
