import { Expose } from "class-transformer";
import { User } from "../entities/user.entity";

export class ResponseLoginDto<T> {

    constructor(partial: Partial<ResponseLoginDto<T>>) {
        Object.assign(this, partial);
    }

    @Expose()
    user: User;

    @Expose()
    jwt: string;

}
