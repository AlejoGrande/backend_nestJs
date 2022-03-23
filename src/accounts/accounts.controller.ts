
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-Account.dto';
import { Account } from './schemas/Account.schema';
import { ClientsService } from "./../clients/clients.service";
@Controller('accounts')
export class AccountsController {

    constructor(private readonly accountsService: AccountsService, private readonly clientService: ClientsService) { }

    @Post()
    async create(@Body() createAccountDto: CreateAccountDto, @Res() response) {
        const {documentNumber,...data}=createAccountDto
        try {
            const client=await this.clientService.findClient(documentNumber);
            if (!client) {
                console.log("Error ",client)
                return response.status(HttpStatus.NOT_ACCEPTABLE).json({ message: "El cliente no existe" });
            }
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
            
        }
        return this.accountsService.create({ ...data, created: new Date() }).then(
            (account) => {
                this.clientService.addAccount(account._id,Number(documentNumber)).then()
                console.log("date ", account)
                return response.status(HttpStatus.CREATED).json(account);
            }
            ,
            (err) => {
                console.log("err", err)
                return response.status(HttpStatus.FORBIDDEN).json({ message: err.message });
            })
    }

    @Get()
    async findAll(): Promise<Account[]> {
        return this.accountsService.findAll();
    }

    @Get(":id")
    async findAccount(@Param("id") id: string, @Res() response): Promise<any> {
        return this.accountsService.findAccount(Number(id)).then(
            (account) => {
                if (account) {
                    response.status(HttpStatus.OK).json(account);
                } else {
                    response.status(HttpStatus.NOT_FOUND).json({ message: 'Account not found' });
                }
            }
        );
    }
}