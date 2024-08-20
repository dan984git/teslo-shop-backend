import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "../../auth/entities/user.entity";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'te_products' })
export class Product {

    constructor(partial: Partial<Product>) {
        Object.assign(this, partial);
    }

    @ApiProperty({ example: '6b1f0f86-970b-4073-903a-4d5a641bf0fc', description: 'Product ID', uniqueItems: true })
    @PrimaryGeneratedColumn('uuid', { name: 'pr_id' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'T-shirt Teslo', description: 'Product Title', uniqueItems: true })
    @Column('text', { name: 'pr_title', unique: true })
    @Expose()
    title: string;

    @ApiProperty({ example: '0', description: 'Product Price' })
    @Column('float', { name: 'pr_price', default: 0 })
    @Expose()
    price: number;

    @ApiProperty({ example: 'Anim reprehenderit nulla in anim mollit minim irure commodo.', description: 'Product Description', default: null })
    @Column({ type: 'text', nullable: true, name: 'pr_description' })
    @Expose()
    description: string;

    @ApiProperty({ example: 't_shirt_teslo', description: 'Product SLUG - for SEO', uniqueItems: true })
    @Column('text', { name: 'pr_slug', unique: true })
    @Expose()
    slug: string;

    @ApiProperty({ example: 10, description: 'Product Stock', default: 0 })
    @Column('int', { name: 'pr_stock', default: 0 })
    @Expose()
    stock: number;

    @ApiProperty({ example: ['M', 'XL', 'XXL'], description: 'Product sizes' })
    @Column('text', { array: true, name: 'pr_sizes' })
    @Expose()
    sizes: string[];

    @ApiProperty({ example: 'women', description: 'Product gender' })
    @Column('text', { name: 'pr_gender' })
    @Expose()
    gender: string;

    @ApiProperty({
        example: ['shirt', 'hoodir', 'hats'], description: 'Product Tag', default: []
    })
    @Column('text', { array: true, name: 'pr_tags', default: [] })
    @Expose()
    tags: string[];

    @ApiProperty({
        example: [{
            "id": "c68469e4-d10c-4f1a-b983-911ff5b1fa4c",
            "url": "https://image1.jpg"
        },
        {
            "id": "ad37659a-f980-4441-ab24-0608059db30b",
            "url": "https://image2.jpg"
        }], description: 'Product Images', default: []
    })
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true },
    )
    @Expose()
    images?: ProductImage[];

    @ApiProperty({
        example: {
            "id": "5ffd266b-fd5b-4448-9ba6-1d24bd4a8693",
            "email": "daniel.984@hotmail.com",
            "fullName": "Daniel Burbano",
            "username": "dburbano"
        }, description: 'Product User'
    })
    @ManyToOne(
        () => User,
        user => user.products,
        { eager: true })
    @JoinColumn({ name: 'pr_user_id' })
    @Expose()
    user: User;

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll("'", '')
            .replaceAll(' ', '_');
    }

    @BeforeUpdate()
    checkSlufUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll("'", '')
            .replaceAll(' ', '_');
    }

}
