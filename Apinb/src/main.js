import * as Vue from "vue"
import * as VueRouter from "vue-router"
import axios from "axios"

import App from "./App.vue"
import Apinb from "./modules/app-data.js"

import "./css/style.css"
import "./css/big-screen.css"
import "./css/theme-light.css"
import "./css/theme-dark.css"

const app = Vue.createApp(App)
app.config.unwrapInjectedRef = true
app.mount("#app")

window.axios = axios
window.vueApp = app

window.addEventListener("beforeunload", (e) => {
  Apinb.saveDocument()
})

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "s") {
    e.preventDefault()
    Apinb.saveDocument()
  }
})
