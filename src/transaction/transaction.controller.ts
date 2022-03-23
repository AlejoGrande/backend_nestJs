import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { AccountsService } from './../accounts/accounts.service';
import { Types } from "mongoose";
@Controller('transactions')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService, private readonly accountService: AccountsService) { }

    @Post()
    async create(@Body() createTransactionDto: CreateTransactionDto, @Res() response) {
        try {
            const accountTo = await this.accountService.findAccount(Number(createTransactionDto.to));
            if (!accountTo) {
                console.log("Error ",accountTo)
                return response.status(HttpStatus.NOT_ACCEPTABLE).json({ message: "La cuenta destino no existe" });
            }
            createTransactionDto = { ...createTransactionDto, to: accountTo._id, date: new Date() }
            this.accountService.discount(createTransactionDto.from,createTransactionDto.to,createTransactionDto.value);
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });

        }

        return this.transactionService.create({
            ...createTransactionDto,
            from: new Types.ObjectId(createTransactionDto.from),

        }).then(
            (transaction) => {
                return response.status(HttpStatus.CREATED).json(transaction);
            }
            ,
            (err) => {
                console.log("err", err)
                return response.status(HttpStatus.FORBIDDEN).json({ message: err.message });
            })
    }

    @Get(":id")
    async findTransaction(@Param("id") id: string, @Res() response): Promise<any> {
        return this.transactionService.findTransaction(new Types.ObjectId(id)).then(
            (transaction) => {
                if (transaction) {
                    
                    response.status(HttpStatus.OK).json(transaction
                      // ( transaction=>{
                           // return {...transaction,to:{...transaction.to,balance:null},from:{...transaction.from,balance:null}}
                       // })

                    );
                    
                } else {
                    response.status(HttpStatus.NOT_FOUND).json({ message: 'Client not found' });
                }
            }
        );
    }
}
