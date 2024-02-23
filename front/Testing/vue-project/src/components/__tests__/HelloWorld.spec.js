import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'
import TheFormVue from '../TheForm.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

function mountTheForm () {
  const wrapper = mount(TheFormVue, { props: {} })
  return wrapper
}

describe('The Form', () => {
  it('Mounts properly', () => {
    expect(mountTheForm()).toBeTruthy()
    // Compruebe el montaje del botón Submit
    expect(mountTheForm().text()).toContain('Submit')
  })
  
  it('click the submit button', async () => {
    const form = mountTheForm().find('form')
    // La función spyOn informará si el elemento
    // ha recibido un clic.
    const spyOnForm = vi.spyOn(form, 'trigger')
    await form.trigger('click')
    
    // ❌mal
    // expect(spyOnForm).toHaveBeenCalledTimes(2)
    
    // ✅ bien
    expect(spyOnForm).toHaveBeenCalledOnce()
  })

  it('Renders the input value', async () => {
    const input = mountTheForm().find('input')
    // el input se renderiza con un valor vacío
    expect(input.text()).toContain('')
    // agrega un valor al input
    await input.setValue('jane@doe.com')
    // Compruebe que el input tiene el valor
    expect(input.element.value).toEqual('jane@doe.com')
  })
})