import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';
@Controller('clients')
export class ClientsController {

    constructor(private readonly clientsService: ClientsService) { }

    @Post()
    async create(@Body() createClientDto: CreateClientDto, @Res() response) {
        return this.clientsService.create({...createClientDto,accounts: [] }).then(
            (client) => {
                return response.status(HttpStatus.CREATED).json(client);
            }
            ,
            (err) => {
                console.log("err", err)
                return  response.status(HttpStatus.FORBIDDEN).json({ message: err.message });
            })
    }

    @Get()
    async findAll(): Promise<Client[]> {
        return this.clientsService.findAll();
    }

    @Get(":id")
    async findClient(@Param("id") id: string, @Res() response): Promise<any> {
        return this.clientsService.findClient(Number(id)).then(
            (client) => {
                if (client) {
                    response.status(HttpStatus.OK).json(client);
                } else {
                    response.status(HttpStatus.NOT_FOUND).json({ message: 'Client not found' });
                }
            }
        );
    }
}
