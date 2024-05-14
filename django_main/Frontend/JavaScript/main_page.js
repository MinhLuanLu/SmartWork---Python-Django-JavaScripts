document.addEventListener('DOMContentLoaded', function() {
    // Retrieve FullName from sessionStorage
    
    let fullname = sessionStorage.getItem('fullName');
    document.getElementById('FullName').textContent = fullname;
});


document.getElementById('checkin').addEventListener('click', function(){

    if ("geolocation" in navigator) {
    // Geolocation available
    navigator.geolocation.getCurrentPosition(function(position) {
    // Get latitude and longitude
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Display latitude and longitude
    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;

    //Display datetime
    const datetime = new Date();
    date = datetime.getDate();
    month = datetime.getMonth();
    year = datetime.getFullYear();
    hours = datetime.getHours();
    minutes = datetime.getMinutes();
    seconds = datetime.getSeconds();
    checkIn_time = `${hours}:${minutes}:${seconds}   ${date}/${month}/${year}`;

    document.getElementById('checkIn_time').textContent = checkIn_time;
    

    

    

    // Display map
    var mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 10
        };

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
                
    let marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map
        })
    });
    } else {
        // Geolocation not available
        alert("Geolocation is not supported by your browser");
        }
    });
        

