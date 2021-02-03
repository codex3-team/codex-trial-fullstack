import 'regenerator-runtime/runtime'
import { createTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../pages/api/graphql'
import { queryCars } from '../pages/api/cars'

const mocks = {
    Query: () =>({
        total: () => (1),
        cars: () => ([{ id: '1234-5678', model: 'Model', make: 'Ford', year: '1950' }])
    })
}
const server = new ApolloServer({
    schema: schema,
    mocks: mocks
})

describe('Graphql API', () => {
    it('fetches cars', async () => {
        const { query } = createTestClient(server)

        const res = await query({
            query: queryCars,
            variables: {
                limit: 1,
                offset: 0
            }
        })
        expect(res).toMatchSnapshot()
    })
})
