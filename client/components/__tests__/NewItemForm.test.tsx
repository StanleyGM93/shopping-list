//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import nock from 'nock'
import { renderNewItemForm } from '../../test/setup'
import userEvent from '@testing-library/user-event'

// What other tests should I run for adding items

describe('<NewItemForm/>', () => {
  it('renders the correct form', () => {
    renderNewItemForm()

    const itemInput = screen.getByLabelText(/item/i)
    const quantityInput = screen.getByLabelText(/quantity/i)
    const submitButton = screen.getByRole('button')

    expect(itemInput).toBeVisible()
    expect(quantityInput).toBeVisible()
    expect(submitButton).toBeVisible()
  })
  it('creates a new fruit', async () => {
    const submitScope = nock('http://localhost')
      .post('/api/v1/items')
      .reply(201)

    const user = userEvent.setup()

    renderNewItemForm()

    const itemInput = screen.getByLabelText(/item/i)
    const quantityInput = screen.getByLabelText(/quantity/i)
    const submitButton = screen.getByRole('button')

    await user.type(itemInput, 'Birthday cake')
    await user.type(quantityInput, '1')
    await user.click(submitButton)

    expect(submitScope.isDone()).toBe(true)
  })
})
