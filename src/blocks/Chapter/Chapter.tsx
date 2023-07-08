import { FC, useMemo } from "react";
import ChapterModel from "../../dist/models/ChapterModel";
import { Text, TouchableOpacity, View } from "react-native";
import { ExpandableText } from "../../components/ExpandableText/ExpandableText";
import { chapterStyles } from "./Chapter.style";
import { useDispatch } from "react-redux";
import modalActions from "../../store/modal/actions";

export const Chapter :FC<ChapterModel> = ({
    id,
    name,
    date,
    story
}) =>{
    const day: Date = useMemo(() => {
       return new Date(date);
    }, [date]);
        const dispatch = useDispatch();
    const handleLongPress = ():void =>{
        dispatch(modalActions.setChapterVisibility(true));
        dispatch(modalActions.setChapterContext({id, name, date: new Date(date), story}));
        dispatch(modalActions.setChapterTitle('Edit Chapter'));
    }
    return (
        <TouchableOpacity onLongPress={handleLongPress} activeOpacity={1}>
        <View style={chapterStyles.container}>
            <Text style={chapterStyles.text}>{name}</Text>
            <Text style={chapterStyles.text}>{day.toDateString()}</Text>
            <ExpandableText text={story} maxLines={1000}/>
        </View>
        </TouchableOpacity>
    )
}