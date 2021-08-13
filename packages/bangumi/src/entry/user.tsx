console.log('user')
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import User from '@/view/user/user'
import '@/utils/index'
// import 'antd/dist/antd.css'
import '~/css/reset.scss'
import '~/css/global.scss'

ReactDOM.render(<User/>, document.getElementById('user'))
