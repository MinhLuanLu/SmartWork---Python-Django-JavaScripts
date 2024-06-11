import React from "react";
import Header from "../components/header";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate = useNavigate();

    useEffect(() => {
        function Register_user(){
            const form = document.getElementById('register_form');
    
            form.addEventListener('submit', event =>{
                event.preventDefault();
                const formData = new FormData(form);
    
                formData.delete('Confirm Password');
                
            
                // Create JSON format
                const data = Object.fromEntries(formData);
                console.log(data);
    
                const password = document.getElementById('Password').value;
                const Confirm_Password = document.getElementById('Confirm_Password').value;
                const role = document.getElementById('Role').value;
                const checkbox = document.getElementById('checkbox').checked;
                /// Make the password hash
    
                if (password != Confirm_Password){
                    alert('Confirm Password not Match !');
                    return;
                }
    
                if(role == 'blank')
                    {
                        alert('Choose your role...');
                        return;
                    }
               
            
                if (!checkbox){
                    alert('I must agree to the terms and conditions to continue');
                    return;
                }
                const endpoint = `${import.meta.env.VITE_API_URL}register_api/`;
    
                
                fetch(endpoint,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                    body: JSON.stringify(data),
                })
                
                .then(res => {
                    if (res.ok){
                        navigate('/Home')
                        return res.json()
                    }
                    if (res.status === 400){
                        alert(data.message);
                    }
                    
                })
                .then(data =>{
                    if(data.message){
                        alert(data.message);

                    }
                })
                
                
    
            });
            }
        Register_user();
    },[])

    return(
        <>  
            <Header/>
            <section class="py-10 bg-gray-50 sm:py-16 lg:py-24 mt-8">
                <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="max-w-2xl mx-auto text-center">
                        <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Create New Employee</h2>
                        <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">You can create a new employee in to the main system of Smartwork</p>
                    </div>

                    <div class="relative max-w-md mx-auto mt-8 md:mt-16">
                        <div class="overflow-hidden bg-white rounded-md shadow-md">
                            <div class="px-4 py-6 sm:px-8 sm:py-7">
                                <form id="register_form" method="POST">
                                    <div class="space-y-5">
                                        <div>
                                            <label for="" class="text-base font-medium text-gray-900"> First & Last name </label>
                                            <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>

                                                <input
                                                    type="text" name="FullName"
                                                    placeholder="Enter your full name"
                                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="" class="text-base font-medium text-gray-900"> Email address </label>
                                            <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                    </svg>
                                                </div>

                                                <input
                                                    type="text" name="Email"
                                                    placeholder="Enter email to get started"
                                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="" class="text-base font-medium text-gray-900"> Address </label>
                                            <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">

                                                <input 
                                                    type="text" name="Address"
                                                    placeholder="Enter Your Address"
                                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="" class="text-base font-medium text-gray-900"> City </label>
                                            <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">

                                                <input 
                                                    type="text" name="City"
                                                    placeholder="City"
                                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="" class="text-base font-medium text-gray-900"> Postcode </label>
                                            <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">

                                                <input 
                                                    type="text" name="Postcode"
                                                    placeholder="Postcode"
                                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="" class="text-base font-medium text-gray-900"> Password </label>
                                            <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                        />
                                                    </svg>
                                                </div>

                                                <input
                                                    id="Password" type="password" name="Password"
                                                    placeholder="Enter your password"
                                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="" class="text-base font-medium text-gray-900">Confirm Password </label>
                                            <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                        />
                                                    </svg>
                                                </div>

                                                <input
                                                    id="Confirm_Password" type="password" name="Confirm Password"
                                                    placeholder="Enter Password Again"
                                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <label for="Role" className="font-bold">Choose your role</label>
                                        <select name="Role" className="bg-gray-300 ml-2" id="Role">
                                            <option value="blank">Select Role</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Other">Other </option>
                                        </select>
                                        <div class="flex items-center">
                                            <input id="checkbox" type="checkbox" name="Policy_agreement" value="True"class="w-5 h-5 text-green-500 bg-white border-gray-200 rounded" />

                                            <label  id="checkbox" type="checkbox" name="Policy_agreement" value="True" checkbox class="ml-3 text-sm font-medium text-gray-500">
                                                I agree to Smartwork <a href="#" title="" class="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and <a href="#" title="" class="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
                                            </label>
                                        </div>

                                        <div>
                                            <button type="submit" value="Sign Up" class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                                Create account
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}