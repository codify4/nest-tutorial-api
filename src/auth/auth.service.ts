import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string) {
        const user = this.usersService.getUserByUsername(username);

        if(user && user.password === password) {
            const { username, password, ...rest } = user;
            return rest;
        }
    }

    async login(user: any) {
        const payload = { name: user.name, sub: user.id };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
