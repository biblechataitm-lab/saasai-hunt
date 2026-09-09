import type { GetProductsOptions, ProductPage } from './ads';
import { getProducts } from './ads';

export async function fetchMoreProductsAction(options: GetProductsOptions): Promise<ProductPage> {
  return await getProducts(options);
}
