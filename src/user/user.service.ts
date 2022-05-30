import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model} from "mongoose";
import {UserDto} from "./dto/user.dto";
import * as crypto from 'crypto-js';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {
    }

    async findAll(): Promise<User[]> {
        return await this.model.find().exec();
    }

    async create(createUserDto: UserDto): Promise<User> {
        return await new this.model({
            ...createUserDto,
            password: crypto.AES.encrypt(createUserDto.password, '1234567').toString(),
            userid: uuid.v4(),
            createdAt: new Date(),
        }).save();
    }

    async login(userDto: UserDto): Promise<User> {
        try {
            const result = await this.model.findOne({email: userDto.email}).exec();
            const decryptedPassword = crypto.AES.decrypt(result.password, '1234567').toString(crypto.enc.Utf8);
            if (decryptedPassword == userDto.password) {
                return result;
            } else  {
                return null;
            }
        } catch (e) {
            return null;
        }
    }
}
