import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Layout } from './layout'
import { Home } from './pages/Home'
import { UserData } from './pages/UserData'
import { LikedList } from './pages/Liked'
import { BasketList } from './pages/BasketList'
import { CurrentProduct } from './pages/CurrentProduct'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ProductList } from './pages/ProductList'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'userData',
        element: <UserData />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'products/:idOfProduct',
        element: <CurrentProduct />,
      },
      {
        path: 'liked',
        element: <LikedList />,
      },
      {
        path: 'basket',
        element: <BasketList />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
