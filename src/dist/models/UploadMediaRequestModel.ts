import FileModel from "./FileModel";

export default interface UploadMediaRequestModel {
    type: string;
    name: string;
    files: FileModel[];
}