import React, { useEffect, useState } from "react";
import Header from '../components/header';
import {useNavigate} from 'react-router-dom';
import avataricon from "../assets/images/avataricon.png";
import order_waitingicon from "../assets/images/order_waitingicon.png"
import approvedicon from "../assets/images/approvedicon.png"
import declineicon from "../assets/images/declineicon.png"


export default function Approvement() {
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
                const list_object = { "FullName": get_fullname, 'Status': 'Approved' };
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

    
    return (
        <>
            <Header />
            <section className="py-10 bg-gray-100 sm:py-16 lg:py-24 mt-5">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">All Your Requestments Status</h2>
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
                                            <p className="text-xs mb-1 font-bold">{order.Order_status}</p>
                                            {order.Order_status === "Waiting" && (
                                                <img className="w-12" src={order_waitingicon} alt="" />
                                            )}
                                            {order.Order_status === "Approved" && (
                                                <img className="w-12" src={approvedicon} alt="" />
                                            )}
                                            {order.Order_status === "Decline" && (
                                                <img className="w-12" src={declineicon} alt="" />
                                            )}
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <strong>Order at: {order.Order_time}</strong>
                                        <p className="mt-2 text-xl text-gray-800">{order.Order_items}</p>
                                        <span className="mt-5 block text-sky-500">Receiver: {order.Receiver}</span>
                                    </blockquote>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}
