import * as mongoose from 'mongoose';
import { IBaseDocument } from "../../core/repositories/IBaseDocument";

export const SearchProductModelName = 'SearchProducts';

export interface ISearchProductDocument extends IBaseDocument {
    field: string,
    operator: string,
    value: string,
    searchAt: Date
}

const SearchProductSchema: mongoose.Schema = new mongoose.Schema(
    {
        field: {
            required: true,
            type: String,
        },
        operator: {
            required: true,
            type: String,
        },
        value: {
            required: true,
            type: String
        },
        searchAt: {
            required: true,
            type: Date
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

export const SearchProductModel: mongoose.Model<ISearchProductDocument> = mongoose.model(
    SearchProductModelName,
    SearchProductSchema
);