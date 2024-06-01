document.addEventListener('DOMContentLoaded', function () {
    const get_role = sessionStorage.getItem('user_role');
    const get_fullname = sessionStorage.getItem('FullName');
    if(get_fullname == null){
        window.location.href = 'login.html';
    }

    if(get_role == 'Manager'){
        document.getElementById('order').style.display = 'none';
        document.getElementById('decline').style.display = 'inline-block';

    }
    get_request();
    
}) 

let get_fullname = sessionStorage.getItem('FullName');
let list_object = {"FullName": get_fullname, 'Status': 'Waiting'};

function approved_order(api_url,order){
    fetch(api_url,{
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


function get_request(){
    fetch('http://127.0.0.1:8000/Post_order_api/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(list_object)
            
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
    .then(data=>{
        if(data.message){
            list = {}
            const container = document.getElementById('container');
            const order_list = data.message;
            for (let i = 0; i < order_list.length; i++){
                sender = order_list[i]['Sender'];
                workplace = order_list[i]['Workplace'];
                order_items = order_list[i]['Order_items'];
                order_status = order_list[i]['Order_status'];
                order_time = order_list[i]['Order_time'];

                let order = `Sender: ${sender} From ${workplace}: Order: ${order_items} - Order Status: ${order_status} - Order Time: ${order_time}`;

                const p = document.createElement('button')
                p.innerText = order;
                p.id = 'order_container'
                container.appendChild(p);

                const approve_btn = document.createElement('button');
                approve_btn.innerText = 'Approve';
                approve_btn.id = 'approve-button' ;
                approve_btn.type = 'button';
                p.appendChild(approve_btn);

                const decline_btn = document.createElement('button');
                decline_btn.innerText = 'Decline';
                decline_btn.id = 'decline_button';
                decline_btn.type = 'button';
                p.appendChild(decline_btn);

                approve_btn.addEventListener('click', function() {
        
                    approved_order('http://127.0.0.1:8000/Approved_order_api/', order_list[i])
                });

                decline_btn.addEventListener('click', function() {
                    
                    approved_order('http://127.0.0.1:8000/Decline_order_api/', order_list[i])
                });

            }

        }
    })
}