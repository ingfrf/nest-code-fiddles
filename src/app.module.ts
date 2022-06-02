import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import {FiddleModule} from './fiddle/fiddle.module';

@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot('mongodb://192.168.8.103:27017/cf'),
        FiddleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
