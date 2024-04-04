import { Product } from '../models/product';

export interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}
