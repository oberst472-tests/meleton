
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'rgba(255,255,255,0)' },
  /*
  ** Global CSS
  */
  css: [
      { src: '@/assets/scss/main.scss', lang: 'sass' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~/components/ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
    modules: ['@nuxtjs/style-resources'],
    styleResources: {
        scss: [
            './assets/scss/vars.scss',
            './assets/scss/adaptive.scss',
            './assets/scss/mixins.scss',
        ]
    },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
