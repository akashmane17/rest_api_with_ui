import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

/**
 * class for Product
 * contains user, valid, userAgent variables
 */
export class Product {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ required: true, unique: true, default: `product_${nanoid()}` })
  productId: string;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  image: string;
}

// Adding schemaOptions of timestamps and creating model for our class Product
const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
  },
});

// exporting productModel
export default ProductModel;
