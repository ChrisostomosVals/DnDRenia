export default class LoginErrorModel {
    public error: string | null;
    public error_description: string | null;
    protected exception: Error | null;

    constructor(error: string, error_description: string | null, exception: Error | null){
        this.error = error;
        this.error_description = error_description;
        this.exception = exception;
    }

    public static NewError(error: LoginErrorModel) : LoginErrorModel{
        return new LoginErrorModel(error.error!, error.error_description!, null);
    }
    public static NewErrorMsg(error: string, error_description: string) : LoginErrorModel{
        return new LoginErrorModel(error, error_description, null);
    }
    public static NewErrorExc(error: string, exception: Error | null){
        return new LoginErrorModel(error, null, exception);
    }
}