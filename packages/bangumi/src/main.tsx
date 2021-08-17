// import React from 'react'
// import ReactDOM from 'react-dom'
// import './index.css'
// import App from '@/view/app/app'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '@/view/app/app'

import '@/utils/index'
import '~/css/reset.scss'
// import '~/css/global.scss'


ReactDOM.render(<App/>, document.getElementById('root'))
