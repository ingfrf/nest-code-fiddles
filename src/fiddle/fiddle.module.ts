import {Module} from '@nestjs/common';
import {FiddleService} from './fiddle.service';
import {FiddleController} from './fiddle.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Fiddle, FiddleSchema} from "./schemas/fiddle.schema";

@Module({
    providers: [FiddleService],
    controllers: [FiddleController],
    imports: [
        MongooseModule.forFeature([{name: Fiddle.name, schema: FiddleSchema}])
    ]
})
export class FiddleModule {
}
