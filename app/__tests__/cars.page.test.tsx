import React from 'react'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'

import { render } from '@testing-library/react'
import Menu from '../components/Menu'

global.React = React
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: '',
            asPath: ''
        }
    }
}))

describe('Menu page', () => {
    it('renders cars page', async () => {
        const { getByText } = render(<Menu />)
        const linkElement = getByText('List of cars')

        expect(linkElement).toBeInTheDocument()
    })
})
