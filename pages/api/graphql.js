import { ApolloServer } from 'apollo-server-micro';
import { PubSub } from 'graphql-subscriptions'
import { schema } from '../../src/schema';
import 'colors';

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  schema,
  context: async (ctx) => ({
    ...ctx,
    pubsub
  }),
  subscriptions: {
    path: '/api/graphqlSubscriptions',
    keepAlive: 9000,
    onConnect: console.log(`connected`.green.bold),
    onDisconnect: () => console.log(`disconnected`.red.bold),
  },
  playground: {
    subscriptionEndpoint: '/api/graphqlSubscriptions',
  },
})

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler;