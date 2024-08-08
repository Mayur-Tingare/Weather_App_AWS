const usertab=document.querySelector("[data-user_weather]");
const searchtab=document.querySelector("[data-search_weather]");
const usercontainer=document.querySelector("weather-contaier");
const grantaceescontainer = document.querySelector(".grant-location");
const searchform=document.querySelector("[data-serachform]");
const loadingscreen=document.querySelector(".loading-container");
const userinfocontiner=document.querySelector(".user-info-container");


// initial var's

let oldtab=usertab;


oldtab.classList.add("current-tab");

//ek kaam pending

getfromSessionStorage();

//hogya kaam


function switchTab(newtab){
    if(newtab!=oldtab){
        oldtab.classList.remove("current-tab");
        oldtab=newtab;
        oldtab.classList.add("current-tab");

        if(!searchform.classList.contains("active")){
            // make search from visible
            userinfocontiner.classList.remove("active");
            grantaceescontainer.classList.remove("active");
            searchform.classList.add("active");
        }
        else{
            // main search pe tha ab your wether tab visible krna hai

            searchform.classList.remove("active");
            userinfocontiner.classList.remove("active");

            // display weather data from local storage
            getfromSessionStorage();

        }
    }
}

usertab.addEventListener('click',()=>{
    // pass clicked tab as input
    switchTab(usertab);
})

searchtab.addEventListener('click',()=>{
    // pass clicked tab as input
    switchTab(searchtab);
})

function getfromSessionStorage(){
    // check if coordinates are laredy present in session storage

    const localCoordinates=sessionStorage.getItem("user-coordinates");

    if(!localCoordinates){
        // agar local nahi mile
        grantaceescontainer.classList.add("active");

    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchuserweatherinfo(coordinates);
    }

}

async function fetchuserweatherinfo(coordinates){
    const {lat,lon}=coordinates;

    // make grant contaoner invisible
    grantaceescontainer.classList.remove("active");

    //make loader visible

    loadingscreen.classList.add("active");

    //API call
    try{
        const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);

        const data=await res.json();

        loadingscreen.classList.remove("active");

        userinfocontiner.classList.add("active");

        renderweatherinfo(data);


    }
    catch(err){
        loadingscreen.classList.remove("active");
        console.log("Ye wala error aaya hai",err);
    }


}

function renderweatherinfo(weatherinfo){
    // fetch the elements

    const cityName=document.querySelector("[data-cityname]");
    const counrtyIcon=document.querySelector("[data-counteryicon]");
    const desc=document.querySelector("[data-wetherdesc]");
    const weatherIcon=document.querySelector("[data-weathericon]");
    const temp=document.querySelector("[data-temperature]");
    const windSpeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    // fetch and put

    console.log(weatherinfo);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherinfo?.name;
    counrtyIcon.src = `https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherinfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherinfo?.main?.temp} °C`;
    windSpeed.innerText = `${weatherinfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherinfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherinfo?.clouds?.all}%`;


}

const grantaccessbtn=document.querySelector("[data-grantAccess]");

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        alert("No support Available");
    }
}

function showPosition(position){
    const usercoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude

    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(usercoordinates));
    fetchuserweatherinfo(usercoordinates);
}

grantaccessbtn.addEventListener("click",getlocation);

const searchinput=document.querySelector("[data-searchinput]");

searchform.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName=searchinput.value;
    console.log(cityName); 

    if(cityName===""){
        return;
    }
    else{
        fetchsearchweatherinfo(cityName);
    }
})

async function fetchsearchweatherinfo(city){
    loadingscreen.classList.add("active");
    userinfocontiner.classList.remove("active");
    grantaceescontainer.classList.remove("active");

    try{
        console.log("ye hai niche city");
        console.log(city);
        const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);

        const data =await res.json();
        console.log(data);

        loadingscreen.classList.remove("active");

        userinfocontiner.classList.add("active");
        renderweatherinfo(data);

    }
    catch(err){
        console.log("Yaha aa kr fas gaye");

    }
}










































// function renderinfo(data){
//     console.log("Called successfully");
//     let newpara=document.createElement('p');
    
//     newpara.textContent=`${data?.main?.temp.toFixed(2)} C`;

//     document.body.appendChild(newpara);
// }


// async function showweather(){

//     try{
      
    
//         let city_name='pandharpur';
        
//         const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`);
    
//         const data=await response.json();
//         console.log("Weather data->", data);
//         console.log("About to call renderinfo with data:", data);
//         renderinfo(data);
        
//     }
//     catch (e){
//         console.log("Error Encounterd And Catched !")
//     }



    
   
// }

// async function getfromlatlan(){
//     try{
//         let lat=15.2332;
//     let lon=23.4567;

//     let result=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);

//     let data1=await result.json();
//     console.log(data1);

//     }

//     catch(e){
//         console.log("error aaya he ye wala ->",e);
//     }
    
// }

// function switchTab(newTab) {
//     if(newTab != oldTab) {
//         oldTab.classList.remove("current-tab");
//         oldTab = newTab;
//         oldTab.classList.add("current-tab");

//         if(!searchForm.classList.contains("active")) {
//             //kya search form wala container is invisible, if yes then make it visible
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }
//         else {
//             //main pehle search wale tab pr tha, ab your weather tab visible karna h 
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//             //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
//             //for coordinates, if we haved saved them there.
//             getfromSessionStorage();
//         }
//     }
// }

// function getlocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showposition);

//     }
//     else{
//         console.log("No function support");
//     }
// }

// function showposition(position){
//     let lat1=position.coords.latitude;
//     let long1=position.coords.longitude;

//     console.log(lat1);
//     console.log(long1);
// }
