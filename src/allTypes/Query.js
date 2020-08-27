import { queryType } from '@nexus/schema';
import { UserModel } from '../data';
import { User } from './User';

export const Query = queryType({
    definition(t) {
        t.list.field('users', {
            type: User,
            resolve: () => {
                return UserModel;
            }
        })
    }
})