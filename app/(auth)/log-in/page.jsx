import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function pages() {
  return (
    <div>
      <section class="bg-gradient-to-b from-white to-blue-200 h-[100vh]">
  <div class="flex flex-col items-center my-auto justify-center h-[80vh] px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image class=" mr-2"  src="/assets/logo-light.png"
                            width={150}
                            height={50}
                            alt="fotodukaan logo"/>
             
      </Link>
      <div class="w-full  rounded-lg shadow dark:border dark:border-gray-700 md:mt-0 text-black sm:max-w-md xl:p-0 bg-gradient-to-r from-white to-white">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Login to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="phone" class="block mb-2 text-sm font-medium text-black dark:text-black">Your Phone Number</label>
                      <input type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7061652485" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-black dark:text-black">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      
                      <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-700">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                  <p class="text-sm font-light text-gray-500 dark:text-black">
                      Don’t have an account yet? <Link href="/sign-up" class="font-medium text-primary-600 hover:underline dark:text-blue-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default pages