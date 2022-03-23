import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Types } from "mongoose";




@Injectable()
export class TransactionService {

    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) { }


    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const createdTransaction = new this.transactionModel(createTransactionDto);
        return createdTransaction.save();
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionModel.find().exec();
    }

    async findTransaction(accountId: Types.ObjectId): Promise<Transaction[]> {
        return this.transactionModel.find({
            $or: [
                { from: accountId },
                { to: accountId },
            ]

        }).populate("to").populate("from").exec();
    }




}
