export class CreateAccountDto {
    readonly balance: number;
    readonly accountNumber: number;
    readonly documentNumber?:number;
    readonly created: Date;
}