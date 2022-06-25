import * as React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import '../src/assets/fonts/iconfont.css'
// import '../s'
// import '../../otaku-ui/src/fonts/iconfont.css'
import './assets/style/reset.scss'

const container = document.getElementById('root')

if (container) createRoot(container).render(<App/>)