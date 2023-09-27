import { Injectable } from '@nestjs/common';

import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,

  ){}

  async runSeed(){
    await this.insertNewProducts();
    return 'SEED EXECUTED'
  }

  private async insertNewProducts(){
    
    //Borrar todos los productos existentes en la DB
    await this.productsService.deleteAllProducts() 


    // insertar datos
    const products = initialData.products;

    const insertPromises = [];

    products.forEach( product =>{
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all( insertPromises )


    // Si se eliminan mandar true
    return true //si se hace
  }
}
