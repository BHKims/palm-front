import parseArgs from "minimist";

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
})

const port =
  // argv.port ||
  // process.env.PORT ||
  // process.env.npm_package_config_nuxt_port ||
  "3000"
const host = "0.0.0.0"
  // argv.hostname ||
  // process.env.HOST ||
  // process.env.npm_package_config_nuxt_host ||
  

export default {
  // env: {
  //   baseUrl:
  //     //process.env.BASE_URL ||
  //     `http://${host}:${port}`
  // },
  server: {
    port: 3000,
    host: '0.0.0.0',
    timing: false
  },
  head: {
    title: "palm-lining",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  css: ["~/assets/css/main.css"],
  build: {},
  modules: [
    "@nuxtjs/axios",
    "~/modules/typescript.js"
  ],
  axios: {}
}
