import { FC, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { expandableTextStyles } from "./ExpandableText.style";

export const ExpandableText:FC<{text: string, maxLines: number}> = ({ text, maxLines }) =>{
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = (): void => {
      setExpanded(!expanded);
    };
    return (
      <TouchableOpacity onPress={toggleExpand}>
        <Text
          numberOfLines={!expanded ? 5 : maxLines}
          style={expandableTextStyles.greek}
        >
          {text}
        </Text>
        {text.length > maxLines && (
            <Text style={expandableTextStyles.english}>{expanded ? 'Read Less' : 'Read More'}</Text>
        )}
      </TouchableOpacity>
    );
  };