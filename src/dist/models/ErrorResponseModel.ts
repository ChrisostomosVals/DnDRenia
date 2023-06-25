export default class ErrorResponseModel {
    public error: string | null;
    public message: string | null;
    protected exception: Error | null;
    public name: string | null;


    constructor(error: string, message: string, exception: Error | null, name: string | null){
        this.error = error;
        this.message = message;
        this.exception = exception;
        this.name = name;
    }

    public static NewErrorMsg(error: string, message: string) : ErrorResponseModel{
        return new ErrorResponseModel(error, message, null, null);
    }

    public static NewErrorExMsg(error: string, message: string, exception: Error) : ErrorResponseModel{
        return new ErrorResponseModel(error, message, exception, exception.name);
    }

    public static NewError(error: string, exception: Error) : ErrorResponseModel{
        return new ErrorResponseModel(error, exception.message, exception, exception.name);
    }
}