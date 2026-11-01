import { ProductsService } from './../products/products.service';
import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed.data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}
  async runSeed() {
    await this.insertNewProducts();

    return 'SEED Executed';
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: any = [];

    products.forEach((p) => this.productService.create(p));

    await Promise.all(insertPromises);
    return true;
  }
}
