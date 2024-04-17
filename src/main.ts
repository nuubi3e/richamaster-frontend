import './styles/main.scss'

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faX } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'

library.add(faLock, faX)
// creating a app with the App vue component as root / entry component
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app') // in mount function we pass the id of the div present in html file in which we want to mount our vue app
