import React, { Suspense, useState } from 'react'
import { NavLink, Routes, Link, Route } from 'react-router-dom'
import { Space, Switch } from 'otaku-ui'
import GitHubStart from '../components/GithubStart'
import style from '../App.module.scss'
import routes from '../router/index'

export default function Home () {
  const [data, setData] = useState<{
    stargazers_count?: number
  }>({})

  const processRouter = routes
    .filter(item => item.children)
    .reduce((router, current) => {
      const result = current.children?.map(children => {
        return (
          <Route
            path={children.path}
            key={children.path}
            index={children.path === '/dev/introduce'}
            element={
              <React.Suspense fallback={<>...</>}>
                <children.component></children.component>
              </React.Suspense>
            }
          />
        )
      })

      return router.concat(result)
    }, [])

  const switchTheme = (checked: boolean) => {
    const theme = checked ? 'dark' : 'light'
    document.documentElement.setAttribute('theme', theme)

    const link = document.querySelector('#theme')
    const src = `./src/assets/style/theme/${theme}.css`

    link?.setAttribute('href', src)
  }

  return (
    <div>
      <div className={style['otaku-home']}>
        <header className={style['otaku-header']}>
          <div className={style['otaku-title']}>
            <span>OTAKU-UI</span>
          </div>

          <Space>
            <Switch onChange={switchTheme} activeText="light" inactiveText='dark' value={true}></Switch>
            <Link to='/playground' className='playground'>Playground</Link>
            <GitHubStart/>
          </Space>
        </header>
        <aside className={style['content']}>
          <aside className={style['sidebar']}>
            {routes.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <h3 className={style['title']}>{item.title}</h3>
                  <div className={style['otaku-menu']}>
                    {item.children?.map((children, childrenIndex) => {
                      return (
                        <NavLink
                          key={`${index}-${childrenIndex}`}
                          className={({ isActive }) => {
                            const className = [style['otaku-menu-item']]

                            return isActive
                              ? className.concat(style['active']).join(' ')
                              : className.join(' ')
                          }}
                          to={children.path}
                        >
                          {children.title}
                        </NavLink>
                      )
                    })}
                  </div>
                </React.Fragment>
              )
            })}
          </aside>
          <Suspense fallback={<div></div>}>
            <aside className='main'>
              <Routes>
                {processRouter}
              </Routes>
              {/* <Outlet></Outlet> */}
            </aside>
            <aside className='anchor-container'></aside>
          </Suspense>
        </aside>
      </div>
    </div>
  )
}
