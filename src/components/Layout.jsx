import { Outlet } from 'react-router'
import Headers from './Headers.jsx'

export default function Layout() {
	return (
		<div>
			<Headers />
			<Outlet />
		</div>
	)
}
