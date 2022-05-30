import {Body, Controller, Get, HttpException, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./dto/user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {
    }

    @Get()
    async index() {
        return await this.service.findAll();
    }

    @Post()
    async create(@Body() createUserDto: UserDto) {
        return await this.service.create(createUserDto);
    }

    @Post('/login')
    async login(@Body() userDto: UserDto) {
        const user = await this.service.login(userDto);
        if (user !=  null) {
            return user;
        } else {
            throw new HttpException('Error retrieving user', 500);
        }
    }
}
