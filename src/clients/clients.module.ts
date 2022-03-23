import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema,Client } from './schemas/client.schema';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';



@Module({
    imports: [MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])
    ],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports:[ClientsService],
})

export class ClientsModule { }
