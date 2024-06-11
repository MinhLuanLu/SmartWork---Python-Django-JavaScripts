import React,{useEffect, useState} from "react";
import locationicon from '../assets/images/locationicon.png';
import addressicon from '../assets/images/addressicon.png';
import timeicon from '../assets/images/timeicon.png';
import statusicon from '../assets/images/statusicon.png';
import { useNavigate } from "react-router-dom";

import Header from "../components/header";
import MapComponent from "../components/API_map";



export default function CheckIn(){
    const [FullName, setFullName] = useState('');
    const [Role, setRole] = useState('');
    useState(()=>{
        const getFullName = sessionStorage.getItem('FullName');
        const getRole = sessionStorage.getItem('Role');
        setRole(getRole);
        setFullName(getFullName);
    })
    const navigate = useNavigate();


    const [address, setAddress] = useState('');
    const [checkin_time, setCheckin_time] = useState('');
    const [Status, setStatus] = useState('');
    useEffect(() =>{
        if (FullName == null){
            navigate('/Home');
        }

        let getaddress = sessionStorage.getItem('Address');
        let get_checkin_status = sessionStorage.getItem('CheckIn_status');

        setAddress(getaddress);
        setStatus(get_checkin_status);
        const now = new Date();
        const currentTime = now.toLocaleTimeString(); 
        setCheckin_time(currentTime);

        
    }, [])
    return(
        
       <>   
      
            <Header/>
            <section class="py-10 bg-gray-50 sm:py-16 lg:py-8 mt-16">
                <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="max-w-xl mx-auto text-center">
                        <h2 class="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Check-In your Location <img class='w-16 h-16 inline-block' src={locationicon} /></h2>
                    </div>
            
                    <div class="grid items-center grid-cols-1 mt-12 gap-y-10 lg:grid-cols-5 sm:mt-5 gap-x-4">
                        <div class="space-y-8 lg:pr-16 xl:pr-24 lg:col-span-2 lg:space-y-12">
                            <div class="flex items-start">
                                <img class="flex-shrink-0 text-green-500 w-9 h-9" src={addressicon}/>
                                
                                <div class="ml-5">
                                    <h3 class="text-xl font-semibold text-black">Your Current Address</h3>
                                    <p class="mt-3 text-base text-gray-600 font-semibold text-4xl">{address ? `Address: ${address}` : 'Loading address...'}</p>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <img class="flex-shrink-0 text-blue-600 w-9 h-9 font-semibold" src={statusicon} alt="" />
                                <div class="ml-5">
                                    <h3 class="text-xl font-semibold text-black">CheckIn Status</h3>
                                    <p class="mt-3 text-base text-green-600 font-semibold text-4xl">{Status ? `${Status}` : 'Loading Check-In Status...'}</p>
                                </div>
                            </div>
            
                            <div class="flex items-start">
                                <img class="flex-shrink-0 text-blue-600 w-9 h-9 font-semibold" src={timeicon} alt="" />
                                <div class="ml-5">
                                    <h3 class="text-xl font-semibold text-black">Your Check-In Time</h3>
                                    <p class="mt-3 text-base text-gray-600 font-semibold text-4xl">{checkin_time}</p>
                                </div>
                            </div>
                            
                        </div>
            
                        <div class="lg:col-span-3 gap-x-4">
                            <MapComponent />
                        
                        </div>
                    </div>
                </div>
            </section>
    
        </>         
        
    );
}