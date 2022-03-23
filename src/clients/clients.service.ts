import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { Types } from "mongoose";



@Injectable()
export class ClientsService {

    constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) { }


    async create(createClientDto: CreateClientDto): Promise<Client> {
        const createdClient = new this.clientModel(createClientDto);
        return createdClient.save();
    }

    async findAll(): Promise<Client[]> {
        return this.clientModel.find().populate("accounts").exec();
    }

    async findClient(documentNumber: number): Promise<Client> {
        return this.clientModel.findOne({ documentNumber }).populate("accounts").exec();
    }

    async addAccount(accountId: Types.ObjectId, documentNumber: number): Promise<Client> {
        return this.clientModel.findOneAndUpdate({ documentNumber },
            {
                "$push": { "accounts": accountId}
            }

        ).exec();
    }


}
