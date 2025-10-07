import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from "./components/PrivateRoute";

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

//My Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
const Login = React.lazy(() => import('./Pages/Login/Login'))
const Products = React.lazy(() => import('./Pages/Products/Products'))
const Category = React.lazy(() => import('./Pages/Category/Category'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/admin/Category" name="Category" element={<ProtectedRoute><Category/></ProtectedRoute>} />
          <Route exact path="/admin/Products" name="Products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
          <Route exact path="/admin/Dashboard" name="Dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route exact path="/admin/Login" name="Login Page" element={<Login/>} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
