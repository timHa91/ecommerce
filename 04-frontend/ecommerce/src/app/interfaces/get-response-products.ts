import { Page } from '../models/page';
import { Product } from '../models/product';

export interface GetResponseProducts {
  page: Page;
  _embedded: {
    products: Product[];
  };
}
