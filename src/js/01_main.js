document.addEventListener('DOMContentLoaded', ()=> {

    
    const   switchersWrapper = document.querySelector('.slide__switch-menu'),
            switchers = document.querySelectorAll('.slide__service-logo_wrapper'),
            slide = document.querySelector('.slide'),
            slideBgTransitions = document.querySelectorAll('.slide__wrapper-bg-transition');


    const slidersDB = {
        pics: {
            wrapperClass: '.slide__pic_wrapper',
            elemClasses: ['slide__pic', 'slide__pic-'],
        },
        titles: {
            wrapperClass: '.slide__head-title_wrap',
            elemClasses: ['slide__head-title', 'slide__head_title-', 'add-opacity', 'translate-new-title'],
            content: {
                1: 'DugWap',
                2: 'Juddy',
                3: 'BuyMedia',
                4: 'WMPlayer',
                5: 'PushADS'
            }
        },
        logos: {
            wrapperClass: '.slide__head-logo_wrap',
            elemClasses: ['slide__head-logo', 'slide__head-logo-', '--svg__slide-head-logo-'],
        },
        descr: {
            wrapperClass: '.slide__descr_wrapper',
            elemClasses: ['slide__descr', 'slide__descr-', 'add-opacity'],
            content: {
                1: 'Регистрация на проекте более не производится. А если вам интересен wapclick и всё, что с ним связано - ждём вас в Juddy! А за трафиком - заходите в Buymedia!',

                2: 'Монетизация трафика с помощью 1-click, pin-submit, etc. После регистрации назови менеджеру тайное слово «Дайпять» и получи +5% к ребилльной ставке на целый месяц!',

                3: 'Рекламная сеть с лучшим 18+ трафиком: Preroll, In-page, ClickUnder. Широкий функционал. По промокоду «BMtop» + 5% к первому пополнению!',

                4: 'Кастомный видеоплеер с широкой палитрой инструментов для настройки персонализации. Бонус - не требует знаний программирования.',

                5: 'Проект PushAds работает в приватном режиме. Регистрация новых пользователей временно приостановлена.'
            }
        },
        links: {
            wrapperClass: '.slide__switch-menu_wrap',
            elemClasses: ['slide__button'],
            href: {
                1: '#',
                2: 'https://juddy.biz/',
                3: 'https://buymedia.biz/',
                4: 'https://wmplayer.biz/',
                5: 'https://pushads.biz/',
            }
        },
        planet: {
            wrapperClass: '.slide__planet-wrapper',
            elemClasses: ['slide__bg-planet']
        }
    };


//===========ФУНКЦИЯ ДЛЯ СОЗДАНИЯ СЛАЙДА С НУЖНЫМИ КЛАССАМИ==========

function createSlide(slideClasses, numberOfSlide, slideContent) {
    const slide = document.createElement('div');
            slideClasses.forEach(item => {
                item[item.length-1] === '-' ? slide.classList.add(`${item+numberOfSlide}`) : slide.classList.add(item)
            });
            if(slideContent){slide.innerHTML = slideContent[numberOfSlide];}

            return slide;
}

//===========ПРОВЕРКА НА ТО, ЯВЛЯЕТСЯ ЛИ УСТРОЙСТВО ТЕЛЕФОНОМ/ПЛАНШЕТОМ==========

function hasTouchDevice() {
    return !!('ontouchstart' in window || navigator.maxTouchPoints);
  }

//===========ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ ЭЛЕМЕНТА ПРЕДЫДУЩЕГО СЛАЙДА==========

function removePrevSlideWithTimeout(slideClasses, popOrShift, showClass, hideClass, timeOut, callback){
    let slideItem = document.querySelectorAll(`.${slideClasses[0]}`);
            slideItem = Array(...slideItem);
            switch (popOrShift){
                case 'pop':
                    slideItem.pop();
                    break;
                case 'shift':
                    slideItem.shift();
                    break;
                default:
                    console.log('Set pop or shift method in function')
            }
            for(const item of slideItem){
                    item.classList.remove(showClass);
                    item.classList.add(hideClass);
                    setTimeout(()=>{if(callback){callback()} item.remove()}, timeOut)
            }
}
// ==========ФУНКЦИЯ СМЕНЫ КАРТИНОК==========

    function changeSlidePic(number, slidesWrapperClass, slideClasses, showClass, hideClass) {
        const slidersWrapper = document.querySelector(slidesWrapperClass);

            const prevSlideItems = slidersWrapper.querySelectorAll(`.${slideClasses[0]}`);

            const slideItem = createSlide(slideClasses, number, 0);

            slidersWrapper.append(slideItem)

            removePrevSlideWithTimeout(slideClasses, 'pop', showClass, hideClass, 2500/* , addZ1 */);

            setTimeout(()=>{slideItem.classList.add(showClass);}, 100)
    }

// ==========ФУНКЦИЯ СМЕНЫ ТЕКСТА ДЛЯ КАЖДОГО ИЗ СЕРВИСОВ==========    
 
    function changeSlideText (number, slidesWrapperClass, slideClasses, slideContent, translateClass, showClass, hideClass) {

        const slidersWrapper = document.querySelector(slidesWrapperClass),
              slideItem = createSlide(slideClasses, number, slideContent);

        slidersWrapper.prepend(slideItem);

        setTimeout(()=>{
            if(translateClass){slideItem.classList.remove(translateClass)}
            slideItem.classList.add(showClass)
        }, 1500)
        removePrevSlideWithTimeout(slideClasses, 'shift', showClass, hideClass, 2000)

    }

// ==========ФУНКЦИЯ СМЕНЫ ЛОГОТИПОВ==========

    function changeSlideLogo (number, slidesWrapperClass, slideClasses) {

        const slidersWrapper = document.querySelector(slidesWrapperClass),
              slidesItem = createSlide(slideClasses, number);


        slidersWrapper.append(slidesItem);

        setTimeout(()=>{slidesItem.classList.add('show-logo')}, 1000)

        removePrevSlideWithTimeout(slideClasses, 'pop', 'show-logo', 'hide-logo', 1000)

    }

    // ==========ФУНКЦИЯ СМЕНЫ ФОНА СЕРВИСА==========

    const slideBackgroundTransition = document.createElement('div');

    slideBackgroundTransition.classList.add('slide__wrapper-bg-transition', 'add-slide-bg-opacity');

    function changeSlideBg (bgArr, slideBg, i, min, max){

        if(min<i){
            bgArr[min].classList.add('add-slide-bg-opacity');
            min = min+1;
        }
        if(i<max){
            bgArr[max].classList.add('add-slide-bg-opacity');
            max = max-1;
        }

        if(min==i&&max===i){
            slideBg.classList.remove('add-slide-bg-opacity');
            return;
        }
        changeSlideBg (bgArr, slideBg, i, min, max)
    }

    //===========ФУНКЦИЯ СМЕНЫ КНОПОК С ССЫЛКАМИ НА СЕРВИСЫ==========

    function changeSlideBtn (number, slidesWrapperClass, slideClasses, slideHref, showClass, hideClass){
        
        const slidesWrapper = document.querySelector(slidesWrapperClass),
            slidesBtn = document.createElement('a');

        slidesBtn.innerHTML = '<button>На сайт проекта</button>';
        slideClasses.forEach(btnClass => slidesBtn.classList.add(btnClass));
        slidesBtn.setAttribute('href', slideHref[number]);

        slidesWrapper.append(slidesBtn);

        if(number===1){
            const btns = slidesWrapper.querySelectorAll('a');

            btns.forEach(btn => {
                btn.classList.add(hideClass);
                setTimeout(()=>{btn.remove()}, 700)
            })
        }

        setTimeout(()=>{slidesBtn.classList.add('show-btn', `show-btn-tablet-${number}`);}, 1000)

        removePrevSlideWithTimeout(slideClasses, 'pop', showClass, hideClass, 700)

    }

    //===========ФУНКЦИЯ УПРАВЛЕНИЯ ПОЗИЦИЕЙ ПЛАНЕТЫ==========

    let clickCounter = 0;
    
    function setPlanetPosition (wrapClass, planetClasses) {

        clickCounter = clickCounter + 1;

        const planetWrap = document.querySelector(wrapClass),
              planets = planetWrap.querySelectorAll(`.${planetClasses[0]}`);

            switch (clickCounter) {
                case 1:
                    planetWrap.classList.add('planet-wrapper-position-1');
                    break;
                case 2:
                    planetWrap.classList.remove('planet-wrapper-position-1');
                    planetWrap.classList.add('planet-wrapper-position-2');
                    planets.forEach(planet => planet.classList.add('planet-position-2'));
                    setTimeout(()=>{
                        planetWrap.classList.remove('planet-wrapper-position-2');
                        planets.forEach(planet => planet.classList.remove('planet-position-2'));
                        clickCounter = 0;
                    }, 1800);
                    break;
                default:
                    clickCounter = 0;
            }
    }

    //===========ФУНКЦИЯ ОТОБРАЖЕНИЯ ИНДИКАТОРА АКТИВНОГО СЛАЙДА==========

    function makeActiveElem (min, max, current, elem, activeClass, parentArr) {
        
        if(min<current){
            parentArr[min].classList.remove(activeClass);
            min = min+1;
        }
        if(current<max){
            parentArr[max].classList.remove(activeClass);
            max = max-1;
        }
        if(current===min&&current===max){
            elem.classList.add(activeClass);
            return;
        }

        makeActiveElem (min, max, current, elem, activeClass, parentArr);
    }

    //===========ФУНКЦИЯ ДОБАВЛЯЮЩАЯ БЛОК ОТКЛЮЧАЮЩИЙ КЛИКИ========== 

    function cancelClicks (elem, timeOut) {
        elem.classList.add('remove-pointer-events');
        setTimeout(()=>{elem.classList.remove('remove-pointer-events');}, timeOut)
    }

    // ===========ОТКЛЮЧАЕТ ВСЕ TRANSITION ЭФФЕКТЫ ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА========== 

    window.addEventListener('resize', ()=> {
        slide.classList.add('disable-transition');
        if(slide.classList.contains('disable-transition')){
            setTimeout(()=>{slide.classList.remove('disable-transition')}, 200)
        }
    });


    // ===========ВЫЗОВ ФУНКЦИЙ========== 

    let slideIndex = 1;

    if(!(hasTouchDevice())){
        switchers.forEach(switcher => {
            switcher.classList.add('hover');
        })
    };
    
    switchers.forEach(switcher => {
        switcher.addEventListener('click',function(){
            const slideNumber = +this.getAttribute('data-number');

            if(slideNumber!=slideIndex){
                makeActiveElem (0, switchers.length-1, slideNumber-1, switcher, 'slide__service-logo_wrapper-active', switchers);
                cancelClicks(switchersWrapper, 2500);

                changeSlidePic(slideNumber, slidersDB.pics.wrapperClass, slidersDB.pics.elemClasses, 'show-pic', 'hide-pic');
                changeSlideText(slideNumber, slidersDB.titles.wrapperClass, slidersDB.titles.elemClasses, slidersDB.titles.content, 'translate-new-title', 'show-title', 'hide-title');
                changeSlideText (slideNumber, slidersDB.descr.wrapperClass, slidersDB.descr.elemClasses, slidersDB.descr.content, 0, 'show-descr', 'hide-descr');
                changeSlideLogo(slideNumber, slidersDB.logos.wrapperClass, slidersDB.logos.elemClasses);
                slideBgTransitions.forEach((slideBg, j) =>  {if(slideNumber===j+1){changeSlideBg (slideBgTransitions, slideBg, j, 0, slideBgTransitions.length-1)}});
                changeSlideBtn (slideNumber, slidersDB.links.wrapperClass, slidersDB.links.elemClasses, slidersDB.links.href, 'show-btn', 'hide-btn');
                if(window.innerWidth/window.innerHeight > 1){setPlanetPosition (slidersDB.planet.wrapperClass, slidersDB.planet.elemClasses)}

                slideIndex = slideNumber;
            }
        });
    });

});