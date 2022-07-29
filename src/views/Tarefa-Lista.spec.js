import { describe, it, expect, vi} from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getTarefaLista } from '@/models/TarefaLista'
import TarefaLista from '@/views/Tarefa-Lista.vue'

vi.mock('@/models/tarefaLista')

describe('TarefaLista', () => {
    it('renders the component', () => {

        const wrapper = mountComponent()
        expect(wrapper.html()).toMatchSnapshot()
    })
    it('renders the component 2', () => {
        getTarefaLista.mockReturnValue([{ titulo: 'tarefa 1', completa: false}])
        const wrapper = mountComponent()
        expect(wrapper.html()).toMatchSnapshot()
    })
    const mountComponent = () => 
       mount(TarefaLista, {
        global: {
            stubs: {
                ROuterLink: RouterLinkStub
            }
        }
       })
})