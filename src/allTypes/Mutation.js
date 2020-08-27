import { mutationType, stringArg, idArg } from '@nexus/schema';
import { UserModel } from '../data';
import { User } from './User';
import { USER_ADDED } from './types';

export const Mutation = mutationType({
    definition(t) {
        t.field('addUser', {
            type: User,
            args: {
                id: idArg(),
                name: stringArg()
            },
            resolve: (parent, { id, name }, ctx) => {
                const newUser = { id, name };
                UserModel.push(newUser);
                ctx.pubsub.publish(USER_ADDED, newUser)
                return newUser;
            }
        })
    }
})