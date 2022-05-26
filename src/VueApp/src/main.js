import * as Vue from "vue"
import * as VueRouter from "vue-router"
import axios from "axios"

import App from "./App.vue"

import "./css/style.css"
import "./css/big-screen.css"
import "./css/theme-light.css"
import "./css/theme-dark.css"

const app = Vue.createApp(App)
app.config.unwrapInjectedRef = true
app.mount("#app")

window.axios = axios
window.vueApp = app
