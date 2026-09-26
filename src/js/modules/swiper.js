

import Swiper from 'swiper';
import { EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

const swiper = new Swiper('.mySwiper', {
    modules: [EffectCards],

    effect: 'cards',

    grabCursor: true,

    slidesPerView: 1,
});