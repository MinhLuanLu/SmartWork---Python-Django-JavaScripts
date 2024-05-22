function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateLiveTime() {
    const liveTimeText = document.getElementById('liveTime');
    const now = new Date();
    liveTimeText.textContent = formatTime(now);
}

updateLiveTime();
setInterval(updateLiveTime, 1000); 

const getLocation = sessionStorage.getItem('Location');
const getcheckin_time = sessionStorage.getItem('checkin_time');
const fullname = sessionStorage.getItem('FullName');

document.getElementById('fullname').innerText = fullname;



if (getLocation && getcheckin_time){
    
    document.getElementById('location_div').style.display = 'block';
    document.getElementById('checkin_time_div').style.display = 'block';
    document.getElementById('checkIn_text').style.display = 'none';
    document.getElementById('location').innerText = getLocation;
    document.getElementById('checkin_time').innerText = getcheckin_time;
}


document.getElementById('checkin_button').addEventListener('click', function(){
    window.location.href = 'checkIn.html';
})


document.getElementById('logout').addEventListener('click', function(){
    sessionStorage.clear();
 })
