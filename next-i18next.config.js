/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: [ 'en', 'zh-TW', 'ja', 'ko', 'ru', 'th', 'id', 'ms', 'vi' ],
    localeDetection: false,
  },
  defaultNS: 'common',
  ns: [ 'common' ],
};
