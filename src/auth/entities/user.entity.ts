import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities";
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class User {

  @ApiProperty({
    example: '10e6ecae-4ae1-42b9-a605-63d460081174',
    description: 'User ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({
    description: 'User email',
    example: 'user@email.com',
    title: 'User email',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Abc123',
    title: 'User password',
    nullable: false    
  })
  @Column('text', {
    select: false
  })
  password: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Dorie',
    title: 'Full name',
    nullable: false,
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    description: 'User is an active user?',
    example: 'true',
    title: 'Is an active user?',
    nullable: false,
  })
  @Column('bool', {
    default: true
  })
  isActive: boolean;


  @ApiProperty({
    description: 'Users roles',
    enum: [ 'user', 'admin', 'super-user'],
    example: `[ 'user', 'admin', 'super-user']`,
    title: 'Users roles'
  })
  @Column('text', {
    array: true,
    default: ['user']
  })
  roles: string[];

  @ApiProperty()
  @OneToMany(
    () => Product,
    (product) => product.user
  )
  product: Product;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeInsert()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }


}
