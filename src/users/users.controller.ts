import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return [];
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return { id };
    }

    @Post()
    create(@Body() user: {}) {
        return user;
    }
     
    @Patch(':id')
    update(@Param('id') id: number, @Body() userUpdate: {}) {
        return { id, ...userUpdate };
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return { id };
    }
}
