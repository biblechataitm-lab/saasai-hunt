'use server';

import { getProducts, type GetProductsOptions, type ProductPage } from '@/lib/ads';

export async function fetchMoreProductsAction(options: GetProductsOptions): Promise<ProductPage> {
  return await getProducts(options);
}
