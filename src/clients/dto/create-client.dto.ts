import * as mongoose from "mongoose";

export class CreateClientDto {
    readonly name: String;
    readonly documentNumber: number;
    readonly accounts: mongoose.Schema.Types.ObjectId[];
}