export default interface LocationModel {
    id: string;
    x: string;
    y: string;
    date: number;
    time: string;
    year: number;
    season: string;
    events: string[] | null;
}