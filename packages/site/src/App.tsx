import React, { Suspense, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import style from './App.module.scss'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { HashRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom'
import routes from './router/index'
import NotFound from './components/notFound/notFound'
import http from './api'
import { useState } from 'react'
import '../style/github-markdown-css/github-markdown-light.css'
// import '../style/github-markdown-css/github-markdown-dark.css'

function App() {
  const [data, setData] = useState<{
    stargazers_count?: number
  }>({})
  const getData = () => {
    http
      .get('https://api.github.com/repos/diy4869/otaku-ui', {
        headers: {
          Authorization: 'token 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',
        },
      })
      .then(res => {
        console.log(res)
        setData(res.data)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
       <Router>
      <div className={style['otaku-home']}>
        <header className={style['otaku-header']}>
          {/* otaku-ui | OTAKU-UI |  */}
          <div className={style['otaku-title']}>
            <span>OTAKU-UI</span>
          </div>

          <div>
            <a href="https://github.com/diy4869/otaku-ui" target="_blank">
              GitHub
            </a>
            <span className={`iconfont otaku-icon-star-fill ${style['github-star']}`}></span>
            <span className={`${style['github-star']}`}>{data.stargazers_count ?? 0}</span>
          </div>
        </header>
        <aside className={style['content']}>
          <aside className={style['sidebar']}>
            {routes.map(item => {
              return (
                <>
                  <h3 className={style['title']}>{item.title}</h3>
                  <div className={style['otaku-menu']}>
                    {item.children.map(children => {
                      return (
                        <NavLink
                          activeClassName={style['active']}
                          className={`${style['otaku-menu-item']}`}
                          to={children.path}
                        >
                          {children.title}
                        </NavLink>
                      )
                    })}
                  </div>
                </>
              )
            })}
          </aside>
          <Suspense fallback={<div></div>}>
            <aside className='main'>
              <Switch>
                {routes.map(router => {
                  return router.children.map(children => {
                    return <Route path={children.path} component={children.component} key={children.path} />
                  })
                })}
                <Route path="*" component={NotFound}></Route>
                <Redirect
                  from="/"
                  to={{
                    pathname: '/dev/introduce',
                  }}
                ></Redirect>
              </Switch>

              {/* <CodeExample></CodeExample> */}
            </aside>
            <aside className='anchor-container'></aside>
          </Suspense>
        </aside>
        
      </div>
    </Router>

   
  )
}

export default hot(App)
