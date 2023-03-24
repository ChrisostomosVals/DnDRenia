import ErrorResponseModel from './ErrorResponseModel';
export default class ApiResponseModel<T> {
    data: T | null;
    error: ErrorResponseModel | null;
    isError: boolean;
    constructor(data: T | null, error: ErrorResponseModel | null);
    private setModel;
    private setError;
}
