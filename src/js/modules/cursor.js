import { gsap } from 'gsap';

function cursor() {
    if(document.documentElement.offsetWidth > 991){
        // custom cursor
        const cursor = document.createElement('div'),
            follower = document.createElement('div'),
            links = document.querySelectorAll('a'); // все ссылки на страницы, при наведении на них будет анимация

        cursor.setAttribute('id','cursor');
        follower.setAttribute('id','aura');
        document.body.append(cursor, follower);

        let mouseX = 0, mouseY = 0, posX = 0, posY = 0; // обнулим по умолчанию

        //ф-я координат курсора
        function mouseCoords(e){
            mouseX = e.pageX;
            mouseY = e.pageY;
        }

        gsap.to({}, {
            repeat: -1, // бесконечное повторение анимации
            duration: .01,

            // ф-я когда анимация входит в новую итерацию
            onRepeat: () => {
                // вычислим степень задержки фолловера (круга) от курсора (точки)
                posX += (mouseX - posX) / 5; // от значения 5 будет зависеть степень отставания курсора
                posY += (mouseY - posY) / 5;

                // установим позицию курсора
                gsap.set(cursor, {
                    css:{
                        left: mouseX,
                        top: mouseY
                    }
                });

                // и для фолловера
                gsap.set(follower, {
                    css:{
                        left: posX - 24,
                        top: posY - 24
                    }
                });
            }
        });

        links.forEach(link => {
            link.addEventListener('mouseover', () => {
                // при наведении мыши на ссылку курсору добавляем класс
                cursor.classList.add('active');
                follower.classList.add('active');
            })

            link.addEventListener('mouseout', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            })
        });

        document.body.addEventListener('mousemove', e => {
            mouseCoords(e);

            // покажем курсор
            cursor.classList.remove('hidden');
            follower.classList.remove('hidden');
        });

        document.body.addEventListener('mouseout', e => {
            // если курсор вышел за рамки экрана, сожмем его
            cursor.classList.add('hidden');
            follower.classList.add('hidden');
        });
    }
}

export default cursor;