import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';
import { ValidateUserAccountMiddleware } from './middlewares/validate-user-account.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUserMiddleware, ValidateUserAccountMiddleware)
      .forRoutes('*');
  }
}