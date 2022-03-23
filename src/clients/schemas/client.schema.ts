import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Account } from './../../accounts/schemas/Account.schema';
import * as mongoose from "mongoose";

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({required:true})
  name: string;

  @Prop({required:true,isInteger:true,unique:true})
  documentNumber: number;

  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: Account.name }]})
  accounts: Account;

}

export const ClientSchema = SchemaFactory.createForClass(Client);