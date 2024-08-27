import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Ip } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from '../my-logger/my-logger.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    private readonly logger = new MyLoggerService(UsersController.name);

    @SkipThrottle({ default: false })
    @Get()
    @Get()
    findAll(@Ip() ip: string, @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        this.logger.log(`Request for All Employees\t${ip}`, UsersController.name);
        return this.usersService.findAll(role);
    }

    @Throttle({ short: { ttl: 1000, limit: 1 }})
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
     
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
