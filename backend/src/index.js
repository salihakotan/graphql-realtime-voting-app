import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'
import { db } from './db'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import uniqid from "uniqid"
import { title } from 'node:process'


export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      questions: [Question!]
      question(id:ID!): Question!

      votes(question_id:ID): [Vote!]
      vote(id:ID!): Vote!

      options: [Option!]
      option(id:ID!):Option!

    #   total(question_id:ID): Int

    }

    input NewVoteInput{
        option_id:ID!,
        question_id:ID!
    }

    input NewQuestionInput{
        title:String!,
    }

   


    type Mutation{
        newVote(data:NewVoteInput!):Vote!
        newQuestion(data:NewQuestionInput!): Question!
    }

   
  

    type Question{
        id:ID!,
        title:String!
        options:[Option!]
        votes:[Vote!]
        total:Int
    }

    type Option{
        id:ID!
        text:String!
        question_id:ID!,
        question:Question!
    }

    type Vote{
        id:ID!
        question_id:ID!,
        question:Question!
        option_id:ID!
        option:Option!
    }


  `,


  resolvers: {
    Query: {
      questions: () => db.questions,
      question: (parent,args) => db.questions.find((question)=> question.id === args.id),

      votes:(parent,args)=> args.question_id ? db.votes.filter((vote)=> vote.question_id === args.question_id) : db.votes,
      vote: (parent,args) => db.votes.find((vote)=> vote.id === args.id),

      options:()=> db.options,
      option: (parent,args) => db.options.find((option)=> option.id === args.id),

    //   total:  (parent,args)=> db.votes.filter((vote)=> vote.question_id === args.question_id).length

    },

    Mutation:{
        newVote: (parent,{data}) => {
            const newVote = {
                id:uniqid(),
                option_id:data.option_id,
                question_id:data.question_id
            }
            const votes = [newVote,...db.votes]
            db.votes = votes
            return newVote
        },

        newQuestion: (parent,{data})=> {
            const newQuestion = {
                id:uniqid(),
                title:data.title,
                options:data.options
            }

            const questions = [newQuestion, ...db.questions]
            db.questions = questions
            return newQuestion
        }
    },

    Vote:{
        question: (parent,args)=> db.questions.find((question)=> question.id === parent.question_id ),
        option: (parent,args)=> db.options.find((option)=> option.id === parent.option_id) ,
    },
    Option:{
        question:(parent,args)=> db.questions.find((question)=> question.id === parent.question_id)
    },
    Question:{
        options: (parent,args)=> db.options.filter((option)=> option.question_id === parent.id) ,
        votes: (parent,args)=> db.votes.filter((vote)=> vote.question_id === parent.id),
        total:(parent,args)=> {
            const count = db.votes.filter((vote)=> vote.question_id === parent.id).length
            console.log("count", count)
            return count
        }
    },
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
httpServer.listen(4000, () => {
  console.info('Server is running on http://localhost:4000')
})