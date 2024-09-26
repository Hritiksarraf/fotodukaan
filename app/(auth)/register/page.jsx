'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'



export default function page() {

    const [steps, setStep] = useState({
        stepsItems: ["Profile", "Contact", "Identity", "Passport"],
        currentStep: 1
    })

    return (
        <div>
            <div className="max-w-2xl mx-auto px-4 md:px-0">
                <ul aria-label="Steps" className="items-center text-gray-600 font-medium md:flex">
                    {steps.stepsItems.map((item, idx) => (
                        <li aria-current={steps.currentStep == idx + 1 ? "step" : false} key={idx} className="flex-1 last:flex-none flex gap-x-2 md:items-center">
                            <div className="flex items-center flex-col gap-x-2">
                                <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? "bg-indigo-600 border-indigo-600" : "" || steps.currentStep == idx + 1 ? "border-indigo-600" : ""}`}>
                                    <span className={` ${steps.currentStep > idx + 1 ? "hidden" : "" || steps.currentStep == idx + 1 ? "text-indigo-600" : ""}`}>
                                        {idx + 1}
                                    </span>
                                    {
                                        steps.currentStep > idx + 1 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        ) : ""
                                    }
                                </div>
                                <hr className={`h-12 border md:hidden ${idx + 1 == steps.stepsItems.length ? "hidden" : "" || steps.currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                            </div>
                            <div className="h-8 flex items-center md:h-auto">
                                <h3 className={`text-sm ${steps.currentStep == idx + 1 ? "text-indigo-600" : ""}`}>
                                    {item}
                                </h3>
                            </div>
                            <hr className={`hidden mr-2 w-full border md:block ${idx + 1 == steps.stepsItems.length ? "hidden" : "" || steps.currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {steps.currentStep == 1 && <section class="bg-[#0E1F41] dark:bg-[#0E1F41] h-[100vh]">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <Image class=" mr-2" src="/assets/logo-dark.jpeg"
                                width={150}
                                height={50}
                                alt="fotodukaan logo" />

                        </Link>
                        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Login to your account
                                </h1>
                                <form class="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone Number</label>
                                        <input type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7061652485" required="" />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div class="flex items-center justify-between">

                                        <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-700">Forgot password?</a>
                                    </div>
                                    <button onClick={() => setStep(prevState => ({
        ...prevState,
        currentStep: 2
    }))} type="submit" class="w-full text-white bg-[#F5AA2B] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#F5AA2B] dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <Link href="/sign-up" class="font-medium text-primary-600 hover:underline dark:text-blue-500">Sign up</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                }

                {/* //section 2 */}

                {steps.currentStep == 2 && <section class="bg-[#0E1F41] dark:bg-[#0E1F41] h-[100vh]">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <Image class=" mr-2" src="/assets/logo-dark.jpeg"
                                width={150}
                                height={50}
                                alt="fotodukaan logo" />

                        </Link>
                        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Login to your account
                                </h1>
                                <form class="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone Number</label>
                                        <input type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7061652485" required="" />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div class="flex items-center justify-between">

                                        <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-700">Forgot password?</a>
                                    </div>
                                    <button onClick={() => setStep(prevState => ({
        ...prevState,
        currentStep: 3
    }))}type="submit" class="w-full text-white bg-[#F5AA2B] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#F5AA2B] dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <Link href="/sign-up" class="font-medium text-primary-600 hover:underline dark:text-blue-500">Sign up</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                }




            </div>
        </div>
    )
}
