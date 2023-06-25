export default interface WorldMiscModel {
    id: number;
    property: string;
    value: string;
    dependId: number;
    dependLocation: string | null;
}