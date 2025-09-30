import { Outlet } from 'react-router'
import Headers from './Headers'

export default function Layout() {
	return (
		<div>
			<Headers />
			<Outlet />
		</div>
	)
}
