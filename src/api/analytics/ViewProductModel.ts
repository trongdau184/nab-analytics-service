import * as mongoose from 'mongoose';
import { IBaseDocument } from "../../core/repositories/IBaseDocument";

export const ViewProductModelName = 'ViewProducts';
export const ProductModelName = 'Products';

export interface IViewProductDocument extends IBaseDocument {
    productId: string
    viewAt: Date,
};

const ViewProductSchema: mongoose.Schema = new mongoose.Schema(
    {
        productId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: ProductModelName
        },
        viewAt: {
            required: true,
            type: Date,
        }
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                delete ret.__v;
            }
        }
    }
)

export const ViewProductModel: mongoose.Model<IViewProductDocument> = mongoose.model(
    ViewProductModelName,
    ViewProductSchema
);

