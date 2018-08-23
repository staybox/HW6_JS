/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

let towns;


/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET','https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () =>{
            if(xhr.status >= 400){
                    reject();
            }else {
                let towns = xhr.response.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
                resolve(towns);
            }
        });
        xhr.addEventListener('error', () => {
            reject();
        });
        xhr.send();
    })
}

function initTownsLoading() {
    loadTowns()
        .then((response) => {
            towns = response;
            loadingBlock.style.display = "none"; filterBlock.style.display = "block"})
        .catch(() => {
            loadingBlock.innerHTML = 'Загрузка не удалась';
            let button = document.createElement("BUTTON");
            let br = document.createElement("br");
            button.textContent = 'Повторить загрузку';
            loadingBlock.appendChild(br);
            loadingBlock.appendChild(button);
            button.addEventListener('click',()=>{
                initTownsLoading();
            });
        });
}
initTownsLoading();
/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) > -1;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');



filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    let input = filterInput.value;

    filterResult.innerHTML = '';

    for(let i of towns){
            if(isMatching(i.name, input)){
                filterResult.innerHTML += `<div>${i.name}</div>`;
            }
        }

        if(input === ''){
            filterResult.innerHTML = '';
        }

});

export {
    loadTowns,
    isMatching
};









/*
function loadTowns() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            let towns = xhr.response.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        });
    xhr.send();
}*/

// Рабочий код
/*
filterResult.innerHTML = '';
if (input !== ''){
    for(let i of towns){
        if(isMatching(i.name, input)){
            filterResult.innerHTML = i.name;
        }
    }
}else {
    for(let i of towns){
        let div = document.createElement("div");
        //div.value = i.name;
        div.innerText = i.name;
        filterResult.appendChild(div);
    }
}*/