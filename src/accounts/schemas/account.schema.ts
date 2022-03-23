import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  
  @Prop({required:true,isInteger:true})
  balance: number;

  @Prop({required:true,isInteger:true,unique:true})
  accountNumber: number;
  
  
  _id: Types.ObjectId;
  
  @Prop({required:true})
  created: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);