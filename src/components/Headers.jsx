import React from 'react'
import { NavLink } from 'react-router'
import { ABOUT, CONTACTS, HOME } from '../helpers/paths'

export default function Headers() {
	return (
		<div className='font-display w-full bg-white dark:bg-gray-900 transition-colors flex justify-center h-20 bg-gray-50 dark:bg-gray-800'>
			<ul className=' border-2 border-gray-200 rounded-4xl flex list-none pr-1 pl-3 mt-5 items-center h-10'>
				<NavLink to={HOME}>
					{({ isActive }) => (
						<div
							className={`mr-3 relative group pb-1 transition-all duration-300 ${
								isActive ? 'text-gray-200' : 'text-gray-500 hover:text-gray-400'
							}`}>
							home
							<span
								className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform transition-all duration-400 ease-out origin-bottom ${
									isActive
										? 'scale-y-100 opacity-100'
										: 'scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100'
								}`}></span>
						</div>
					)}
				</NavLink>

				<NavLink to={CONTACTS}>
					{({ isActive }) => (
						<div
							className={`mr-3 relative group pb-1 transition-all duration-300 ${
								isActive ? 'text-gray-200' : 'text-gray-500 hover:text-gray-400'
							}`}>
							contacts
							<span
								className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform transition-all duration-400 ease-out origin-bottom ${
									isActive
										? 'scale-y-100 opacity-100'
										: 'scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100'
								}`}></span>
						</div>
					)}
				</NavLink>
			</ul>
		</div>
	)
}
