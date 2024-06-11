import React from "react";
import {useState, useEffect} from "react"; 
import Header from "../components/header";
import { useNavigate } from "react-router-dom";


import "../style_css/cart_bnt.css";

import sort_sække from "../assets/images/sort_sække.jpg"
import spandepose from "../assets/images/spandepose.jpg"
import toiletpapir_tork from "../assets/images/toiletpapir-tork.jpg"
import toiletpapir from "../assets/images/toiletpapir.jpg"
import handsker from "../assets/images/handsker.jpg"
import blå_klud from "../assets/images/blå_klud.jpg"
import rød_klud from "../assets/images/rød_klud.jpg"
import frjebakke_og_kost from "../assets/images/frjebakke_og_kost.jpg"
import carticon from "..//assets/images/shopping_cart_con.png";




export default function Product(){
    const [FullName, setFullName] = useState('');
    const [Role, setRole] = useState('');
    useState(()=>{
        const getFullName = sessionStorage.getItem('FullName');
        const getRole = sessionStorage.getItem('Role');
        setRole(getRole);
        setFullName(getFullName);
    })
    const navigate = useNavigate();
    useEffect(() =>{
        if (FullName == null){
            navigate('/Home');
        }
    },[])

    const [default_item_in_cart, setDefault_item_in_cart] = useState(1);
    const [Show, setShow] = useState(false);
    const [Order_list, setOrder_list] = useState('');
    const [Order_status, setOrder_status] = useState('Waiting');
    const [WorkPlace_select, setWorkplace_select] = useState ('');
    const [Receiver, setReceiver] = useState('');


    const [Sort_sække_value, setSort_sække_value] = useState(0);
    const [Current_sort_sække_value, setCurrent_sort_sække_value,] = useState(0);
    const [Total_sort_sække_value, setTotal_sort_sække_value,] = useState(0);

    const [Spandepose_value, setSpandepose_value] = useState(0);
    const [Current_Spandepose_value, setCurrent_Spandepose_value,] = useState(0);
    const [Total_Spandepose_value, setTotal_Spandepose_value,] = useState(0);

    const [Toiletpapir_tork_value, setToiletpapir_tork] = useState(0);
    const [Current_toiletpapir_tork_value, setCurrent_toiletpapir_tork_value,] = useState(0);
    const [Total_toiletpapir_tork_value, setTotal_toiletpapir_tork_value,] = useState(0);

    const [Toiletpapir_value, setToiletpapir] = useState(0);
    const [Current_toiletpapir_value, setCurrent_toiletpapir_value,] = useState(0);
    const [Total_toiletpapir_value, setTotal_toiletpapir_value,] = useState(0);

    const [Handsker_value, setHandsker] = useState(0);
    const [Current_handsker_value, setCurrent_handsker_value,] = useState(0);
    const [Total_handsker_value, setTotal_handsker_value,] = useState(0);

    const [Blå_klud_value, setBlå_klud] = useState(0);
    const [Current_blå_klud_value, setCurrent_blå_klud_value,] = useState(0);
    const [Total_blå_klud_value, setTotal_blå_klud_value,] = useState(0);

    const [Rød_klud_value, setRød_klud] = useState(0);
    const [Current_rød_klud_value, setCurrent_rød_klud_value,] = useState(0);
    const [Total_rød_klud_value, setTotal_rød_klud_value,] = useState(0)

    const [Frjebakke_og_kost_value, setFrjebakke_og_kost_value] = useState(0);
    const [Current_frjebakke_og_kost_value, setCurrent_frjebakke_og_kost_value,] = useState(0);
    const [Total_frjebakke_og_kost_value, setTotal_frjebakke_og_kost_value,] = useState(0);


    async function Get_Workplace(){
        const endpoint = `${import.meta.env.VITE_API_URL}api/Workplace`;
        const getFullName = sessionStorage.getItem('FullName');
   
        const data = {"FullName": getFullName };
        fetch(endpoint,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response =>{
                if (response.ok){
                    return response.json();
                }
                if (response.status === 400){
                    return response.json().then(data =>{
                        if(data.message){
                            console.log(data.message);
                        }
                    })
                }
            })
                
            .then(data =>{
                if(data.message){
                    
                    console.log('Got Workplace Name...');
                    const workplaces = data.workplaces;
                    const workplace_option = document.getElementById('workplace_option');
                    workplace_option.innerText = '';
                    for (let i = 0; i < workplaces.length; i++){
                        const create = document.createElement('option');
                        create.innerText = workplaces[i];
                        document.getElementById('workplace_option').appendChild(create);
                    }
                    
                }
            })
    }
    
    const Get_workplace_select = (event) =>{
        setWorkplace_select(event.target.value);
    }

    function Get_Receiver(){
        const get_email = sessionStorage.getItem('Email');
        const workplace = document.getElementById('workplace_option').value;
      
        const endpoint = `${import.meta.env.VITE_API_URL}api/Assignment`;
        const check_object = {'Email': get_email, "Search_data": workplace}
    
        fetch(endpoint,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(check_object)
        })
        .then(response =>{
            if (response.ok){
                return response.json();
            }
            if (response.status === 400){
                return response.json().then(data =>{
                    if(data.message){
                        console.log(data.message);
                    }
                })
            }
        })
        .then(data =>{
            if(data.message){
                console.log('Got Receiver..');
                
                const receiver = (data.contract_manager);
                setReceiver(receiver);
                
            }
        })
    }


    async function Sending_order(){
        const receiverElement = document.getElementById('receiver');
        const get_receiverValue = receiverElement.textContent;
        
        let order_list = JSON.stringify(Order_list);

        const getFullName = sessionStorage.getItem('FullName');
        const workplace = document.getElementById('workplace_option').value;
        

        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
        let time = `${currentDate} - ${currentTime}`
        
        const order_data = {
            'Sender': getFullName,
            'Receiver': get_receiverValue, ///// the first Reciver in the object
            'Workplace': workplace,
            'Order_items': order_list,
            'Order_time': time,
            'Order_status': Order_status
        }
       
        console.log(order_data);
        const endpoint = `${import.meta.env.VITE_API_URL}api/Order/`;
        fetch(endpoint,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order_data)
        })
        .then(response =>{
            if (response.ok){
                return response.json();
            }
            if (response.status === 400){
                return response.json().then(data =>{
                    if(data.message){
                        console.log(data.message);
                    }
                })
            }
        })
        .then(data =>{
            if(data.message){
                alert('Order has been sent..')
                
            }
        })

    }
            

    function Show_order(){
        setShow(true);
        Get_Workplace();
        
        let object = [];
        let Order_list = 
            [
                {name: 'Sort Sække', count: Current_sort_sække_value},
                {name: 'Spandepose', count: Current_Spandepose_value},
                {name: 'Toiletpapir Tork', count: Current_toiletpapir_tork_value},
                {name: 'Toiletpapir', count: Current_toiletpapir_value},
                {name: 'Handsker', count: Current_handsker_value},
                {name: 'Blå Klud', count: Current_blå_klud_value},
                {name: 'Rød Klud', count: Current_rød_klud_value},
                {name: 'Frjebakke Kost', count: Current_frjebakke_og_kost_value},
            ]
    
            for (let item of Order_list) {
                if (item.count > 0) {
                    object.push(`${item.name}: ${item.count} , `);
                    setOrder_list(object);
                    
                }
            }
        
    }
    

    function Cancel_order(){
        setShow(false);
        setReceiver('');
        
    }

    function Send_order(){
        if (Order_list == ''){
            alert('Your order is emty...')
        }
        else{           
            Get_Receiver();
            const timeoutId = setTimeout(() => {
                Sending_order();
                setShow(false);
            }, 500);
            return () => clearTimeout(timeoutId);
            }
    }
    
    

    const Get_sort_sække_total_item = (event) =>{
        setSort_sække_value(event.target.value);
    }
    const Get_spandepose_total_item = (event) =>{
        setSpandepose_value(event.target.value);
    }

    const Get_toiletpapir_tork_total_item = (event) =>{
        setToiletpapir_tork(event.target.value);
    }

    const Get_toiletpapir_total_item = (event) =>{
        setToiletpapir(event.target.value);
    }

    const Get_handsker_total_item = (event) =>{
        setHandsker(event.target.value);
    }

    const Get_blå_klud_total_item = (event) =>{
        setBlå_klud(event.target.value);
    }

    const Get_rød_klud_total_item = (event) =>{
        setRød_klud(event.target.value);
    }

    const Get_frjebakke_og_kostd_total_item = (event) =>{
        setFrjebakke_og_kost_value(event.target.value);
    }

    function Add_sort_sække_to_cart(event){
        
        let get_button_name = (event.target.name); 
        
        if(Sort_sække_value > 0){
                        
            setDefault_item_in_cart(default_item_in_cart + 1);
            alert(`Added Item to Cart" ${default_item_in_cart}`)
            setShow(false);

            let total_value = parseInt(Current_sort_sække_value) + parseInt(Sort_sække_value);
            setCurrent_sort_sække_value(total_value);
            setTotal_sort_sække_value(`${get_button_name}: ${total_value}`);

            setSort_sække_value(0);
         

        }
        else{
            alert('Total Items is Emty...');
        }
    }

    
    function Add_spandepose_to_cart(event){
    
        let get_button_name = (event.target.name);  
        if(Spandepose_value > 0){
                        
            setDefault_item_in_cart(default_item_in_cart + 1);
            alert(`Added Item to Cart" ${default_item_in_cart}`)
            setShow(false);
            
            let total_value = parseInt(Current_Spandepose_value) + parseInt(Spandepose_value);
            setCurrent_Spandepose_value(total_value);
            setTotal_Spandepose_value(`${get_button_name}: ${total_value}`);

            setSpandepose_value(0);
        }
        else{
            alert('Total Items is Emty...');
        }
        
    }

    function Add_toiletpapir_tork_to_cart(event){
      
        let get_button_name = (event.target.name);  
        if(Toiletpapir_tork_value > 0){
                        
            setDefault_item_in_cart(default_item_in_cart + 1);
            alert(`Added Item to Cart" ${default_item_in_cart}`)
            setShow(false);

            let total_value = parseInt(Current_toiletpapir_tork_value) + parseInt(Toiletpapir_tork_value);
            setCurrent_toiletpapir_tork_value(total_value);
            setTotal_toiletpapir_tork_value(`${get_button_name}: ${total_value}`);

            setToiletpapir_tork(0);

        }
        else{
            alert('Total Items is Emty...');
        }
        
    }

    function Add_toiletpapir_to_cart(event){
      
        let get_button_name = (event.target.name);  
        if(Toiletpapir_value > 0){
                        
            setDefault_item_in_cart(default_item_in_cart + 1);
            alert(`Added Item to Cart" ${default_item_in_cart}`)
            setShow(false);

            let total_value = parseInt(Current_toiletpapir_value) + parseInt(Toiletpapir_value);
            setCurrent_toiletpapir_value(total_value);
            setTotal_toiletpapir_value(`${get_button_name}: ${total_value}`);

            setToiletpapir(0);

        }
        else{
            alert('Total Items is Emty...');
        }
        
    }

    function Add_handsker_to_cart(event){
      
        let get_button_name = (event.target.name);  
        if(Handsker_value > 0){
                        
            setDefault_item_in_cart(default_item_in_cart + 1);
            alert(`Added Item to Cart" ${default_item_in_cart}`)
            setShow(false);

            let total_value = parseInt(Current_handsker_value) + parseInt(Handsker_value);
            setCurrent_handsker_value(total_value);
            setTotal_handsker_value(`${get_button_name}: ${total_value}`);

            setHandsker(0);

        }
        else{
            alert('Total Items is Emty...');
        }
        
    }

    function Add_blå_klud_to_cart(event){
      
        let get_button_name = (event.target.name);  
        if(Blå_klud_value > 0){
                        
            setDefault_item_in_cart(default_item_in_cart + 1);
            alert(`Added Item to Cart" ${default_item_in_cart}`)
            setShow(false);

            let total_value = parseInt(Current_blå_klud_value) + parseInt(Blå_klud_value);
            setCurrent_blå_klud_value(total_value);
            setTotal_blå_klud_value(`${get_button_name}: ${total_value}`);

            setBlå_klud(0);

        }
        else{
            alert('Total Items is Emty...');
        }
        
    }

    function Add_rød_klud_to_cart(event){
      
        let get_button_name = (event.target.name);  
        if(Rød_klud_value > 0){
                        
            setDefault_item_in_cart(default_item_in_cart + 1);
            alert(`Added Item to Cart" ${default_item_in_cart}`)
            setShow(false);

            let total_value = parseInt(Current_rød_klud_value) + parseInt(Rød_klud_value);
            setCurrent_rød_klud_value(total_value);
            setTotal_rød_klud_value(`${get_button_name}: ${total_value}`);

            setRød_klud(0);

        }
        else{
            alert('Total Items is Emty...');
        }
        
    }

    function Add_frjebakke_og_kost_to_cart(event){
      
        let get_button_name = (event.target.name);  
        if(Frjebakke_og_kost_value > 0){
                        
            setDefault_item_in_cart(default_item_in_cart + 1);
            alert(`Added Item to Cart" ${default_item_in_cart}`)
            setShow(false);

            let total_value = parseInt(Current_frjebakke_og_kost_value) + parseInt(Frjebakke_og_kost_value);
            setCurrent_frjebakke_og_kost_value(total_value);
            setTotal_frjebakke_og_kost_value(`${get_button_name}: ${total_value}`);

            setFrjebakke_og_kost_value(0);

        }
        else{
            alert('Total Items is Emty...');
        }
        
    }

    return(
        <>
        <Header></Header>
        <section class="py-12 bg-white sm:py-16 lg:py-20 mt-8">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="max-w-md mx-auto text-center">
                    <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">Order Your Products</h2>
                </div>

                <div className="flex justify-center items-center ">
                    
                    <button className="font-bold text-xl"
                        onClick={Show_order}>
                        <img className="w-18 h-16 mt-5  flex justify-center items-center cursor-pointer drop-shadow-sm " src={carticon} alt="" />
                    </button>
                    
                    {Show && (
                        <div className="notification-table absolute bg-white shadow-md rounded-lg p-8 z-50 max-w-2xl w-96">
                            <h2 className="text-4xl font-bold mb-4 text-center">Your Order</h2>
                            <p className="bg-blue-100 pl-5 pr-5 pt-8 pb-8 shadow-lg p-4 mb-4 text-xl font-bold">{Order_list}</p>

                            <label for="workplace_option" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-black">Select Your Workplace</label>
                            <select id="workplace_option" value={WorkPlace_select} onChange={Get_workplace_select} class="mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>

                            <h1 id="receiver" class="hidden">{Receiver}</h1>

                            <div className="flex justify-center  ">
                                <button
                                onClick={Send_order}
                                className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                                >
                                Send
                                </button>
                                <button
                                onClick={Cancel_order}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div class="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
                    <div class="relative group">
                        <div class="overflow-hidden aspect-w-1 aspect-h-1">
                            <img class="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={sort_sække} alt="" />
                        </div>

                        <div class="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Sort Sække
                                    </a>
                                </h3>
                                Total Items: 
                                <input id="sort_sække_total" type="number" class="quantity-input" className="pl-2 border border-black" value={Sort_sække_value} onChange={Get_sort_sække_total_item } max="20"  min="0" ></input>

                                <div class="flex items-center mt-2.5 space-x-px">
                                    <button name="Sort Sække" onClick={Add_sort_sække_to_cart}  className="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="relative group">
                        <div class="overflow-hidden aspect-w-1 aspect-h-1">
                            <img class="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={spandepose} alt="" />
                        </div>
                        <div class="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Spandepose
                                    </a>
                                </h3>
                                Total Items: 
                                <input id="spandepose_total" type="number" class="quantity-input" className="pl-2 border border-black" value={Spandepose_value} onChange={Get_spandepose_total_item}  min="0" max="10">

                                </input>
                                <div class="flex items-center mt-2.5 space-x-px">
                                    <button name="Spandepose" onClick={Add_spandepose_to_cart}  className="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="relative group">
                        <div class="overflow-hidden aspect-w-1 aspect-h-1">
                            <img class="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={toiletpapir_tork} alt="" />
                        </div>
                        
                        <div class="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Toiletpapir Tork    
                                    </a>
                                </h3>
                                Total Items: 
                                <input id="toiletpapir_tork_total" type="number" class="quantity-input" className="pl-2 border border-black" value={Toiletpapir_tork_value} onChange={Get_toiletpapir_tork_total_item} min="0" max="10">

                                </input>
                                <div class="flex items-center mt-2.5 space-x-px">
                                    <button name="Toiletpapir Tork" onClick={Add_toiletpapir_tork_to_cart} className="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="relative group">
                        <div class="overflow-hidden aspect-w-1 aspect-h-1">
                            <img class="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={toiletpapir} alt="" />
                        </div>
                        <div class="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Toiletpapir          
                                    </a>
                                </h3>
                                Total Items: 
                                <input id="toiletpapir_total" type="number" class="quantity-input" className="pl-2 border border-black" value={Toiletpapir_value} onChange={Get_toiletpapir_total_item} min="0" max="10"></input>
                                <div class="flex items-center mt-2.5 space-x-px">
                                    <button name="Toiletpapir" onClick={Add_toiletpapir_to_cart} className="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="relative group">
                        <div class="overflow-hidden aspect-w-1 aspect-h-1">
                            <img class="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={handsker} alt="" />
                        </div>
                        <div class="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Toiletpapir          
                                    </a>
                                </h3>
                                Total Items: 
                                <input id="toiletpapir_total" type="number" class="quantity-input" className="pl-2 border border-black" value={Handsker_value} onChange={Get_handsker_total_item} min="0" max="10"></input>
                                <div class="flex items-center mt-2.5 space-x-px">
                                    <button name="Handsker" onClick={Add_handsker_to_cart} className="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative group">
                        <div class="overflow-hidden aspect-w-1 aspect-h-1">
                            <img class="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={blå_klud} alt="" />
                        </div>
                        <div class="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Toiletpapir          
                                    </a>
                                </h3>
                                Total Items: 
                                <input id="toiletpapir_total" type="number" class="quantity-input" className="pl-2 border border-black" value={Blå_klud_value} onChange={Get_blå_klud_total_item} min="0" max="10"></input>
                                <div class="flex items-center mt-2.5 space-x-px">
                                    <button name="Blå Klud" onClick={Add_blå_klud_to_cart} className="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="relative group">
                        <div class="overflow-hidden aspect-w-1 aspect-h-1">
                            <img class="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={rød_klud} alt="" />
                        </div>
                        <div class="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Toiletpapir          
                                    </a>
                                </h3>
                                Total Items: 
                                <input id="toiletpapir_total" type="number" class="quantity-input" className="pl-2 border border-black" value={Rød_klud_value} onChange={Get_rød_klud_total_item} min="0" max="10"></input>
                                <div class="flex items-center mt-2.5 space-x-px">
                                    <button name="Rød Klud" onClick={Add_rød_klud_to_cart} className="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="relative group">
                        <div class="overflow-hidden aspect-w-1 aspect-h-1">
                            <img class="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125" src={frjebakke_og_kost} alt="" />
                        </div>
                        <div class="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Toiletpapir          
                                    </a>
                                </h3>
                                Total Items: 
                                <input id="toiletpapir_total" type="number" class="quantity-input" className="pl-2 border border-black" value={Frjebakke_og_kost_value} onChange={Get_frjebakke_og_kostd_total_item} min="0" max="10"></input>
                                <div class="flex items-center mt-2.5 space-x-px">
                                    <button name="Frjebakke/Kost" onClick={Add_frjebakke_og_kost_to_cart} className="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        </>

    );
}