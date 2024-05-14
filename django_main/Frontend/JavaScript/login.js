

const form = document.getElementById('login_form');


    form.addEventListener('submit', event =>{
        event.preventDefault();
        const formData = new FormData(form);

        
        // Create JSON format
        const data = Object.fromEntries(formData);
        console.log(data);
     

        fetch("http://127.0.0.1:8000/login/",{
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
                window.location.href = 'main_page.html';                
                
                if (data.FullName){
                    
                    alert('Wellcome ' + data.FullName);
                    sessionStorage.setItem('fullName', data.FullName);//store the FullName in the sessionStorage     
                }
                
            })
            .catch(error => {
                console.error(error); 
            });
    });
