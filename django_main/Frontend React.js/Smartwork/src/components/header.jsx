import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/Smartwork_logo.png";

export default function Header() {
    const [FullName, setFullName] = useState('');
    const [Role, setRole] = useState('');
    useState(()=>{
        const getFullName = sessionStorage.getItem('FullName');
        const getRole = sessionStorage.getItem('Role');
        setRole(getRole);
        setFullName(getFullName);
    })
    return (
        <header className="pb-6 bg-gray-100 lg:pb-0 fixed top-0 left-0 right-0 z-50">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <a href="#" title="" className="flex">
                            <img className="w-24 h-16" src={logo} alt="Smartwork Logo" />
                        </a>
                    </div>

                    <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                        
                        <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        </svg>

                        <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">

                        <Link to="/Main" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Home </Link>
                        
                        {Role !== "Manager" && <Link to="/Status" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Status </Link>}
                        
                        {Role !== "Employee" && <Link to="/Decline" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Decline </Link>}

                        {Role !== "Employee" && <Link to="/Requestments" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Requestments </Link>}

                        {Role !== "Employee" && <Link to="/Approvement" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Approvement </Link>}

                        {Role !== 'Manager' && <Link to="/Product" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Order </Link>}

                        <Link to="/Chat" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Chat </Link>

                        {Role !== "Manager" && <Link to="/CheckIn" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Check-In </Link>}

                        {Role !== "Employee" && <Link to="/Register" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Add New Employee </Link>}

                        <Link to="/Profile" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Profile </Link>

                    </div>

                    <Link
                        to="/Home"
                        title=""
                        className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-green-500 border border-transparent rounded-md lg:inline-flex hover:bg-green-600 focus:bg-green-600"
                        role="button"
                        >
                        Logout
                    </Link>
                    <p className="pl-12"><strong>{FullName} :</strong> {Role}</p>

                </nav>

                <nav  className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
                    <div className="flow-root">
                        <div className="flex flex-col px-6 -my-2 space-y-1">

                        <Link to="/Main" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Home </Link>

                        {Role !== "Manager" && <Link to="/Status" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Status </Link>}

                        {Role !== "Employee" && <Link to="/Decline" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Decline </Link>}

                        {Role !== "Employee" && <Link to="/Requestments" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Requestments </Link>}

                        {Role !== 'Manager' && <Link to="/Product" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Order </Link>}

                        {Role !== "Manager" && <Link to="/CheckIn" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Check-In </Link>}
                        
                        {Role !== "Employee" && <Link to="/Register" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Add New Employee </Link>}

                        <Link to="/Profile" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Profile </Link>

                        </div>
                    </div>

                    <div className="px-6 mt-6">
                        <Link to="/Home" className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md items-center hover:bg-blue-700 focus:bg-blue-700" role="button"> Logout </Link>
                        <p className="pl-12 mt-5"><strong>{FullName} :</strong> {Role}</p>
                    </div>
                    
                </nav>
            </div>
        </header>
    );
}
