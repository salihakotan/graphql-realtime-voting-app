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


 
// Get NodeJS Server from Yoga
const httpServer = createServer(yoga)
// Create WebSocket server instance from our Node server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint
})
 
// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
        ...ctx,
        req: ctx.extra.request,
        socket: ctx.extra.socket,
        params: msg.payload
      })
 
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }
 
      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    }
  },
  wsServer
)


 
// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000')
})