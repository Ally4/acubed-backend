import i18n from 'i18n'

i18n.configure({
    locales: ['en', 'fr', 'rw'],
    header: 'accept-language',
    extension: '.json',
    queryParameter: 'lang',
    directoryPermissions: '755',
    autoReload: true,
    directory: __dirname + '/locales'
});

export default i18n
