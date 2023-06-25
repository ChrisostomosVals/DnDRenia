import { Dimensions } from 'react-native';

const msp = (dim: any, limit: any) => {
  return dim.scale * dim.width >= limit || dim.scale * dim.height >= limit;
};

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  console.log(dim)
  return dim.height >= dim.width;
};

const isLandscape = () => {
  // @ts-expect-error TS(2304): Cannot find name 'dim'.
  return dim.width >= dim.height;
};

const isTablet = () => {
  const dim = Dimensions.get('screen');
  return (
    (dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900))
  );
};

const isPhone = () => {
  return !isTablet();
};

export default {
  isPortrait,
  isLandscape,
  isTablet,
  isPhone,
};