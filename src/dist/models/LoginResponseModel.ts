import LoginErrorModel from "./LoginErrorModel";

export default class LoginResponseModel<T> {
    public data!: T | null;
    public error!: LoginErrorModel | null;
    public isError: boolean;
    constructor(data:T | null, error: LoginErrorModel | null){
        this.isError = error !== null;
        if(this.isError){
            this.setError(error);
        }
        this.setModel(data);
        
    }
    
    private setModel(params: T | null) {
        this.data = params
    }

    private setError(params: LoginErrorModel | null){
        this.error = params
    }
}
