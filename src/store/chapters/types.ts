import ChapterModel from "../../dist/models/ChapterModel"

export type ChaptersState = {
    chapters: ChapterModel[];
    initialised: boolean;
    loading: boolean;
}