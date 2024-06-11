import React, { useEffect, useState } from "react";
import Header from '../components/header';
import {useNavigate} from 'react-router-dom';
import avataricon from "../assets/images/avataricon.png";
import order_waitingicon from "../assets/images/order_waitingicon.png"


export default function Requestments() {
    const [FullName, setFullName] = useState('');
    const [Role, setRole] = useState('');
    useState(()=>{
        const getFullName = sessionStorage.getItem('FullName');
        const getRole = sessionStorage.getItem('Role');
        setRole(getRole);
        setFullName(getFullName);
    })
    const navigate = useNavigate();

    const [orderList, setOrderList] = useState([]);


    useEffect(() => {
        
        if (FullName == null){
            navigate('/Home');
        }

        
        else{
            const Get_Requestments = async () => {
                const get_fullname = sessionStorage.getItem('FullName');
                const list_object = { "FullName": get_fullname, 'Status': 'Waiting' };
                const endpoint = `${import.meta.env.VITE_API_URL}api/Requestments/`;
           
                try {
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(list_object)
                    });
    
                    if (!response.ok) {
                        const errorData = await response.json();
                        if (errorData.message) {
                            alert(errorData.message);
                        }
                        return;
                    }
    
                    const data = await response.json();
                    if (data.message) {
                        setOrderList(data.message); 
                        console.log(data.message);  
                        
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
    
            Get_Requestments();
        }
        
    }, []);

    async function Approve(order){
        const endpoint = `${import.meta.env.VITE_API_URL}Approved_order_api/`;
        await fetch(endpoint,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
                
        })
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            if(res.status === 400){
                return res.json().then(data=>{
                    if (data.message){
                        alert(data.message);

                    }
                })
            }
        })
        .then(data => {
            if (data.message){
                alert(data.message);
            }
        })
    }

    async function Decline(order){
        const endpoint = `${import.meta.env.VITE_API_URL}Decline_order_api/`;
        await fetch(endpoint,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
                
        })
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            if(res.status === 400){
                return res.json().then(data=>{
                    if (data.message){
                        alert(data.message);
                    }
                })
            }
        })
        .then(data => {
            if (data.message){
                alert(data.message);
            }
        })
    }

    return (
        <>
            <Header />
            <section className="py-10 bg-gray-100 sm:py-16 lg:py-24 mt-5">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">All Your Requests</h2>
                        <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Requests come from all your employees</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
                        {orderList.map((order, index) => (
                            <div key={index} className="overflow-hidden bg-white rounded-md">
                                <div className="px-5 py-6">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src={avataricon} alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-black truncate">{order.Sender}</p>
                                            <p className="text-sm text-gray-600 truncate">{order.Workplace}</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500">
                                            <p className="text-xs ml-1 font-bold">{order.Order_status}</p>
                                            {order.Order_status === "Waiting" && (
                                                <img className="w-12" src={order_waitingicon} alt="" />
                                            )}
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <strong>Order at: {order.Order_time}</strong>
                                        <p className="mt-2 text-xl text-gray-800">{order.Order_items}</p>
                                        <span className="mt-5 block text-sky-500">Receiver: {order.Receiver}</span>
                                    </blockquote>

                                    <div className="flex justify-center mt-5"> {/* Wrapping buttons in a div and centering them */}
                                        <button onClick={() => Approve(order)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
                                        <button onClick={() => Decline(order)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Decline</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}
