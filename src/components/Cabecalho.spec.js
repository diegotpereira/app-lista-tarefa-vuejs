import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Cabecalho from '@/components/Cabecalho.vue'

describe('Cabecalho', () => {
  it('renders the component', () => {
    const wrapper = mountComponent()
    expect(wrapper.html()).toMatchSnapshot()
  })

  const mountComponent = () =>
    mount(Cabecalho)
})