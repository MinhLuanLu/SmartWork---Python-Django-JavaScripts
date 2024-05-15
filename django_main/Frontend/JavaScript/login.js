

const form = document.getElementById('login_form');


    form.addEventListener('submit', event =>{
        event.preventDefault();
        const formData = new FormData(form);

        
        // Create JSON format
        const data = Object.fromEntries(formData);
        console.log(data);
     
        const fetch_url = "http://127.0.0.1:8000/login/";

        fetch(fetch_url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(data),
        })
        
        .then(response => {
                if (response.ok) {
                    return response.json(); 
                    
                } else {
                    alert('Login failed, Try again...')
                    throw new Error("Login failed");
                }
            })
            .then(data => {
                
                alert(data.message); 
                window.location.href = 'checkIn.html';                
                
                if (data.FullName){
                    sessionStorage.setItem('fullName', data.FullName);//store the FullName in the sessionStorage     
                }
                
            })
            .catch(error => {
                console.error(error); 
            });
    });
