import { ProductCategory } from '../models/productCategory';

export interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
