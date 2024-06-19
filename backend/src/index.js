import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { db } from './db'


export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      questions: [Question!]
    }

    type Question{
        id:ID!,
        title:String!
        options:[Option!]
    }

    type Option{
        text:String!
    }

  `,


  resolvers: {
    Query: {
      questions: () => db.questions
    }
  }
})



// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ 
    graphiql:{
        subscriptionsProtocol:"WS"
    },
    graphqlEndpoint:"/",
    landingPage:false,
    schema
 })
 
// Pass it into a server to hook into request handlers.
const server = createServer(yoga)
 
// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000')
})