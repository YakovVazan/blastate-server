import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesModule } from './cities/cities.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CitiesModule,
    AlertsModule,
    MongooseModule.forRoot(
      'mongodb+srv://yakovvazan:Ku2orSNr9ygUq0qn@realblastate.nibi1ky.mongodb.net/',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
