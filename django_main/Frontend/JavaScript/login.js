

const form = document.getElementById('login_form');


    form.addEventListener('submit', event =>{
        event.preventDefault();
        const formData = new FormData(form);

        
        // Create JSON format
        const data = Object.fromEntries(formData);
      
     
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
                window.location.href = 'main_page.html';                
                
                if (data.FullName){
                    sessionStorage.setItem('FullName', data.FullName);//store the FullName in the sessionStorage     
                    
                    sessionStorage.setItem('useremail', data.useremail);
                    sessionStorage.setItem('useraddress', data.useraddress);
                    sessionStorage.setItem('userrole', data.userrole);
                }
                
            })
            .catch(error => {
                console.error(error); 
            });
    });
