interface Filter {
    field: string;
    operator: string;
    value: any;
}

export interface RecordSearchProductDto {
    filters: Filter[];
    searchAt: Date;
}

export interface RecordViewProductDto {
    productId: string;
    viewAt: Date;
}