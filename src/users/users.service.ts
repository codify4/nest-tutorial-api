import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from './types';

@Injectable()
export class UsersService {
    private users: User[] = [
        {   
            id: 1,
            name: 'User 1',
            username: 'user1',
            password: 'password1',
        },
        {
            id: 2,
            name: 'User 2',
            username: 'user2',
            password: 'password2',
        },
        {
            id: 3,
            name: 'User 3',
            username: 'user3',
            password: 'password3',
        },
        {   
            id: 4,
            name: 'User 4',
            username: 'user4',
            password: 'password4',
        },
    ];

    getUsers() {
        return this.users.map((user) => new SerializedUser(user));
    }

    getUserByUsername(username: string) {
        return this.users.find((user) => user.username === username);
    }
}
