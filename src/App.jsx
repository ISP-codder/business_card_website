import React, { Suspense } from 'react'
import './App.css'
import Layout from './components/Layout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/Abouts'))
const Contacts = React.lazy(() => import('./pages/Contacts'))

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<p>Загрузка...</p>}>
						<Home />
					</Suspense>
				)
			},
			{
				path: 'about',
				element: (
					<Suspense fallback={<p>Загрузка...</p>}>
						<About />
					</Suspense>
				)
			},
			{
				path: 'contact',
				element: (
					<Suspense fallback={<p>Загрузка...</p>}>
						<Contacts />
					</Suspense>
				)
			}
		]
	}
])

function App() {
	return <RouterProvider router={router} />
}

export default App
