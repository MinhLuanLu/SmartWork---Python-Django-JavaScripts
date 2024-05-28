    
    
    const get_fullname = sessionStorage.getItem('FullName');
    if (get_fullname == null){
        window.location.href = 'login.html';
    }
    const get_email = sessionStorage.getItem('Email');
    const get_customer = sessionStorage.getItem('workplace');
    const get_order_list = sessionStorage.getItem('order_list'); //type string


    const order_object = document.getElementById('order_object');
    
    convert_orderlist_to_object = JSON.parse(get_order_list); //type Object

    for(items in convert_orderlist_to_object){
        let paragraph = document.createElement('li'); 
        paragraph.innerText = convert_orderlist_to_object[items];
        order_object.appendChild(paragraph);
    }

    document.getElementById('place_order').addEventListener('click',function(){

        const get_employee_list = sessionStorage.getItem( 'employee_list');
        const get_manager_list = sessionStorage.getItem('Manager');

        if(get_manager_list == null){
            alert('You must to search for your workplace..')
        }
        
        if (!get_employee_list.includes(get_fullname)) {
            alert(`Base on our system. You [${get_fullname}] are not working at ${get_customer}`);
        } 

        else{

            order_data = [{
                'Receiver': get_manager_list,
                'Sender': get_fullname,
                'Workplace': get_customer,
                'Order_items': convert_order_object
            }]
            alert('Your Order has been sendt');
            sessionStorage.removeItem('employee_list');
            sessionStorage.removeItem('Manager');
            sessionStorage.removeItem('order_object');
            window.location.href = 'product.html';
        }
        
            
        
    })

    document.getElementById('search_btn').addEventListener('click',function(){
        search_data();
    })


    function search_data(){
    const get_email = sessionStorage.getItem('Email');
    let search_data = document.getElementById('search').value;

    email_object = {'Email': get_email, "Search_data": search_data}

    fetch('http://127.0.0.1:8000/Assignment_api/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email_object)
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
        if (data.message){
            document.getElementById('search').value = '';
    
            manager_list = data.contract_manager;
            if(data.customer){
                sessionStorage.setItem('workplace', data.customer);
                
            }
            
            if(data.employee){
                employee_list = JSON.stringify(data.employee);
                sessionStorage.setItem('employee_list', employee_list);
            }

            const managerElement = document.getElementById('manager');
    
            managerElement.innerHTML = '';

            for(i=0; i < manager_list.length; i++){
                const manager = document.createElement('li');
                manager.innerText = manager_list[i];
                managerElement.appendChild(manager);
                document.getElementById('send_to_manager_text').style.display = 'inline-block';
                sessionStorage.setItem('Manager',manager_list);
            }   
        }
    }) 
    }

    document.getElementById('logout').addEventListener('click',function(){
        sessionStorage.clear();
    })