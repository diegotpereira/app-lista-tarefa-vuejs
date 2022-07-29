import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TarefaItem from '@/components/Tarefa-Item.vue'

describe('TarefaItem', () => {
  it('renders the component', () => {
    const wrapper = mountComponent()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits on-change event when checkbox is clicked', () => {
    const wrapper = mountComponent()
    wrapper.find('[data-test="tarefa-item-checkbox"]').trigger('change')
    expect(wrapper.emitted('na-alteracao')).toEqual([[false]])
  })

  it('emits update:modeloValor event when input is blur', async () => {
    const wrapper = mountComponent()
    await wrapper.find('[data-test="tarefa-item-label"]').trigger('dblclick')
    await wrapper.find('[data-test="tarefa-item-input"]').trigger('blur')
    expect(wrapper.emitted('update:modeloValor')).toBeTruthy()
  })

  it('active and disactive input when enter key is pressed', async () => {
    const wrapper = mountComponent()
    await wrapper.find('[data-test="tarefa-item-label"]').trigger('dblclick')
    await wrapper.find('[data-test="tarefa-item-input"]').trigger('keydown', { keyCode: 27 })
    expect(wrapper.find('[data-test="tarefa-item-label"]').exists()).toBeTruthy()
  })

  const mountComponent = (props = {}) =>
    mount(TarefaItem, {
      props: { 
        modeloValor: {
          titulo: 'Title',
          completa: false
        },
        ...props
      }
    })
})