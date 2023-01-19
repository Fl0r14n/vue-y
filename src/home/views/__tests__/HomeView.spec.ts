import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('renders', () => {
    const wrapper = mount(HomeView, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
