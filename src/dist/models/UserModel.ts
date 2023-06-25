export default interface UserModel {
    id: string;
    role: string;
    characterId: string | null;
    name: string | null;
    email: string;
}