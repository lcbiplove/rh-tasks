interface CsvInferResponseData {
    columns: Record<string, string>;
    rows: Record<string, Record<string, any>>;
}

interface BaseResponse {
    status: string;
    data: CsvInferResponseData
}

interface InferResponseCallback {
    error: Object;
    data: BaseResponse;
}


export type { CsvInferResponseData, BaseResponse, InferResponseCallback };
