import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

const observer = new PerformanceObserver((entries, observer) => {
  console.log(entries.getEntries(), observer)
  
})

observer.observe({ entryTypes: ['largest-contentful-paint'] })
