import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export default function Contacts() {
	const [formData, setFormData] = useState({
		from_name: '',
		from_email: '',
		subject: '',
		message: ''
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState('')
	const [copiedField, setCopiedField] = useState('')

	const sectionRefs = useRef([])
	const formRef = useRef()

	const EMAILJS_CONFIG = {
		SERVICE_ID: 'service_5rhntnf',
		TEMPLATE_ID: 'template_ouqxzcg',
		PUBLIC_KEY: 's7tWrlsG98_EfKLtt'
	}

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

	const addToRefs = el => {
		if (el && !sectionRefs.current.includes(el)) {
			sectionRefs.current.push(el)
		}
	}

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
		if (submitStatus) setSubmitStatus('')
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus('sending')

		try {
			const result = await emailjs.sendForm(
				EMAILJS_CONFIG.SERVICE_ID,
				EMAILJS_CONFIG.TEMPLATE_ID,
				formRef.current,
				EMAILJS_CONFIG.PUBLIC_KEY
			)

			console.log('Email sent successfully:', result)
			setSubmitStatus('success')
			setFormData({ from_name: '', from_email: '', subject: '', message: '' })

			setTimeout(() => {
				setSubmitStatus('')
			}, 5000)
		} catch (error) {
			console.error('Error sending email:', error)
			setSubmitStatus('error')

			setTimeout(() => {
				setSubmitStatus('')
			}, 5000)
		} finally {
			setIsSubmitting(false)
		}
	}

	const copyToClipboard = async (text, fieldName) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopiedField(fieldName)

			setTimeout(() => {
				setCopiedField('')
			}, 2000)
		} catch (err) {
			console.error('Failed to copy: ', err)
			const textArea = document.createElement('textarea')
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.select()
			document.execCommand('copy')
			document.body.removeChild(textArea)

			setCopiedField(fieldName)
			setTimeout(() => {
				setCopiedField('')
			}, 2000)
		}
	}

	const contactMethods = [
		{
			title: 'Email',
			value: 'daniil.tkachenko.05@mail.ru',
			field: 'email',
			copyable: true
		},
		{
			title: 'Phone',
			value: '+7 (989) 616-97-88',
			field: 'phone',
			copyable: true
		},
		{
			title: 'Location',
			value: 'Rostov-on-Don, Russia',
			field: 'location',
			copyable: false
		}
	]

	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/yourusername',
			username: '@yourusername'
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/yourprofile',
			username: '@yourprofile'
		},
		{
			name: 'Telegram',
			url: 'https://t.me/yourusername',
			username: '@yourusername'
		}
	]

	const getStatusMessage = () => {
		switch (submitStatus) {
			case 'sending':
				return { message: 'Sending your message...', type: 'info' }
			case 'success':
				return {
					message: "Message sent successfully! I'll get back to you soon.",
					type: 'success'
				}
			case 'error':
				return {
					message:
						'Failed to send message. Please try again or contact me directly.',
					type: 'error'
				}
			default:
				return null
		}
	}

	const status = getStatusMessage()

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
					transform: translateY(-3px);
				}
				.copy-feedback {
					animation: copyPulse 0.3s ease-in-out;
				}
				@keyframes copyPulse {
					0% {
						transform: scale(1);
					}
					50% {
						transform: scale(0.95);
					}
					100% {
						transform: scale(1);
					}
				}
			`}</style>

			<section className='pt-24 pb-16 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-6 font-sans'>
						Get In Touch
					</h1>
					<p className='text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto'>
						Have a project in mind or want to discuss potential collaboration?
						I'd love to hear from you.
					</p>
				</div>
			</section>

			<section className='py-16 px-6'>
				<div className='max-w-6xl mx-auto'>
					<div className='grid lg:grid-cols-2 gap-12'>
						<div
							ref={addToRefs}
							className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 font-sans'>
								Send Me a Message
							</h2>

							{status && (
								<div
									className={`mb-6 p-4 rounded-xl border ${
										status.type === 'success'
											? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
											: status.type === 'error'
												? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
												: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300'
									}`}>
									<div className='flex items-center'>
										{status.type === 'success' && '✅'}
										{status.type === 'error' && '❌'}
										{status.type === 'info' && '⏳'}
										<span className='ml-2 font-medium'>{status.message}</span>
									</div>
								</div>
							)}

							<form ref={formRef} onSubmit={handleSubmit} className='space-y-6'>
								<div className='grid md:grid-cols-2 gap-6'>
									<div>
										<label
											htmlFor='from_name'
											className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											Your Name *
										</label>
										<input
											type='text'
											id='from_name'
											name='from_name'
											value={formData.from_name}
											onChange={handleChange}
											required
											className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300'
											placeholder='John Doe'
										/>
									</div>

									<div>
										<label
											htmlFor='from_email'
											className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
											Email Address *
										</label>
										<input
											type='email'
											id='from_email'
											name='from_email'
											value={formData.from_email}
											onChange={handleChange}
											required
											className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300'
											placeholder='john@example.com'
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor='subject'
										className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										Subject *
									</label>
									<input
										type='text'
										id='subject'
										name='subject'
										value={formData.subject}
										onChange={handleChange}
										required
										className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300'
										placeholder='Project Discussion'
									/>
								</div>

								<div>
									<label
										htmlFor='message'
										className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
										Your Message *
									</label>
									<textarea
										id='message'
										name='message'
										value={formData.message}
										onChange={handleChange}
										required
										rows='6'
										className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 resize-none'
										placeholder='Tell me about your project...'
									/>
								</div>

								<button
									type='submit'
									disabled={isSubmitting}
									className={`w-full bg-gray-900 hover:bg-black text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover-lift shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 ${
										isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
									}`}>
									{isSubmitting ? (
										<div className='flex items-center justify-center'>
											<div className='w-5 h-5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin mr-2'></div>
											Sending...
										</div>
									) : (
										'Send Message'
									)}
								</button>
							</form>
						</div>

						<div className='space-y-8'>
							<div
								ref={addToRefs}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
								<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 font-sans'>
									Contact Information
								</h2>

								<div className='space-y-6'>
									{contactMethods.map((method, index) =>
										method.copyable ? (
											<button
												key={index}
												onClick={() =>
													copyToClipboard(method.value, method.field)
												}
												className={`w-full flex items-center group p-3 rounded-xl transition-all duration-300 hover-lift ${
													copiedField === method.field
														? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 copy-feedback'
														: 'hover:bg-gray-50 dark:hover:bg-gray-700'
												}`}>
												<div className='flex-1 text-left'>
													<h3 className='font-semibold text-gray-900 dark:text-white'>
														{method.title}
													</h3>
													<div className='flex items-center gap-2'>
														<p className='text-gray-600 dark:text-gray-300'>
															{method.value}
														</p>
														{copiedField === method.field && (
															<span className='text-green-600 dark:text-green-400 text-xs font-medium animate-pulse'>
																✓ Copied!
															</span>
														)}
													</div>
												</div>
												<div className='text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors text-sm'>
													Click to copy
												</div>
											</button>
										) : (
											<div
												key={index}
												className='w-full flex items-center group p-3 rounded-xl'>
												<div className='flex-1 text-left'>
													<h3 className='font-semibold text-gray-900 dark:text-white'>
														{method.title}
													</h3>
													<p className='text-gray-600 dark:text-gray-300'>
														{method.value}
													</p>
												</div>
											</div>
										)
									)}
								</div>

								<div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800'>
									<p className='text-blue-800 dark:text-blue-300 text-sm text-center'>
										Click on email or phone to copy
									</p>
								</div>
							</div>

							<div
								ref={addToRefs}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
								<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 font-sans'>
									Follow Me
								</h2>

								<div className='grid grid-cols-1 gap-4'>
									{socialLinks.map((social, index) => (
										<a
											key={index}
											href={social.url}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover-lift group border border-gray-200 dark:border-gray-600'>
											<div className='flex items-center'>
												<div>
													<div className='font-semibold text-gray-900 dark:text-white'>
														{social.name}
													</div>
													<div className='text-sm text-gray-600 dark:text-gray-300'>
														{social.username}
													</div>
												</div>
											</div>
											<div className='text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors'>
												→
											</div>
										</a>
									))}
								</div>
							</div>

							<div
								ref={addToRefs}
								className='bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white'>
								<h3 className='text-xl font-bold mb-2'>Fast Response</h3>
								<p className='text-gray-300 text-sm leading-relaxed'>
									I typically respond to all messages within 24 hours. For
									urgent inquiries, please mention it in your message.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
