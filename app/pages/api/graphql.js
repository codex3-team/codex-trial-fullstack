import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro'
import { getKnex } from '../../knex'

const typeDefs = gql`
  type Query {
    total: Int
    cars(offset: Int, limit: Int): [Car!]!
  }
  type Mutation {
    insertCar(make: String!, model: String!, year: String!): Car!
  }
  type Car {
    id: ID!
    make: String
    model: String
    year: String
  }
`
const knex = getKnex()
const HOUR = 1 * 1000 * 60 * 60
const cache = require('memory-cache')
const resolvers = {
  Query: {
    total(_parent, _args, _ctx, _info) {
      const cached = cache.get('total')

      if (cached) {
        return Promise.resolve(cached)
      } else {
        return knex
        .table(process.env.TABLE_NAME)
        .count()
        .then(row => {
          const total = row[0].count
          cache.put('total', total, HOUR)

          return row[0].count
        })
      }
    },
    cars(_parent, args, _ctx, _info) {
      return knex
        .table(process.env.TABLE_NAME)
        .select()
        .orderBy('year', 'desc')
        .limit(args.limit || process.env.NEXT_PUBLIC_SIZE)
        .offset(args.offset || 0)
    }
  },
  Mutation: {
    insertCar(_parent, args, _ctx, _info) {
      return knex
        .insert(args)
        .returning('id')
        .into(process.env.TABLE_NAME)
        .then(res => {
          cache.del('total')

          return { id: res[0] }
        })
    }
  }
}
const apolloServer = new ApolloServer({
  typeDefs, resolvers, uploads: false
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
export const schema = makeExecutableSchema({ typeDefs, resolvers })
