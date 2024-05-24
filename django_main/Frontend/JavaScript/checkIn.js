document.addEventListener('DOMContentLoaded', function() {
    // Retrieve FullName from sessionStorage From Login Page
    let fullname = sessionStorage.getItem('FullName');
    if (fullname) {
        document.getElementById('FullName').textContent = fullname;
    }

    
});

function showNotification() {
    var notification = document.getElementById("notification");
    notification.classList.add("show");
    setTimeout(function(){
        notification.classList.remove("show");
    }, 2000); // Hide after 3 seconds
}

function get_location(lat, long) {
    const location_api = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
    fetch(location_api)
        .then(res => res.json())
        .then(data => {
            if (data){
                // Display latitude and longitude,city,countryName
                console.log('got your Loaction successfully')
                document.getElementById("your_location").textContent = `${data.city}/${data.countryName}`;
                let Location = `${data.city}/${data.countryName}`;
                sessionStorage.setItem('Location', Location);

                
            }
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
        });
}

function fetch_dataform_to_api(){
    var checkInData = []; // Array to store the fetched data

    // Fetching data to Array
    checkInData.push(["FullName", document.getElementById("FullName").innerText]);
    checkInData.push(["Location", document.getElementById("your_location").innerText]);
    checkInData.push(["Latitude", document.getElementById("latitude").innerText]);
    checkInData.push(["Longitude", document.getElementById("longitude").innerText]);
    checkInData.push(["CheckIn_time", document.getElementById("checkIn_time").innerText]);
    
    // Convert array to object
    var data_form = {};
    checkInData.forEach(function(item) {
        data_form[item[0]] = item[1];
    });
    console.log("Check In Data:", data_form);
    
    ///fetch the object to API
   

    fetch('http://127.0.0.1:8000/CheckIn_api/', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_form),

    })
    .then(response =>{
        if (response.ok){
            return response.json().then(data =>{
                if (data.message){
                    console.log(data.message);
                    showNotification();  
                    window.location.href = 'main_page.html'; 
                    
                }

            })
        }
        if(response.status === 400){
            return response.json().then(data => {
                alert(data.message)
            })

        }
        alert('Register failed, Try again...')
        throw new Error("CheckIn failed");
    })

    .catch(error =>{
            
            alert(' Server 400, Logout and try again...')
    })
}



document.getElementById('checkin').addEventListener('click', event => {
    event.preventDefault();
    if ("geolocation" in navigator) {

        document.getElementById('confirmCancelButtons').style.display = 'block'; //Display the button when click
        document.getElementById('checkin').style.display = 'none'; //remove the button when click

        // Geolocation available
        navigator.geolocation.getCurrentPosition(function(position) {
            // Get latitude and longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Display datetime
            const datetime = new Date();
            const date = datetime.getDate();
            const month = datetime.getMonth() + 1; // Months are zero-based
            const year = datetime.getFullYear();
            const hours = datetime.getHours();
            const minutes = datetime.getMinutes();
            const seconds = datetime.getSeconds();
            const checkIn_time = `${hours}:${minutes}:${seconds} ${date}/${month}/${year}`;
            sessionStorage.setItem('checkin_time', checkIn_time);
        

    

            document.getElementById("latitude").textContent = latitude;
            document.getElementById("longitude").textContent = longitude;
            document.getElementById('checkIn_time').textContent = checkIn_time;

            get_location(latitude,longitude)
            
            

                
            
            // Display map
            const mapOptions = {
                center: { lat: latitude, lng: longitude },
                zoom: 15
            };

            let map = new google.maps.Map(document.getElementById("map"), mapOptions);

            let marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map
            });
        }, function(error) {
            console.error('Geolocation error:', error);
        });
    } else {
        // Geolocation not available
        alert("Geolocation is not supported by your browser");
    }
});





document.getElementById('confirmCheckin').addEventListener('click', event=>{
    event.preventDefault();
    fetch_dataform_to_api();
    
    /// Add more
})

document.getElementById('cancelCheckin').addEventListener('click', event=>{
    event.preventDefault();
    document.getElementById('confirmCancelButtons').style.display = 'none';  //remove the button when click
    document.getElementById('checkin').style.display = 'block'; //Display the button when click
    
})