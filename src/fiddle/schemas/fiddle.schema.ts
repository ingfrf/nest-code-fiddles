import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type FiddleDocument = Fiddle & Document;

@Schema()
export class Fiddle {
    @Prop({required: true})
    userid: string;
    @Prop({required: true})
    fiddleid: string;
    @Prop({default: ''})
    code: string;
    @Prop({default: ''})
    language: string;
    @Prop({default: 'Untitled Fiddle'+Date.now()})
    name: string;
}

export const FiddleSchema = SchemaFactory.createForClass(Fiddle);
