export default (item: number) => {
  const imageSet = [
    require('../../assets/crypto_punk_palceholder.png'),
    require('../../assets/bayc_placeholder_3.png'),
    require('../../assets/doodle_placeholder.png'),
  ];
  return imageSet[item % 3];
};
