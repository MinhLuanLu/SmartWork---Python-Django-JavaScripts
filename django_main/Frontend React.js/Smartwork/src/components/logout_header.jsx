import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Smartwork_logo.png"

export default function LogoutHeader() {
    return (
        <div class="bg-white">
            <header class="bg-[#FCF8F1] bg-opacity-30">
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

    
        </div>

    );
}
