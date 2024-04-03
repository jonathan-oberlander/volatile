import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { ErrorBoundary } from './components/shared/ErrorBoundary'

import { Live, loader as livePageLoader } from './routes/live'
import { Root } from './routes/root'

import './index.css'

const router = createBrowserRouter([
  {
    path: '*',
    loader: () => redirect('/live?match=ETH-USD'),
  },
  {
    path: '/',
    Component: Root,
    ErrorBoundary,
    children: [
      {
        path: 'live',
        loader: livePageLoader,
        ErrorBoundary,
        Component: Live,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
