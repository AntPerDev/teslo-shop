import { ProductImage } from "./product-image.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../../auth/entities/user.entity";


@Entity({ name: 'products' })
export class Product {

  @ApiProperty({
    example: '10e6ecae-4ae1-42b9-a605-63d460081174',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Testlo',
    description: 'Product title',
    uniqueItems: true
  })
  @Column('text', {
    unique: true
  })
  title: string;

  @ApiProperty({
    description: "Product price",
    example: 0,
  })
  @Column('float', {
    default: 0
  })
  price: number;

  @ApiProperty({
    default: null,
    description: 'Product description',
    example: 'Ad adipisicing laborum proident incididunt deserunt qui',
  })
  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @ApiProperty({
    example: 't_shirt_testlo',
    description: 'Product slug for SEO',
    uniqueItems: true,
  })
  @Column('text', {
    //Si no es opcional es obligatoria ¬¬
    unique: true
  })
  slug: string;


  @ApiProperty({
    example: 10,
    description: 'Product stok',
    default: 0
  })
  @Column('int', {
    default: 0
  })
  stock: number



  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product sizes',
  })
  @Column('text', {
    array: true
  })
  sizes: string[];




  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;




  @ApiProperty()
  @Column('text', {
    array: true,
    default: []
  })
  tags: string[]




  @ApiProperty()   //images
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[];

  //@ApiProperty() //Crea un error y no compila
  @ManyToOne(
    () => User,
    (user) => user.product,
    { eager: true }
  )
  user: User

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');

  }


  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');

  }

}
