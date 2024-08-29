import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return user;
    }
}