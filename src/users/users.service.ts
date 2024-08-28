import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from './types';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            username: 'user1',
            password: 'password1',
        },
        {
            username: 'user2',
            password: 'password2',
        },
        {
            username: 'user3',
            password: 'password3',
        },
        {
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
