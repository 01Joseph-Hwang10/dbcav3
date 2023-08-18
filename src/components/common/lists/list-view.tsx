import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';

export type ListViewItem<T> = ({
  item,
  index,
}: {
  item: T;
  index: number;
}) => React.ReactElement;

interface PListView<T = any> extends StyleMixin {
  keyExtractor?: (data: T, index: number) => string;
  renderItem: ListViewItem<T>;
  data: T[];
  ListFooterComponent?: React.FC;
  ListHeaderComponent?: React.FC;
  ListEmptyComponent?: React.FC;
  ItemSeparatorComponent?: React.FC;
  horizontal?: boolean;
  scrollable?: boolean;
}

const ListView: React.FC<PListView> = ({
  style,
  contentContainerStyle,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  ItemSeparatorComponent,
  data,
  renderItem,
  horizontal,
  scrollable,
}) => {
  const horizontalStyle: ViewStyle = {
    flexDirection: horizontal ? 'row' : 'column',
  };
  let renderData: any[] = !ItemSeparatorComponent
    ? data
    : data.reduce((acc: any[], cur: any, idx: number) => {
        acc.push(cur);
        if (data && idx < data.length - 1) {
          acc.push(null);
        }
        return acc;
      }, [] as any[]);
  renderData = renderData ?? [];
  const Inner: React.FC<StyleMixin> = ({
    style: innerStyle,
    contentContainerStyle: innerContentContainerStyle,
  }) => (
    <View
      style={[
        styles.defaultStyle,
        innerStyle,
        innerContentContainerStyle,
        horizontalStyle,
      ]}>
      {ListHeaderComponent && <ListHeaderComponent />}
      {renderData.map((item, index) => {
        if (!item && ItemSeparatorComponent) {
          return <ItemSeparatorComponent key={index} />;
        }
        const ItemComponent = () => renderItem({item, index});
        return <ItemComponent key={index} />;
      })}
      {!data ||
        (data.length === 0 && ListEmptyComponent && <ListEmptyComponent />)}
      {ListFooterComponent && <ListFooterComponent />}
    </View>
  );
  if (scrollable) {
    return (
      <ScrollView style={style}>
        <Inner contentContainerStyle={contentContainerStyle} />
      </ScrollView>
    );
  }
  return <Inner style={[style, contentContainerStyle]} />;
};

export default ListView;

const styles = StyleSheet.create({
  defaultStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
});
