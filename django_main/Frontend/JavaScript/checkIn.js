document.addEventListener('DOMContentLoaded', function() {
    // Retrieve FullName from sessionStorage From Login Page
    let fullname = sessionStorage.getItem('fullName');
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
                document.getElementById("your_location").textContent = data.city + data.countryName;
                showNotification()
            }
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
        });
}

document.getElementById('checkin').addEventListener('click', function() {
    if ("geolocation" in navigator) {
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

            document.getElementById("latitude").textContent = latitude;
            document.getElementById("longitude").textContent = longitude;
            document.getElementById('checkIn_time').textContent = checkIn_time;

            get_location(latitude,longitude)
            
            // Display map
            const mapOptions = {
                center: { lat: latitude, lng: longitude },
                zoom: 10
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
