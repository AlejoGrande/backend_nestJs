import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {Account} from './../../accounts/schemas/Account.schema'


export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  value: number;

  @Prop({type:Types.ObjectId,ref:Account.name})
  from: Account;

  @Prop({type:Types.ObjectId,ref:Account.name})
  to: Account;

  @Prop({ required: true })
  date: Date;


}

export const TransaccionSchema = SchemaFactory.createForClass(Transaction);