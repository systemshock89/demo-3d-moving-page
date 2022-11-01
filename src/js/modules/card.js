import { gsap } from 'gsap';

function card() {
    if(document.documentElement.offsetWidth > 991){
        let cx, cy, clientX, clientY;

        cx = window.innerWidth / 2; // центральная точка экрана по X
        cy = window.innerHeight / 2; // центральная точка экрана по Y

        document.body.addEventListener('mousemove', e => {

            // определим текущее положение мыши
            clientX = e.pageX;
            clientY = e.pageY;

            const request = requestAnimationFrame(headerAnimate);

        });

        function headerAnimate() {
            // от центра будем определять позицию курсора
            const dx = clientX - cx;
            const dy = clientY - cy;

            const tiltX = dy / cy;
            const tiltY = dx / cx;

            // вычислим радиус от центра, в пределах которого при движении мыши будет действовать анимация
            const radius = Math.sqrt(Math.pow(tiltX, 2) + Math.pow(tiltY, 2));
            const degree = radius * 12; // от данной степени будет зависеть угол наклона 3d анимации

            // берем div.header__content и все что находится внутри
            // задаем что конкретно будем анимировать: transform
            gsap.to('.header__content', {
                duration: 1,
                transform: `rotate3d( ${tiltX}, ${tiltY}, 0, ${degree}deg )`
            });
        }

        // при открытии страницы происходит
        // появление каждого из элементов карты по очереди и падение текста на карту
        gsap.to('.header__card', {zoom: .98});
        gsap.to('.header__card-l-main', {opacity: 1, duration: .1});
        gsap.to('.header__card-l2-main', {opacity: 1, left: -10, top: 10, duration: .25, delay: .25 });
        gsap.to('.header__card-l3-main', {opacity: 1, left: -20, top: 20, duration: .25, delay: .25 });
        gsap.to('.header__card-russia', {opacity: .07, duration: .1});
        gsap.to('.header__card-logo-w', {opacity: 1, duration: 0.225});
        gsap.to('.header__card-chip', {opacity: 1, duration: 0.225});
        gsap.to('.header__card-valid', {opacity: 1, zoom:1, duration: .1, delay: .25});
        gsap.to('.header__card-number-holder', {opacity: 1, zoom:1, duration: .1, delay: .25});
    }
}

export default card;