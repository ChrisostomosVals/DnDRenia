import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ChapterModel from "../../dist/models/ChapterModel";
import { ScrollView, View } from "react-native";
import { Chapter } from "../../blocks/Chapter/Chapter";
import { ChapterModal } from "../../components/Modal/ChapterModal/ChapterModal";

export const Chapters: FC = () => {
  const chapters: ChapterModel[] = useSelector(
    (state: RootState) => state.chapters.chapters
  );
  return (
    <ScrollView>
      {!!chapters.length &&
        chapters.map((chapter: ChapterModel, index: number) => (
          <Chapter key={chapter.id} {...chapter} />
        ))}
        <ChapterModal/>
    </ScrollView>
  );
};
