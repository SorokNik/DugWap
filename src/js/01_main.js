document.addEventListener('DOMContentLoaded', ()=> {

    
    const   switchersClickBlocker = document.querySelector('.slide__switch-menu_click-blocker'),
            switchers = document.querySelectorAll('.slide__service-logo_wrapper'),
            // slideBg = document.querySelector('.slide__wrapper '),
            slideBgTransitions = document.querySelectorAll('.slide__wrapper-bg-transition');

    // console.log(slideBgTransitions[0]);

    const slidersDB = {
        pics: {
            wrapperClass: '.slide__pic_wrapper',
            elemClasses: ['slide__pic', 'mini-pic', 'slide__pic-'],
        },
        titles: {
            wrapperClass: '.slide__head-title_wrap',
            elemClasses: ['slide__head-title', 'slide__head_title-', 'add-opacity', 'translate-new-title'],
            content: {
                1: 'DugWap',
                2: 'Juddy.biz',
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

                3: 'Рекламная сеть с самыми популярными форматами: Preroll, In-page, PopUnder/ClickUnder. Мониторинг конкурентов и тонкие настройки кампании. По промокоду «BeInBuymedia» + 5% к первому пополнению!',

                4: 'Кастомный видеоплеер с широкой палитрой инструментов для настройки персонализации. Бонус - не требует знаний программирования.',

                5: 'Проект PushAds.biz работает в приватном режиме. Регистрация новых пользователей временно приостановлена.'
            }
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

// ==========ФУНКЦИЯ СМЕНЫ КАРТИНОК==========
    function changeSlidePic(number, slidesWrapperClass, slideClasses, slideContent, horizontalDirection, slidesWrapperTransitionTime) {
        const slidersWrapper = document.querySelector(slidesWrapperClass),
              slidersWrapperGap = +window.getComputedStyle(slidersWrapper).gap.slice(0, window.getComputedStyle(slidersWrapper).gap.length - 2);

            const prevSlideItems = slidersWrapper.querySelectorAll(`.${slideClasses[0]}`);
            prevSlideItems.forEach(item => {
                item.removeAttribute('style');
                item.classList.add('add-opacity')
            });

            const slideItem = createSlide(slideClasses, number, slideContent);

            slidersWrapper.append(slideItem)
            

            const step = slidersWrapperGap + slideItem.clientWidth;

            slidersWrapper.style.transition = `${slidesWrapperTransitionTime}s ease`;
            slidersWrapper.style.transform = `translateX(${horizontalDirection}${step}px)`;
            slideItem.style.transition = '1s linear';

            if(slidersWrapper.getElements)

            function removeMiniPic () {
                slideItem.classList.remove('mini-pic');
            }

            function removePrevSlide () {
                let slideItem = document.querySelectorAll(`.${slideClasses[0]}`);
                slideItem = Array(...slideItem);
                horizontalDirection === '-' ? slideItem.pop() : slideItem.shift()
                for(const pic of slideItem){
                        pic.remove();
                }
                slidersWrapper.removeAttribute('style');
            }

            if(slideItem.classList.contains('mini-pic')){setTimeout(removeMiniPic, 400)}
            setTimeout(removePrevSlide, slidesWrapperTransitionTime*1000);
    }

// ==========ФУНКЦИЯ СМЕНЫ ТЕКСТА ДЛЯ КАЖДОГО ИЗ СЕРВИСОВ==========    
 
    function changeSlideText (number, slidesWrapperClass, slideClasses, slideContent, translateClass, showClass, hideClass) {

        const slidersWrapper = document.querySelector(slidesWrapperClass),
              slideItem = createSlide(slideClasses, number, slideContent);

        slidersWrapper.prepend(slideItem)

        function removePrevSlide () {
            let slideItem = document.querySelectorAll(`.${slideClasses[0]}`);
            slideItem = Array(...slideItem);
            slideItem.shift()
            for(const title of slideItem){
                    title.classList.remove(showClass);
                    title.classList.add(hideClass);
                    setTimeout(()=>{title.remove()}, 2000)
            }
        }
        setTimeout(()=>{
            if(translateClass){slideItem.classList.remove(translateClass)}
            slideItem.classList.add(showClass)
        }, 1500)
        removePrevSlide();

    }

// ==========ФУНКЦИЯ СМЕНЫ ЛОГОТИПОВ==========

    function changeSlideLogo (number, slidesWrapperClass, slideClasses) {

        const slidersWrapper = document.querySelector(slidesWrapperClass),
              slidesItem = createSlide(slideClasses, number);


        slidersWrapper.append(slidesItem);

        setTimeout(()=>{slidesItem.classList.add('show-logo')}, 1000)

        function removePrevSlide () {
            let slideItem = document.querySelectorAll(`.${slideClasses[0]}`);
            slideItem = Array(...slideItem);
            slideItem.pop()
            for(const logo of slideItem){
                    logo.classList.remove('show-logo');
                    logo.classList.add('hide-logo');
                    setTimeout(()=>{logo.remove()}, 1000)
            }
        }

        removePrevSlide ();

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

    switchers.forEach((switcher) => {
        switcher.addEventListener('click',function(){
            const slideNumber = +this.getAttribute('data-number');
            changeSlidePic(slideNumber, slidersDB.pics.wrapperClass, slidersDB.pics.elemClasses, slidersDB.pics.content, '-', 2);
            changeSlideText(slideNumber, slidersDB.titles.wrapperClass, slidersDB.titles.elemClasses, slidersDB.titles.content, 'translate-new-title', 'show-title', 'hide-title');
            changeSlideText (slideNumber, slidersDB.descr.wrapperClass, slidersDB.descr.elemClasses, slidersDB.descr.content, 0, 'show-descr', 'hide-descr');
            changeSlideLogo(slideNumber, slidersDB.logos.wrapperClass, slidersDB.logos.elemClasses);
            slideBgTransitions.forEach((slideBg, j) => {
                if(slideNumber===j+1) {
                    changeSlideBg (slideBgTransitions, slideBg, j, 0, slideBgTransitions.length-1)
                }
            });
        });
    });


});