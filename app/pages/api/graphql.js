import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro'
import { getKnex } from '../../knex'

const typeDefs = gql`
  type Query {
    total: Int
    cars(offset: Int, limit: Int): [Car!]!
  }
  type Mutation {
    insertCar(make: String!, model: String!, year: String!): Car
  }
  type Car {
    id: ID!
    make: String
    model: String
    year: String
  }
`
const knex = getKnex() 
const resolvers = {
  Query: {
    total(_parent, _args, _ctx, _info) {
      // @TODO cache
      console.log('total graphql knex is called')

      return knex
        .table(process.env.TABLE_NAME)
        .count()
        .then(row => row[0].count)
    },
    cars(_parent, args, _ctx, _info) {
      console.log('cars graphql knex is called', args)

      return knex
        .table(process.env.TABLE_NAME)
        .select()
        .orderBy('id', 'asc')
        .limit(args.limit || process.env.NEXT_PUBLIC_SIZE)
        .offset(args.offset || 0)
    }
  },
  Mutation: {
    insertCar(_parent, args, _ctx, _info) {
      console.log('insertCar graphql knex is called', args)

      return knex
        .insert(args)
        .returning('id')
        .into(process.env.TABLE_NAME)
        .then(res => { id: res[0] })
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
