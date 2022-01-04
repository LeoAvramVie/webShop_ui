import {Category} from "./category";

export interface Product {
  id?: string,
  name?: string;
  description?: string,
  richDescription?: string,
  image?: string,
  images?: string[],
  brand?: string,
  price?: string,
  category?: Category,
  countInStock?: number,
  rating?: number,
  numReview?: number,
  isFeatured?: boolean,
  dateCreated?: string,
}
