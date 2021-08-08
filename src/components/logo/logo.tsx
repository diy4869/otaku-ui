import React from 'react'
import darkLogo from '~/img/dark.png'
import lightLogo from '~/img/light.png'
import LogoStyle from './logo.scss'

// require('~/img/dark.png')
interface Props {
  theme?: string
}
export default function Logo (props: Props) {
  console.log(props)

  const homePage = () => {
    // history.push('')
    location.href = location.origin
  }

  return (
    <div className={LogoStyle.logo} onClick={homePage}>
      <img src={props.theme === 'dark' ? darkLogo : lightLogo} alt=""/>
    </div>
  )
}
