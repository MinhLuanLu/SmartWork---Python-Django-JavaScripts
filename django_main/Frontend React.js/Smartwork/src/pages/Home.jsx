import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Smartwork_logo.png"
import Login from "./Login";



export default function Home(){
    return(
        <>    
            <div class="bg-white mt-8">
                <header class="bg-gray-300 bg-opacity-30 fixed top-0 left-0 right-0"> 
                    <div class="px-4 mx-auto sm:px-6 lg:px-8">
                        <div class="flex items-center justify-between h-16 lg:h-20">
                            <div class="flex-shrink-0">
                                <a href="#" title="" class="flex">
                                    <img class="w-auto h-8" src={logo} alt="" />
                                </a>
                            </div>

                            <button type="button" class="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                            
                                <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                                </svg>

                            
                                <svg class="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>

                            <div class="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                <a href="#" title="" class="text-base text-black transition-all duration-200 hover:text-opacity-80"> Features </a>

                                <a href="#" title="" class="text-base text-black transition-all duration-200 hover:text-opacity-80"> Solutions </a>

                                <a href="#" title="" class="text-base text-black transition-all duration-200 hover:text-opacity-80"> Resources </a>

                                <a href="#" title="" class="text-base text-black transition-all duration-200 hover:text-opacity-80"> About Us </a>
                            </div>

                            <Link
                                to="/Login"
                                title=""
                                class="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-green-500 rounded-full"
                                role="button"
                                >
                                Login
                            </Link>

                        </div>
                    </div>
                </header>

                <section class="bg-white-300 bg-opacity-30 py-10 sm:py-16 lg:py-24">
                    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                            <div>
                                <p class="text-base font-semibold tracking-wider text-blue-600 uppercase">All-in-one platform</p>
                                <h1 class="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">Maximizing Efficiency, Transforming Lives</h1>
                                <p class="mt-4 text-base text-black lg:mt-8 sm:text-xl"> SmartWork provides a user-friendly experience.</p>

                                <Link to="/Login" title="" class="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400" role="button">
                                    Start Exploring
                                    <svg class="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </Link>
                            </div>

                            <div>
                                <img class="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
            
        </>
        


    );
}

