import { describe, it, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import TheHeader from '../Header.vue'

function mountTheHeader() {
    const wrapper = mount(TheHeader, {
        global: {
            plugins: [router]
        }
    })
    return wrapper
}

describe('The Router', () => {
    it('mounts properly', () => {
        expect(mountTheHeader().text()).toContain('About')
    })

    test('click the links', async () => {
        const push = vi.spyOn(router, 'push')

        await mountTheHeader().find('a[id=link]').trigger('click')

        expect(push).toHaveBeenCalledOnce()
        expect(push).toHaveBeenCalledWith('/')

        await mountTheHeader().find('a[type=button]').trigger('click')

        expect(push).toHaveBeenCalledTimes(2)
        expect(push).toHaveBeenCalledWith('/about')
    })
})