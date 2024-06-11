import { useState } from "react";
import React from "react";
import workplaceicon from '../assets/images/workplaceicon.png';
import managericon from '../assets/images/managericon.png';
import employeeicon from '../assets/images/employeeicon.png';




export default function Workplace_table (){
    const [Search_data, setSearch_data] = useState('')
    const getEmail = sessionStorage.getItem('Email');
    const [Address, setAddress] = useState('');
    const [Manager, setManager] = useState('');
    const [Employee, setEmployee] = useState('');
    const [Workplace, setWorkplace] = useState('');
  

    const get_seach_data = (event) =>{
        setSearch_data(event.target.value);
    
    };

    
    
    
    async function fetchSearch_data(){
        
        let emty = document.getElementById('search_data').value;
        if(emty == ''){
            alert('Please Insert Your WorkPlace Name...')
        }
        document.getElementById('search_data').value = '';
        
        const endpoint = `${import.meta.env.VITE_API_URL}api/Assignment`;
        const data = {"Email": getEmail, "Search_data": Search_data};

        await fetch(endpoint, {
            method: 'POST',
            headers:
            {
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
                        alert(data.message);
                    }
                })
            }
        })
        .then(data =>{
            if(data.message){
                const getAddress = sessionStorage.getItem('Address');
                setAddress(getAddress);
                setManager(data.info['contract_manager'])
                setWorkplace(data.info['customer']);
                setEmployee(data.info['employee']);

                const employee = data.info['employee'];

                const clear_Element = document.getElementById('employee');
                clear_Element.innerHTML = '';

                for (let i = 0; i < employee.length; i++){
                    const create = document.createElement('tr')
                    create.innerText = employee[i];
                    document.getElementById('employee').appendChild(create);
                }
            }
        })
        
    }
    

    return(
        <>  
        
            <div class="flex flex-col items-center px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="mb-4 w-full flex justify-center items-center">
                    <input onChange={get_seach_data} type="text" id="search_data" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 ps-10 p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2" placeholder="Search your workplace.." />
                    <button onClick={fetchSearch_data} type="button" class="text-white bg-gray-600 dark:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Search</button>
                </div>

                <div class="w-full flex justify-start">
                    <div class="w-[calc(24rem+1.25rem+3rem)] flex flex-col ml-8 mt-2">
                        <div class="flex items-center mt-2 mb-5 border border-black p-2">
                            <img class="flex-shrink-0 text-blue-600 w-9 h-9 font-semibold border border-black" src={workplaceicon} alt="Status icon" />
                            <div class="ml-5 flex items-center w-full">
                                <h3 class="text-xl font-semibold text-black ">Workplace:</h3>
                                <p class=" text-red-600 text-xl font-semibold text-4xl ml-3 w-auto ">{Workplace}</p>
                            </div>
                        </div>

                        <div class="flex items-center mt-2 mb-5 border border-black p-2">
                            <img class="flex-shrink-0 text-blue-600 w-9 h-9 font-semibold border border-black" src={managericon} alt="Status icon" />
                            <div class="ml-5 flex items-center w-full">
                                <h3 class="text-xl font-semibold text-black">Manager:</h3>
                                <p class="text-xl text-red-600 font-semibold text-4xl ml-3 w-auto">{Manager}</p>
                            </div>
                        </div>

                        <div class="flex items-center mt-2 mb-5 border border-black p-2">
                            <img class="flex-shrink-0 text-blue-600 w-9 h-9 font-semibold border border-black" src={employeeicon} alt="Status icon" />
                            <div class="ml-5 flex items-center w-full">
                                <h3 class="text-xl font-semibold text-black">Employee:</h3>
                                <p id="employee" class="text-base text-red-600 font-semibold text-4xl ml-3 w-auto"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );

}