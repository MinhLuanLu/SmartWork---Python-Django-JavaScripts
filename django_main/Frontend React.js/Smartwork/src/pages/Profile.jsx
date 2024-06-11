import { useEffect, useState } from "react";
import Header from "../components/header";
import avataricon from "../assets/images/avataricon.png"
import Workplace_table from "../components/workplace_table";
import { useNavigate } from "react-router-dom";


export default function Profile(){

    const [FullName, setFullName] = useState('');
    const [Role, setRole] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [Postcode, setPostcode] = useState('');

    const navigate = useNavigate();
    
    useEffect(() =>{
        async function Get_user_info(){
            const getFullName = sessionStorage.getItem('FullName');
            setFullName(getFullName);
            const getEmail = sessionStorage.getItem( 'Email');
            setEmail(getEmail);
            const data = {"Email": getEmail};
            const endpoint = `${import.meta.env.VITE_API_URL}api/User_info/`;
            
            await fetch(endpoint,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res =>{
                if(res.ok){
                    return res.json();
                }
                if(res.status === 400){
                    alert(data.message);
                    navigate('/Home')
                    
                }
            })
            .then(data =>{
                if (data.message){
                    console.log(data.user_info);
                    setFullName(getFullName);
                    setRole(data.user_info['Role']);
                    setAddress(data.user_info['Address']);
                    setCity(data.user_info['City']);
                    setPostcode(data.user_info['Postcode']);

                    sessionStorage.setItem('Address', data.user_info['Address']);
                    
                }
            })
            .then(error =>{
                console(data.message);
            })
        }
        Get_user_info();
        
    },[])
    
    

    return(
        <>
            <Header/>
            <section class="pt-10 overflow-hidden bg-gray-50 md:pt-0 sm:pt-16 2xl:pt-0 mt-28">

                <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mt-5">
                    <div class="grid items-center grid-cols-1 md:grid-cols-2 ">
                        <div>
                            <section class="py-10 bg-white sm:py-16 lg:py-24 border border-black">
                                <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div class="text-center">
                                        <img class="object-cover w-32 h-32 mx-auto rounded-full" src={avataricon} alt="" />
                                        <p class="mt-6 text-lg font-semibold text-black">Full Name: {FullName}</p>
                                        <blockquote class="max-w-xl mx-auto mt-7">
                                            <p class="text-xl leading-relaxed text-black">{Email ? `Email: ${Email}` : 'Loading Email...'}</p>
                                        
                                            <p class="text-xl leading-relaxed text-black">{Address ? `Address: ${Address}` : 'Loading Address...'} {Postcode} {City}</p>
                                            <p class="text-xl leading-relaxed text-black">{Role ? `Role: ${Role}` : 'Loading Role...'}</p>
                                        </blockquote>
                                    </div>
                                </div>
                            </section>

                            <p class=" text-xl text-gray-600 ml-36">
                                <span class="relative inline-block">
                                    <span class="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span>
                                    <span class="relative"> Have a question? </span>
                                </span>
                                <br class="block sm:hidden" /> Contract me <a href="#" title="" class="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline">Email</a>
                            </p>
                            
                        </div>

                        <div class="relative">
                            <Workplace_table/>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );


    

    
}


        