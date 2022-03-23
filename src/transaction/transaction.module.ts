import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransaccionSchema, Transaction } from './schemas/transaction.schema';
import { AccountsModule } from "./../accounts/accounts.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransaccionSchema }]), AccountsModule
  ],
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule { }
