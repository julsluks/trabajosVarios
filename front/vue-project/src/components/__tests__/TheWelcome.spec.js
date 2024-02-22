import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import TheWelcomeVue from "../TheWelcome.vue";

describe('The Welcome', () => {
    it('Mounts properly', async () => {
        const wrapper = mount(TheWelcomeVue)

        expect(wrapper).toBeTruthy()
        expect(wrapper.text()).toContain('Documentation')

        const svg = wrapper.find('svg')
        expect(svg).toBeTruthy()

        const a = wrapper.find('a')
        const spyOnA = vi.spyOn(a, 'trigger')

        await a.trigger('click')
        expect(spyOnA).toHaveBeenCalledOnce()
    })
})