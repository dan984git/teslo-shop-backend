import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Expose } from "class-transformer";

@Entity({ name: 'te_product_images' })
export class ProductImage {

    constructor(partial: Partial<ProductImage>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('uuid', { name: 'pi_id' })
    @Expose()
    id: number;

    @Column('text', { name: 'pi_url' })
    @Expose()
    url: string;

    @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pi_product_id' })
    product: Product;
}