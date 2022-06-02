import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Fiddle, FiddleDocument} from "./schemas/fiddle.schema";
import {Model} from "mongoose";
import {FiddleDto} from "./dto/fiddle.dto";
import * as uuid from 'uuid';

@Injectable()
export class FiddleService {
    constructor(@InjectModel(Fiddle.name) private readonly model: Model<FiddleDocument>) {
    }

    async findByFiddleId(params: any): Promise<Fiddle> {
        return await this.model.findOne(params).exec();
    }

    async findByFiddlesUserId(params: any): Promise<Fiddle[]> {
        // params = {userid: valor del parámetro} que ya viene del controller
        return await this.model.find(params).exec();
    }

    async create(createFiddleDto: FiddleDto): Promise<Fiddle> {
        return await new this.model({
            ...createFiddleDto,
            fiddleid: uuid.v4(),
        }).save();
    }

    /*
    La Promise<any> devuelve el siguiente objeto, no devuelve un Fiddle
    {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
    */
    async update(createFiddleDto: FiddleDto): Promise<any> {
        return await this.model.updateOne({fiddleid: createFiddleDto.fiddleid}, createFiddleDto).exec();
    }

    async delete(params: any) {
        return await this.model.deleteOne(params).exec();
    }
}
