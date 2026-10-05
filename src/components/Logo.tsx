import { Image } from 'react-native';
import { useTheme } from '../themeContext';

// Official artwork on transparent backgrounds; the dark version has white lettering
// (except "Tr" on the yellow circle, which stays black).
const logoLight = require('../../assets/images/trustifyx-logo-light.png');
const logoDark = require('../../assets/images/trustifyx-logo-dark.png');
const RATIO = 1132 / 442;

type Props = {
  /** Wordmark size; the logo is drawn about 2.84× this tall (same footprint as before). */
  size?: number;
};

export default function Logo({ size = 16 }: Props) {
  const { scheme } = useTheme();
  const height = size * 2.84;

  return (
    <Image
      source={scheme === 'dark' ? logoDark : logoLight}
      style={{ height, width: height * RATIO }}
      resizeMode="contain"
      accessibilityLabel="TrustifyX"
    />
  );
}
