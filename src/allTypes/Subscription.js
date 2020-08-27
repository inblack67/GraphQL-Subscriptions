import { subscriptionType } from '@nexus/schema';
import { UserModel } from '../data';
import { USER_ADDED } from './types';
import { User } from './User';

export const Subscription = subscriptionType({
    definition(t) {
        t.field('userAdded', {
            type: User,
            subscribe: (parent, args, ctx) => ctx.pubsub.asyncIterator(USER_ADDED)
        })
    }
})