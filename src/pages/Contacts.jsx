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

	// Безопасная загрузка конфигурации
	const EMAILJS_CONFIG = {
		SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
		TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
		PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
	}

	// Проверка конфигурации при загрузке
	useEffect(() => {
		if (
			!EMAILJS_CONFIG.SERVICE_ID ||
			!EMAILJS_CONFIG.TEMPLATE_ID ||
			!EMAILJS_CONFIG.PUBLIC_KEY
		) {
			console.warn('EmailJS configuration is missing. Form will not work.')
		}
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()

		// Проверка конфигурации перед отправкой
		if (
			!EMAILJS_CONFIG.SERVICE_ID ||
			!EMAILJS_CONFIG.TEMPLATE_ID ||
			!EMAILJS_CONFIG.PUBLIC_KEY
		) {
			setSubmitStatus('error')
			setTimeout(() => setSubmitStatus(''), 5000)
			return
		}

		setIsSubmitting(true)
		setSubmitStatus('sending')

		try {
			const result = await emailjs.sendForm(
				EMAILJS_CONFIG.SERVICE_ID,
				EMAILJS_CONFIG.TEMPLATE_ID,
				formRef.current,
				EMAILJS_CONFIG.PUBLIC_KEY
			)

			setSubmitStatus('success')
			setFormData({ from_name: '', from_email: '', subject: '', message: '' })

			setTimeout(() => setSubmitStatus(''), 5000)
		} catch (error) {
			console.error('Error sending email:', error)
			setSubmitStatus('error')
			setTimeout(() => setSubmitStatus(''), 5000)
		} finally {
			setIsSubmitting(false)
		}
	}

	// Функция для копирования в буфер обмена
	const copyToClipboard = async (text, fieldName) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopiedField(fieldName)

			setTimeout(() => {
				setCopiedField('')
			}, 2000)
		} catch (err) {
			console.error('Failed to copy: ', err)
			// Fallback для старых браузеров
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

	// Реальные контактные данные (замените на свои)
	const contactMethods = [
		{
			icon: '📧',
			title: 'Email',
			value: 'daniil.tkachenko.05@mail.ru',
			field: 'email',
			copyable: true
		},
		{
			icon: '📱',
			title: 'Phone',
			value: '+7 (989) 616-97-88',
			field: 'phone',
			copyable: true
		},
		{
			icon: '📍',
			title: 'Location',
			value: 'Rostov-on-Don, Russia',
			field: 'location',
			copyable: false // Местоположение не копируется
		}
	]

	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/ISP-codder',
			username: '@ISP-codder'
		},
		{
			name: 'Telegram',
			url: 'https://t.me/danya77723',
			username: '@danya77723'
		}
	]

	// Статус сообщения
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

			{/* Hero Section */}
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

			{/* Main Content */}
			<section className='py-16 px-6'>
				<div className='max-w-6xl mx-auto'>
					<div className='grid lg:grid-cols-2 gap-12'>
						{/* Contact Form */}
						<div
							ref={addToRefs}
							className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 font-sans'>
								Send Me a Message
							</h2>

							{/* Status Message */}
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
											value={formData.from_name} // Исправлено
											onChange={handleChange}
											required
											className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300'
											placeholder='Your Name'
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
											value={formData.from_email} // Исправлено
											onChange={handleChange}
											required
											className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300'
											placeholder='name@example.com'
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

						{/* Contact Information */}
						<div className='space-y-8'>
							{/* Contact Methods */}
							<div
								ref={addToRefs}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
								<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 font-sans'>
									Contact Information
								</h2>

								<div className='space-y-6'>
									{contactMethods.map((method, index) =>
										method.copyable ? (
											// Копируемые поля (email, телефон)
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
											// Некопируемые поля (местоположение)
											<div
												key={index}
												className='w-full flex items-center group p-3 rounded-xl'>
												<div className='w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl mr-4'>
													{method.icon}
												</div>
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

								{/* Инструкция */}
								<div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800'>
									<p className='text-blue-800 dark:text-blue-300 text-sm text-center'>
										👆 Click on email or phone to copy
									</p>
								</div>
							</div>

							{/* Social Links */}
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
												<span className='text-2xl mr-3 group-hover:scale-110 transition-transform duration-300'>
													{social.icon}
												</span>
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

							{/* Response Time */}
							<div
								ref={addToRefs}
								className='bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white'>
								<div className='text-4xl mb-4'>⚡</div>
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
