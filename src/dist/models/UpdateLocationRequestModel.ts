import InsertLocationRequestModel from "./InsertLocationRequestModel";

export default interface UpdateLocationRequestModel extends InsertLocationRequestModel {
    id: string;
}