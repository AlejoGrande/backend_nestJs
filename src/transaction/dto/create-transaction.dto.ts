import * as mongoose from "mongoose";

export class CreateTransactionDto {
    readonly value: number;
    readonly date: Date;
    readonly from: any;
    readonly to: any;
}