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
            
        
        const fetch_url = "http://127.0.0.1:8000/register_api/";

        fetch(fetch_url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
            body: JSON.stringify(data),
        })
        
        .then(async response => {
            console.log('Response status:', response.status);
            if (response.ok) {
                window.location.href = 'login.html';

                return await response.json().then(data => {
                    if (data.message){
                        alert(data.message)
                        
                    }
                })
            }
            if (response.status === 400) {
                return await response.json().then(data => {
                    alert(data.message); // Alert the error message from backend
                });
            }
            alert('Register failed, Try again...')
            throw new Error("Register failed");
        })
        .catch(error => {
            console.error(error); 
        });
        
        
        

    });