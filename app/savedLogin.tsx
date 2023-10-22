'use client'
import Image from 'next/image'
import { useFormik } from 'formik'
import formImage from '../public/form.jpg'
import * as Yup from 'yup'

export default function Home() {
	const formik = useFormik({
		// Initial values
		initialValues: {
			email: '',
			password: '',
		},
		// Validate Form
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Invalid email address.')
				.required('Email is required.'),
			password: Yup.string().required(
				'You are going nowhere without a password.'
			),
		}),
		// Submit Form
		onSubmit: (values) => {
			console.log(values)
		},
	})

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<form
				onSubmit={formik.handleSubmit}
				className="bg-white flex rounded-lg w-1/2 font-latoRegular"
			>
				<div className="flex-1 text-gray-700 p-20">
					<h1 className="text-3xl pb-2 font-latoBold">
						{"Let's get started 👏"}
					</h1>
					<p className="text-lg text-gray-500">
						Join the best reservations system tennis courts that
						allows you to interact easily with others! 🎾
					</p>
					<div className="mt-6">
						{/* Email input field */}
						<div className="pb-4">
							<label
								className={`block font-latoBold text-sm pb-2 ${
									formik.touched.email && formik.errors.email
										? `text-red-400`
										: ``
								}`}
								htmlFor="email"
							>
								{formik.touched.email && formik.errors.email
									? formik.errors.email
									: 'Email'}
							</label>
							<input
								className="border-2 border-gray-500 p-2 rounded-md w-3/4 focus:outline-none focus:border-teal-500 focus:ring focus:ring-teal-500"
								type="email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								placeholder="Enter your email here"
								onBlur={formik.handleBlur}
							/>
						</div>
						{/* Password input field */}
						<div className="pb-4">
							<label
								className={`block font-latoBold text-sm pb-2 ${
									formik.touched.password &&
									formik.errors.password
										? `text-red-400`
										: ``
								}`}
								htmlFor="password"
							>
								{formik.touched.password &&
								formik.errors.password
									? formik.errors.password
									: 'Password'}
							</label>
							<input
								type="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								placeholder="Enter your password here"
								onBlur={formik.handleBlur}
								className="border-2 border-gray-500 p-2 rounded-md w-3/4 focus:outline-none focus:border-teal-500 focus:ring focus:ring-teal-500"
							/>
						</div>
						<button
							type="submit"
							className="bg-teal-500 font-latoBold text-sm text-white py-3 rounded-lg w-full"
						>
							Start Learning Today!
						</button>
					</div>
				</div>
				<div className="relative flex-1">
					<Image
						alt="tennis-court"
						src={formImage}
						fill
						priority
						className="object-cover rounded-lg"
					/>
				</div>
			</form>
		</main>
	)
}
