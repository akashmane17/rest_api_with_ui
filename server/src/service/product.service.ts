import { omit } from "lodash";
import ProductModel, { Product } from "../models/product.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export async function createProduct(input: Partial<Product>) {
  const product = await ProductModel.create(input);
  return omit(product.toJSON(), "createdAt", "updatedAt");
}

export async function findProduct(
  query: FilterQuery<Product>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.find(query, {}, options);
}

export async function findAndUpdateProduct(
  query: FilterQuery<Product>,
  update: UpdateQuery<Product>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<Product>) {
  return ProductModel.deleteOne(query);
}
