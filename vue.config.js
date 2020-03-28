const themeColor = '#880f48'

module.exports = {
  pwa: {
    name: 'Unicorn Message',
    short_name: 'Unicorn Message',
    themeColor,
    msTileColor: themeColor,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'magenta',
    start_url: '.',
    display: 'standalone',
    background_color: themeColor

    // configure the workbox plugin
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: 'src/registerServiceWorkekr.js',
    //   // ...other Workbox options...
    // }
  }
}