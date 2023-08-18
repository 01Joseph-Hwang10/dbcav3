import React from 'react';
import {ISectionEdge, SectionData, StyleMixin} from '@src/utils/types';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export type SectionListViewItem<T> = ({
  item,
  index,
}: {
  item: T;
  index: number;
}) => React.ReactElement;

interface PSectionListView<T = any> extends StyleMixin {
  keyExtractor?: (data: T, index: number) => string;
  renderItem: SectionListViewItem<T>;
  sections: SectionData<T>[];
  renderSectionHeader?: (edge: ISectionEdge<T>) => React.ReactElement;
  renderSectionFooter?: (edge: ISectionEdge<T>) => React.ReactElement;
  horizontal?: boolean;
  scrollable?: boolean;
}

const SectionListView: React.FC<PSectionListView> = ({
  style,
  contentContainerStyle,
  renderSectionFooter,
  renderSectionHeader,
  renderItem,
  sections,
  horizontal,
  scrollable,
}) => {
  const horizontalStyle: ViewStyle = {
    flexDirection: horizontal ? 'row' : 'column',
  };
  const Inner: React.FC<StyleMixin> = ({
    style: innerStyle,
    contentContainerStyle: innerContentContainerStyle,
  }) => {
    return (
      <View
        style={[
          styles.defaultStyle,
          innerStyle,
          innerContentContainerStyle,
          horizontalStyle,
        ]}>
        {sections.map((section, index) => (
          <React.Fragment key={`outer${index}`}>
            {renderSectionHeader && renderSectionHeader({section})}
            {section.data.map((item, dataIndex) =>
              renderItem({item, index: dataIndex}),
            )}
            {renderSectionFooter && renderSectionFooter({section})}
          </React.Fragment>
        ))}
      </View>
    );
  };
  if (scrollable) {
    return (
      <ScrollView style={style}>
        <Inner style={contentContainerStyle} />
      </ScrollView>
    );
  }
  return <Inner style={[style, contentContainerStyle]} />;
};

export default SectionListView;

const styles = StyleSheet.create({
  defaultStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
});
