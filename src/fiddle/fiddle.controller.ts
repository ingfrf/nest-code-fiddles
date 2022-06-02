import {Bind, Body, Controller, Delete, Get, Param, Post, Put, UseFilters} from '@nestjs/common';
import {FiddleService} from "./fiddle.service";
import {HttpExceptionFilter} from "../filters/http-exception.filter";
import {FiddleDto} from "./dto/fiddle.dto";

@Controller('fiddle')
export class FiddleController {
    constructor(private readonly service: FiddleService) {
    }

    @Get(':fiddleid')
    @Bind(Param())
    @UseFilters(new HttpExceptionFilter())
    async getFiddleById(params) {
        return await this.service.findByFiddleId(params);
    }

    @Get('/user/:userid')
    @Bind(Param())
    // Bind Param crea un objeto {userId: valor del parámetro}
    // lo que no hace necesario el objeto en el servicio
    @UseFilters(new HttpExceptionFilter())
    async getFiddleByUserId(params) {
        return await this.service.findByFiddlesUserId(params);
    }

    @Post()
    @Bind(Body())
    @UseFilters(new HttpExceptionFilter())
    async create(createFiddleDto: FiddleDto) {
        return await this.service.create(createFiddleDto);
    }

    @Put()
    @Bind(Body())
    @UseFilters(new HttpExceptionFilter())
    async update(createFiddleDto: FiddleDto) {
        return await this.service.update(createFiddleDto);
    }

    @Delete(':fiddleid')
    @Bind(Param())
    @UseFilters(new HttpExceptionFilter())
    async delete(fiddleId: string) {
        return await this.service.delete(fiddleId);
    }
}
