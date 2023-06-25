export default interface InsertLocationRequestModel {
    x: string;
    y: string;
    date: number;
    time: string;
    year: number;
    season: string;
    events: string[] | null;
}