interface CsvInferResponseData {
    columns: Record<string, string>;
    rows: Record<string, Record<string, any>>;
    title: string;
    id: number;
}

interface BaseResponse {
    status: string;
    data: CsvInferResponseData
}

interface InferResponseCallback {
    error: Object;
    data: BaseResponse;
}

interface ModalData {
    showModal: boolean;
    component: React.ReactNode;
}

export type { CsvInferResponseData, BaseResponse, InferResponseCallback, ModalData };
