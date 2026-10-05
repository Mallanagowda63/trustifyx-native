import { StyleSheet, View } from 'react-native';
import { fonts } from '../theme';
import Svg, { Circle, Defs, G, Line, Path, RadialGradient, Rect, Stop, Text as SvgText } from 'react-native-svg';

// Circuit-style "TX" artwork for the "Why the Name TrustifyX?" section.
export default function BrandArt() {
  const traces = [
    'M60 120 H150 V170', 'M60 300 H140 V250', 'M540 110 H450 V165', 'M540 310 H460 V255',
    'M200 60 V110 H240', 'M400 60 V105 H360', 'M210 360 V310 H250', 'M390 360 V315 H350',
    'M110 210 H170', 'M490 210 H430', 'M300 40 V95', 'M300 380 V330',
  ];

  return (
    <View style={styles.wrap}>
      <Svg width="100%" height="100%" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <RadialGradient id="bg" cx="50%" cy="50%" r="65%">
            <Stop offset="0" stopColor="#3a3508" />
            <Stop offset="0.45" stopColor="#15150f" />
            <Stop offset="1" stopColor="#070707" />
          </RadialGradient>
          <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#ffe600" stopOpacity="0.35" />
            <Stop offset="1" stopColor="#ffe600" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        <Rect width="600" height="420" fill="url(#bg)" />
        <Circle cx="300" cy="210" r="190" fill="url(#glow)" />

        {/* faint grid */}
        <G opacity={0.12}>
          {Array.from({ length: 14 }, (_, i) => (
            <Line key={`v${i}`} x1={i * 45} y1="0" x2={i * 45} y2="420" stroke="#ffe600" strokeWidth={0.5} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <Line key={`h${i}`} x1="0" y1={i * 45} x2="600" y2={i * 45} stroke="#ffe600" strokeWidth={0.5} />
          ))}
        </G>

        {/* circuit traces */}
        <G stroke="#e8c900" strokeWidth={1.6} fill="none" opacity={0.85}>
          {traces.map((d) => (
            <Path key={d} d={d} />
          ))}
        </G>
        <G fill="#ffe600">
          {[[60, 120], [60, 300], [540, 110], [540, 310], [200, 60], [400, 60], [210, 360], [390, 360], [110, 210], [490, 210], [300, 40], [300, 380]].map(
            ([cx, cy]) => <Circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.5} />,
          )}
        </G>

        {/* glowing letters: blurred-looking halo + crisp outline */}
        <SvgText x="300" y="262" fontSize="150" fontFamily={fonts.heading} textAnchor="middle" letterSpacing={18}
          fill="none" stroke="#ffe600" strokeWidth={10} strokeOpacity={0.18}>
          TX
        </SvgText>
        <SvgText x="300" y="262" fontSize="150" fontFamily={fonts.heading} textAnchor="middle" letterSpacing={18}
          fill="#2a2604" stroke="#ffec3d" strokeWidth={3}>
          TX
        </SvgText>
        <Line x1="300" y1="140" x2="300" y2="280" stroke="#ffe600" strokeWidth={2} opacity={0.6} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#070707',
  },
});
