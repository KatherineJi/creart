import { genProduct } from './product';

export function getProductList(baseID = 0, length = 10) {
  return new Array(length).fill(0).map((_, idx) => genProduct(idx + baseID));
}

export const productList = getProductList();
