import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('status')
    status(@Req() req: Request) {
        console.log(req.user);
        return req.user;
    }
}
