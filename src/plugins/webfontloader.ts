export default async function loadFonts() {
  // eslint-disable-next-line global-require
  const webFontLoader = await require('webfontloader');

  webFontLoader.load({
    google: {
      families: ['Roboto', 'Rajdhani', 'Mulish'],
    },
  });
}
