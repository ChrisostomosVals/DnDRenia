export default interface UpdateUserRequestModel {
    id: string;
    characterId: string | null;
    name: string | null;
    email: string;
}