import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { CONTACTS } from '../helpers/paths'

export default function Home() {
	const sectionRefs = useRef([])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in-up')
					}
				})
			},
			{ threshold: 0.1 }
		)

		sectionRefs.current.forEach(ref => {
			if (ref) observer.observe(ref)
		})

		return () => observer.disconnect()
	}, [])

	const skills = [
		{ name: 'React', level: 70 },
		{ name: 'TypeScript', level: 65 },
		{ name: 'Tailwind CSS', level: 85 },
		{ name: 'Redux Toolkit', level: 70 }
	]

	const projects = [
		{
			title: 'Miro copy',
			description: 'A front-end app that helps you visualize your thoughts',
			tags: ['React', 'Zod', 'TailwindCSS', 'React Hook Form'],
			image: '../public/miro.png'
		},
		{
			title: '3D-globe',
			description:
				'A replica of the globe on which you can add memorable places from your life',
			tags: ['JavaScript', 'CesiumJS', 'Redux Toolkit'],
			image: '../public/globe.png'
		}
	]

	const addToRefs = el => {
		if (el && !sectionRefs.current.includes(el)) {
			sectionRefs.current.push(el)
		}
	}

	return (
		<div className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans scroll-smooth'>
			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in-up {
					animation: fadeInUp 0.6s ease-out forwards;
				}
				.hover-lift {
					transition: all 0.3s ease;
				}
				.hover-lift:hover {
					transform: translateY(-5px);
				}
				.gradient-text {
					background: linear-gradient(135deg, #000 0%, #333 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}
				.dark .gradient-text {
					background: linear-gradient(135deg, #fff 0%, #ccc 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}
			`}</style>

			<section
				ref={addToRefs}
				className='pt-24 pb-20 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900'>
				<div className='max-w-6xl mx-auto'>
					<div className='flex flex-col lg:flex-row items-center gap-12'>
						<div className='flex-shrink-0'>
							<div className='w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl hover-lift'>
								<div className='w-full h-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-sans'>
									<div className='text-center'>
										<img
											src={'../public/photo_2025-09-29_22-45-14.jpg'}
											alt={'Daniil Tkachenko'}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
										/>
									</div>
								</div>
							</div>
						</div>

						<div className='text-center lg:text-left flex-1'>
							<div className='inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium mb-6 font-sans border border-gray-200 dark:border-gray-700'>
								<span className='w-2 h-2 bg-gray-600 rounded-full mr-2'></span>
								Available for new projects
							</div>

							<h1 className='text-5xl font-bold mb-4 font-sans tracking-tight'>
								<span className='text-gray-300'>Daniil Tkachenko</span>
							</h1>

							<p className='text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-sans max-w-2xl'>
								Frontend developer crafting digital experiences with clean code
								and thoughtful design. Passionate about modern web technologies.
							</p>

							<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
								<NavLink
									target='true'
									to={'https://github.com/ISP-codder?tab=repositories'}
									className='bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover-lift shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'>
									View Projects
								</NavLink>
								<NavLink
									to={CONTACTS}
									className='border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover-lift'>
									Contact Me
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section ref={addToRefs} className='py-20 bg-gray-50 dark:bg-gray-800'>
				<div className='max-w-4xl mx-auto px-6'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white text-center mb-16 font-sans'>
						Technical Expertise
					</h2>

					<div className='grid md:grid-cols-2 gap-8'>
						{skills.map((skill, index) => (
							<div
								key={skill.name}
								className='bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover-lift border border-gray-200 dark:border-gray-600'>
								<div className='flex justify-between items-center mb-3'>
									<span className='text-gray-900 dark:text-white font-semibold font-sans'>
										{skill.name}
									</span>
									<span className='text-gray-500 dark:text-gray-400 text-sm font-mono'>
										{skill.level}%
									</span>
								</div>
								<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3'>
									<div
										className='bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 h-3 rounded-full transition-all duration-1000 ease-out'
										style={{ width: `${skill.level}%` }}></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section ref={addToRefs} className='py-20 px-6 bg-white dark:bg-gray-900'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white text-center mb-16 font-sans'>
						Featured Projects
					</h2>

					<div className='grid lg:grid-cols-2 gap-8'>
						{projects.map((project, index) => (
							<div
								key={index}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover-lift overflow-hidden border border-gray-200 dark:border-gray-700 group'>
								{/* Картинка проекта */}
								<div className='h-98 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 overflow-hidden'>
									<img
										src={project.image}
										alt={project.title}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
									/>
								</div>

								<div className='p-6'>
									<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 font-sans group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>
										{project.title}
									</h3>

									<p className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-sans'>
										{project.description}
									</p>

									<div className='flex flex-wrap gap-2'>
										{project.tags.map((tag, tagIndex) => (
											<span
												key={tagIndex}
												className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-mono border border-gray-200 dark:border-gray-600'>
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='text-center mt-16'>
						<NavLink
							target='true'
							to={'https://github.com/ISP-codder?tab=repositories'}
							className='text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-semibold transition-colors inline-flex items-center font-sans text-lg group'>
							View All Projects
							<svg
								className='w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M9 5l7 7-7 7'></path>
							</svg>
						</NavLink>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section
				ref={addToRefs}
				className='py-20 bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 text-white'>
				<div className='max-w-6xl mx-auto px-6'>
					<div className='grid grid-cols-3 lg:grid-cols-3 gap-8 text-center'>
						{[
							{ number: '1+', label: 'Year Of Education' },
							{ number: '10+', label: 'Projects Completed' },
							{ number: '10k+', label: 'Lines of Code' }
						].map((stat, index) => (
							<div key={index} className='group'>
								<div className='text-4xl font-bold mb-2 font-sans group-hover:scale-110 transition-transform duration-300'>
									{stat.number}
								</div>
								<div className='text-gray-300 text-sm font-sans uppercase tracking-wider'>
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
