
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './schemas/Account.schema';
import { CreateAccountDto } from './dto/create-Account.dto';
import { Types } from "mongoose";

@Injectable()
export class AccountsService {

    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) { }


    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const createdAccount = new this.accountModel(createAccountDto);
        return createdAccount.save();
    }

    async findAll(): Promise<Account[]> {
        return this.accountModel.find().exec();
    }

    async findAccount(accountNumber: number): Promise<Account> {
        console.log("number : ", accountNumber)
        return this.accountModel.findOne({ accountNumber }).exec();
    }

    async discount(from: Types.ObjectId, to: Types.ObjectId, value: number): Promise<any> {
        await this.accountModel.findOneAndUpdate({ _id: from }, { "$inc": { balance: value * (-1) } })
        await this.accountModel.findOneAndUpdate({ _id: to }, { "$inc": { balance: value } })
        
        //return this.accountModel.findOne({accountNumber}).exec();
    }

}