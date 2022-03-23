
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema, Account } from './schemas/account.schema';
//import { AccountsService } from './accounts.service';
//import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { ClientsModule } from "./../clients/clients.module"



@Module({
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]), ClientsModule
    ],
    controllers: [AccountsController],
    providers: [AccountsService],
    exports: [AccountsService],
})

export class AccountsModule { }
