import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://root:root123456@cluster0.g0zay.mongodb.net/database-finandina?retryWrites=true&w=majority'), ClientsModule, AccountsModule, TransactionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
