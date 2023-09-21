document.addEventListener('DOMContentLoaded', ()=> {

    
    const   switchersClickBlocker = document.querySelector('.slide__switch-menu:before'),
            switchers = document.querySelectorAll('.slide__service-logo_wrapper');


    console.log(switchersClickBlocker);

    const slidersDB = {
        pics: {
            wrapperClass: '.slide__pic_wrapper',
            elemClasses: ['slide__pic', 'mini-pic', 'slide__pic-'],
            content: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: ''
            }
        },
        titles: {
            wrapperClass: '.slide__head-title_wrap',
            elemClasses: ['slide__head-title', 'slide__head_title-'],
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
            content: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: ''
            }
        },
        descr: {
            wrapperClass: '.slide__descr_wrapper',
            elemClasses: ['slide__descr', 'slide__descr-'],
            content: {
                1: 'Регистрация на проекте более не производится. А если вам интересен wapclick и всё, что с ним связано - ждём вас в Juddy! А за трафиком - заходите в Buymedia!',

                2: 'Монетизация трафика с помощью 1-click, pin-submit, etc. После регистрации назови менеджеру тайное слово «Дайпять» и получи +5% к ребилльной ставке на целый месяц!',

                3: 'Рекламная сеть с самыми популярными форматами: Preroll, In-page, PopUnder/ClickUnder. Мониторинг конкурентов и тонкие настройки кампании. По промокоду «BeInBuymedia» + 5% к первому пополнению!',

                4: 'Кастомный видеоплеер с широкой палитрой инструментов для настройки персонализации. Бонус - не требует знаний программирования.',

                5: 'Проект PushAds.biz работает в приватном режиме. Регистрация новых пользователей временно приостановлена.'
            }
        }
    };

    let sliderSwitchClickAllowed = true;

    function changeSlide(number, slidesWrapperClass, slideClasses, slideContent, horizontalDirection, slidesWrapperTransitionTime) {
        const slidersWrapper = document.querySelector(slidesWrapperClass),
              slidersWrapperGap = +window.getComputedStyle(slidersWrapper).gap.slice(0, window.getComputedStyle(slidersWrapper).gap.length - 2);

        if(sliderSwitchClickAllowed){
            const prevSlideItems = slidersWrapper.querySelectorAll(`.${slideClasses[0]}`);
            switchersClickBlocker.style.display = 'block';
            prevSlideItems.forEach(item => {
                item.removeAttribute('style');
                item.classList.add('add-opacity')
            });

            // sliderSwitchClickAllowed = false;
            const slideItem = document.createElement('div');
            slideClasses.forEach(item => {
                item[item.length-1] === '-' ? slideItem.classList.add(`${item+number}`) : slideItem.classList.add(item)
            });
            slideItem.innerHTML = slideContent[number];

            horizontalDirection === '-' ? slidersWrapper.append(slideItem) : slidersWrapper.prepend(slideItem);
            

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
                slidersWrapper.style.transform = 'none';
                slidersWrapper.style.transition = 'none';
                

                sliderSwitchClickAllowed = true;
                switchersClickBlocker.style.display = 'none';
            }

            if(slideItem.classList.contains('mini-pic')){setTimeout(removeMiniPic, 400)}
            setTimeout(removePrevSlide, slidesWrapperTransitionTime*1000);
        }
    }

    switchers.forEach((switcher) => {
        switcher.addEventListener('click',function(){
            changeSlide(+this.getAttribute('data-number'), slidersDB.titles.wrapperClass, slidersDB.titles.elemClasses, slidersDB.titles.content, '+', 4);
            changeSlide(+this.getAttribute('data-number'), slidersDB.pics.wrapperClass, slidersDB.pics.elemClasses, slidersDB.pics.content, '-', 2);
            // console.log(slidersDB.titles.content[2])
            
        });
    });


});