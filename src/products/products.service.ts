import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }


async create(createProductDto: CreateProductDto) {

    try {

      // if(!createProductDto.slug ){
      //   createProductDto.slug = createProductDto.title
      //   .toLowerCase()
      //   .replaceAll(' ','_')
      //   .replaceAll("'",'');
      // }else {
      //   createProductDto.slug = createProductDto.slug
      //   .toLowerCase()
      //   .replaceAll(' ','_')
      //   .replaceAll("'",'');
      // }

      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.hadleDBException( error );
    }
  }

  findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0 } = paginationDto;
    return this.productRepository.find(
      {
        take: limit,
        skip: offset,
        // TODO RELACIONES
      }
    )
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id});
    if(!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }


  private hadleDBException(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    this.logger.error(error)
    //console.log(error)
    throw new InternalServerErrorException('Unsexpected error, check server logs');

  }
}
