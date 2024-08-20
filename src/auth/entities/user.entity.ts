import { Expose } from "class-transformer";
import { Product } from "../../products/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'te_user' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column('text', { name: 'us_email', unique: true })
    @Expose()
    email: string;

    @Column('text', { name: 'us_password' })
    password: string;

    @Column('text', { name: 'us_fullname' })
    @Expose()
    fullName: string;

    @Column('text', { name: 'us_username', unique: true })
    @Expose()
    username: string;

    @Column('text', { name: 'us_is_active', default: 'S' })
    isActive: string;

    @Column('text', { array: true, name: 'us_roles', default: ['user'] })
    roles: string[];

    @OneToMany(() => Product, product => product.user)
    products: Product;

}
