export default class ErrorResponseModel {
    error: string | null;
    message: string | null;
    protected exception: Error | null;
    name: string | null;
    constructor(error: string, message: string, exception: Error | null, name: string | null);
    static NewErrorMsg(error: string, message: string): ErrorResponseModel;
    static NewErrorExMsg(error: string, message: string, exception: Error): ErrorResponseModel;
    static NewError(error: string, exception: Error): ErrorResponseModel;
}
