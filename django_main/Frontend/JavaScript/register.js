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
        
        /// Make the password hash

        if (password != Confirm_Password){
            alert('Confirm Password not Match !')
        }
        
        else{
            fetch("http://127.0.0.1:8000/register_api/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(data),
        })
        
        .then(response => {
            console.log('Response status:', response.status);
            if (response.ok) {
                return response.json().then(data => {
                    alert(data.message)
                    window.location.href = 'login.html';
                })
            }
            if (response.status === 400) {
                return response.json().then(data => {
                    alert(data.message); // Alert the error message from backend
                });
            }
            alert('Register failed, Try again...')
            throw new Error("Register failed");
        })
        .catch(error => {
            console.error(error); 
        });
        
        
        }
        

    });