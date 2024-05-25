document.addEventListener('DOMContentLoaded', function () {
    get_user_info();
    get_CheckIn_info();
});

document.getElementById('logout').addEventListener('click', function () {
        sessionStorage.clear();
});


document.getElementById('search_button').addEventListener('click', function(){
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

            customer_list = data.customer;
            manager_list = data.contract_manager;
            employee_list = data.employee;

            const workplaceElement = document.getElementById('workplace');
            const managerElement = document.getElementById('manager');
            const employeeElement = document.getElementById('employee');

            workplaceElement.innerHTML = '';
            managerElement.innerHTML = '';
            employeeElement.innerHTML = '';

            for(i=0; i < customer_list.length; i++){
                const customer = document.createElement('table');
                customer.innerText = customer_list[i];
                document.getElementById('workplace').appendChild(customer);
                workplaceElement.appendChild(customer);
            }

            for(i=0; i < manager_list.length; i++){
                const manager = document.createElement('table');
                manager.innerText = manager_list[i];
                managerElement.appendChild(manager);
            }

            for(i = 0; i < employee_list.length; i++){
                const employee = document.createElement('table');
                employee.innerText = employee_list[i];
                employeeElement.appendChild(employee);
            }

            

            document.getElementById('workplace').innerText = data.customer;
            
            
        }
    })
    

}



function get_user_info() {
    const get_email = sessionStorage.getItem('Email');
    const object_get_email = { 'Email': get_email };

    fetch('http://127.0.0.1:8000/User_info_api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object_get_email)
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(data => {
        if (data.message) {
            const info = data.user_info;
            document.getElementById('name').innerText = sessionStorage.getItem('FullName');
            document.getElementById('email').innerText = info.Email;
            document.getElementById('address').innerText = info.Address;
            document.getElementById('postcode').innerText = info.Postcode;
            document.getElementById('role').innerText = info.Role;
        }
        if (data.error) {
            alert(data.error);
        }
    })
    .catch(() => alert('Server 400, Logout and try again...'));
}

function get_CheckIn_info() {
    const get_email = sessionStorage.getItem('Email');
    const data_object = { "Email": get_email };

    fetch('http://127.0.0.1:8000/CheckIn_info_api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_object),
    })
    .then(response => {
        if (response.ok){
            return response.json();
        }
    })
    .then(data => {
        if (data.checkin_info) {
            checkin_info = data.checkin_info;
            
            
            json_convert = JSON.stringify(checkin_info);
            prase_json = JSON.parse(json_convert);
            for(let i=0; i < prase_json.length; i++){

                let get_items = prase_json[i];
                const location = get_items['Location'];
                const latitude = get_items['Latitude'];
                const longitude = get_items['Longitude'];
                const checkIn_time = get_items['CheckIn_time'];

                const paragraph_location = document.createElement('tr');
                const paragraph_latitude = document.createElement('tr');
                const paragraph_longitude = document.createElement('tr');
                const paragraph_checkIn_time = document.createElement('tr');

                paragraph_location.textContent = location;
                paragraph_latitude.innerText = latitude;
                paragraph_longitude.innerText = longitude;
                paragraph_checkIn_time.innerText = checkIn_time;

                document.getElementById('location').appendChild(paragraph_location);
                document.getElementById('latitude').appendChild(paragraph_latitude);
                document.getElementById('longitude').appendChild(paragraph_longitude);
                document.getElementById('checkIn_time').appendChild(paragraph_checkIn_time);                    
            }
                       
        
        }
    })
    .catch(() => alert('Server 400, Logout and try again...'));
}