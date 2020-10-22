const api_key = 'rxfavOxSlJLbLWKUthAoaUR2K2XwALYOj0xGUzc7';
let main = document.querySelector('#main'),
    paramDay = document.querySelector('#param_day'),
    paramCamera = document.querySelector('#param_camera'),
    paramRover = document.querySelector('#param_rover'),
    search = document.querySelector('#search'),
    mars_photos = document.querySelector('#mars_photos');

let date = new Date().toISOString().slice(0, 10);
//console.log(date);
paramDay.setAttribute('value', date);

console.log('значение даты: ' + paramDay.value);

let selectors = [
    {
        name: 'curiosity',
        cameras: [
            {
                title: 'Front Hazard Avoidance Camera',
                abbr: 'FHAZ'
            },
            {
                title: 'Rear Hazard Avoidance Camera',
                abbr: 'RHAZ'
            },
            {
                title: 'Mast Camera',
                abbr: 'MAST'
            },
            {
                title: 'Chemistry and Camera Complex',
                abbr: 'CHEMCAM'
            },
            {
                title: 'Mars Hand Lens Imager',
                abbr: 'MAHLI'
            },
            {
                title: 'Mars Descent Imager',
                abbr: 'MARDI'
            },
            {
                title: 'Navigation Camera',
                abbr: 'NAVCAM'
            }
        ]
    },
    {
        name: 'opportunity',
        cameras: [
            {
                title: 'Front Hazard Avoidance Camera',
                abbr: 'FHAZ'
            },
            {
                title: 'Rear Hazard Avoidance Camera',
                abbr: 'RHAZ'
            },
            {
                title: 'Navigation Camera',
                abbr: 'NAVCAM'
            },
            {
                title: 'Panoramic Camera',
                abbr: 'PANCAM'
            },
            {
                title: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
                abbr: 'MINITES'
            }
        ]
    },
    {
        name: 'spirit',
        cameras: [
            {
                title: 'Front Hazard Avoidance Camera',
                abbr: 'FHAZ'
            },
            {
                title: 'Rear Hazard Avoidance Camera',
                abbr: 'RHAZ'
            },
            {
                title: 'Navigation Camera',
                abbr: 'NAVCAM'
            },
            {
                title: 'Panoramic Camera',
                abbr: 'PANCAM'
            },
            {
                title: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
                abbr: 'MINITES'
            }
        ]
    }
];

//console.log(selectors);

function generateRover(){
    //console.log(selectors[0].name);
    selectors.forEach((item) => {
        //console.log(item.name);
        let roverOption = document.createElement('option');
        roverOption.value = item.name;
        roverOption.innerText = item.name;
        roverOption.setAttribute('data-item', item);
        paramRover.appendChild(roverOption);
    });

    generateCameras('curiosity');
}
generateRover();

function generateCameras(roverName){

    console.log('получаем параметр: ' + roverName);

    let index = selectors.findIndex(item => item.name === roverName);

    paramCamera.innerHTML = '';
    selectors[index].cameras.forEach((i) => {
        let cameraOption = document.createElement('option');
        cameraOption.value = i.abbr;
        cameraOption.innerText = i.title;
        paramCamera.appendChild(cameraOption);
    });

}


/* смена даты */
paramDay.addEventListener('change', () => {
    console.log(paramDay.value);
});
/* смена камеры */
paramCamera.addEventListener('change', () => {
    console.log(paramCamera.value);
});
/* смена марсохода */
paramRover.addEventListener('change', () => {
    console.log(paramRover.value);
    generateCameras(paramRover.value);
});

search.addEventListener('click', () => {
    console.log('жмакнули на кнопку');
    getNasaBg(paramDay.value);
    getNasaMars(paramCamera.value, paramDay.value, paramRover.value);
});

function getNasaBg(day) {
    fetch(`https://api.nasa.gov/planetary/apod?date=${day}&api_key=${api_key}`).then(function (response){
        return response.json();
    }).then(function (obj){
        //console.log(obj);
        //ставим фон при клике на кнопочку
        main.setAttribute('style', 'background-image:url(' + obj.url + ');');
    }).catch(function (error){
        console.error('чтото прошло не так!');
        console.error(error);
    });
}

//запускаем функцию и передаем в нее параметры для фона по умолчанию на текущий день
getNasaBg(paramDay.value);

function getNasaMars(camera, earthDate, rover){
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?camera=${camera}&earth_date=${earthDate}&api_key=${api_key}`).then(function (response){
        return response.json();
    }).then(function (obj){
        console.log(obj);
        console.log('сколько всего фоток: ' + obj.photos.length);
        if(obj.photos.length > 25){
            mars_photos.innerHTML = '';
            function selectRandom(show, min, max){

                let arrrr = [];

                for(let i = 0; i < show; i++){
                    let random = Math.floor(Math.random() *  max);
                    arrrr.unshift(random);
                }
                arrrr.forEach((item) => {
                    mars_photos.innerHTML += `<div class="main__block_item" data-id="${obj.photos[item].id}" data-date="${obj.photos[item].earth_date}" data-rover="${obj.photos[item].rover.name}" data-camera="${obj.photos[item].camera.name}"><img src="${obj.photos[item].img_src}" alt=""></div>`;
                });

            }
            selectRandom(25, 0, obj.photos.length);
            console.log('фоток больше 25');
        }else if(obj.photos.length > 0 && obj.photos.length < 26){
            mars_photos.innerHTML = '';

            for(let i = 0; i < 25; i++){
                mars_photos.innerHTML += `<div class="main__block_item" data-id="${obj.photos[i].id}" data-date="${obj.photos[i].earth_date}" data-rover="${obj.photos[i].rover.name}" data-camera="${obj.photos[i].camera.name}"><img src="${obj.photos[i].img_src}" alt=""></div>`;
            }
            console.log('фоток меньше 25');


        }else if(obj.photos.length === 0){
            mars_photos.innerHTML = '<div class="main__block_empty">К сожалению фотографий нет! <br>Выберите другие параметры</div>';
        }


    }).catch(function (error){
        console.error('чтото прошло не так!');
        console.error(error);
    });
}
getNasaMars('MAST', '2020-03-06', 'curiosity');








