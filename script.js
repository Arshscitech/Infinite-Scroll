const imageContainer = document.getElementById('image-container'); 
const loader = document.getElementById('loader'); 

let photosArray = []; 
let ready = false; 
let imagesLoaded = 0; 
let totalImages = 0; 

// Unsplash API 
let count = 5; 
const apiKey = 'RiHFvYxyvNy9yHiARp3TAx4JOjhjceiIcIII6UrueNI';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded 

function changeCount(){
    count = 30; 
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; 
}

function imageLoaded(){
    imagesLoaded++; 
    if (imagesLoaded===totalImages){
        ready = true; 
        loader.hidden = true; 
    }
}

// Helper Function to Set Attributes on DOM Elements

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]); 
    }
}

// Create Elements for Links and Photos, Add to DOM 

function displayPhotos(){
    // Run function for ech object in photosArray
    imagesLoaded = 0;  
    totalImages = photosArray.length; 
    photosArray.forEach((photo) =>{
        // Create <a> to link to Unsplash 
        const item = document.createElement('a'); 

        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank' 
        });

        // Create <img> for photo 
        const img = document.createElement('img'); 
        setAttributes(img, {
            src: photo.urls.regular, 
            alt: photo.alt_description, 
            title: photo.alt_description 
        });

        // Event Listener, check when each is finished loading 
        img.addEventListener('load', imageLoaded); 

        // Put <img> inside <a>, then put both inside imageContainer Element 

        item.appendChild(img); 
        imageContainer.appendChild(item); 
    });
}






// Get photos from Unsplash API 

async function getPhotos(){
    try{
        const response = await fetch(apiURL); 
        photosArray = await response.json(); 
        displayPhotos();
        if (count===5){
            changeCount(); 
        }
    }
    catch (error){
        
    }
}



// Check to see if scrolling near bottom of page, load More Photos

window.addEventListener('scroll', ()=>{
    // winow.innerHeight -> Broswer Window height
    // window.scrollY -> How high we are from top of page
    // document.body.offsetHeight -> Height of an element. We subtract 1000 so that image is load a bit early before bottom

    if (window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready){
        getPhotos(); 
        ready = false; 
    }
})

// OnLoad
getPhotos();