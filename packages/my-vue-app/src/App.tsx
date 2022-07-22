import React, { Suspense, useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { HashRouter, Routes, Route } from 'react-router-dom'
import routes from './router/index'
import NotFound from './components/notFound/notFound'

// import '~/style/theme/light.scss'

// import '../style/github-markdown-css/github-markdown-dark.css'

function App () {
  return (
    <Suspense fallback={<>loading</>}>
      <HashRouter>
      <Routes>
        {routes
          .filter(item => !item.children)
          .map(router => {
            return (
              <Route
                path={router.path}
                key={router.path}
                element={
                  <React.Suspense fallback={<>...</>}>
                    <router.component></router.component> 
                  </React.Suspense>
                }
              />
            )
          })}
        {/* <Route path='*' element={NotFound}></Route> */}
      </Routes>
    </HashRouter>
    </Suspense>
    
  )
}

export default App
