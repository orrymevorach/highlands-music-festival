const path = require('path');

module.exports = {
  siteMetadata: {
    siteUrl: `https://highlandsmusicfestival.ca/`,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@components': path.resolve(__dirname, 'src/components'),
          '@vars': path.resolve(__dirname, 'src/styles/vars.scss'),
          '@colors': path.resolve(__dirname, 'src/styles/colors.scss'),
          '@fonts': path.resolve(__dirname, 'src/styles/fonts.scss'),
          '@hooks': path.resolve(__dirname, 'src/hooks/index.js'),
          '@utils': path.resolve(__dirname, 'src/utils/'),
          '@mixins': path.resolve(__dirname, 'src/styles/mixins.scss'),
          '@images': path.resolve(__dirname, 'src/images/'),
        },
        extensions: ['jsx', 'scss'],
      },
    },
  ],
};
