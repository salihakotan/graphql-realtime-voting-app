
import {ApolloClient,InMemoryCache} from "@apollo/client"
import { YogaLink } from '@graphql-yoga/apollo-link'


const server = new ApolloClient({
    link: new YogaLink({
        endpoint:"http://localhost:4000",
    }),
    cache:new InMemoryCache()
})


export {server}