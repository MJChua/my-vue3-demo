// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ButtonComp from '@/components/Button/index.vue'

describe('Button component', () => {
  it('renders text and default classes', () => {
    const wrapper = mount(ButtonComp, {
      props: {
        text: 'Run'
      }
    })
    const button = wrapper.get('.button')

    expect(button.text()).toContain('Run')
    expect(button.classes()).toContain('button')
    expect(button.classes()).toContain('middle')
    expect(button.classes()).toContain('primary')
  })
})
