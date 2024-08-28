import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { SerializedUser } from './types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':username')
    getUserByUsername(@Param('username') username: string) {
        const user = this.usersService.getUserByUsername(username);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return new SerializedUser(user);
    }
}
