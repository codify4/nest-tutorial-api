import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const users = [
    {   
        id: 1,
        username: 'user1',
        password: 'password1',
    },
    {
        id: 2,
        username: 'user2',
        password: 'password2',
    },
    {
        id: 3,
        username: 'user3',
        password: 'password3',
    },
    {   
        id: 4,
        username: 'user4',
        password: 'password4',
    },
];
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
        
    validateUser({ username, password }: AuthPayloadDto) {
        const findUser = users.find(user => user.username === username);

        if(!findUser) return null;

        if(password === findUser.password) {
            const { password, ...user } = findUser;
            return this.jwtService.sign(user);
        }
    }
}
