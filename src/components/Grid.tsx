import { Children, ReactNode } from 'react';
import { View } from 'react-native';

type Props = {
  columns: number;
  gap?: number;
  children: ReactNode;
};

// Equal-width columns; the last row is padded with spacers so cards keep their width.
export default function Grid({ columns, gap = 16, children }: Props) {
  const items = Children.toArray(children);
  const rows: ReactNode[][] = [];
  for (let i = 0; i < items.length; i += columns) rows.push(items.slice(i, i + columns));

  return (
    <View style={{ gap }}>
      {rows.map((row, r) => (
        <View key={r} style={{ flexDirection: 'row', gap, alignItems: 'stretch' }}>
          {row.map((item, c) => (
            <View key={c} style={{ flex: 1 }}>
              {item}
            </View>
          ))}
          {Array.from({ length: columns - row.length }, (_, s) => (
            <View key={`spacer-${s}`} style={{ flex: 1 }} />
          ))}
        </View>
      ))}
    </View>
  );
}
