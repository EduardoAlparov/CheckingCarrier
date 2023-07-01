document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove('preload');

    // header check menu pattern:
    const checkButton = document.querySelector('.js-check-btn');

    if(checkButton) {
        checkButton.onclick = (e) => {
            e.preventDefault();
            document.body.classList.toggle('check-menu-is-open');
            checkButton.classList.toggle('control-link--active');
        }
    }

    // hamburger button - open dialog:
    const hamburgerButton = document.querySelector('.js-hamburger-btn');
    const dialog = document.querySelector('.dialog');

    if(hamburgerButton) {
        hamburgerButton.onclick = (e) => {
            if(document.body.classList.contains('hamburger-menu-is-open') &&
            !e.target.closest('.dialog__body')) {
                document.body.classList.remove('hamburger-menu-is-open');
                hamburgerButton.classList.remove('is-active');
                dialog.close();
            } else {
                document.body.classList.add('hamburger-menu-is-open');
                hamburgerButton.classList.add('is-active');
                dialog.show();
            }
        }
    }

    // close popups:
    window.addEventListener('click', (e) => {
        if(document.body.classList.contains('check-menu-is-open') &&
        !e.target.closest('.control-panel')) {
            document.body.classList.remove('check-menu-is-open');
            checkButton.classList.remove('control-link--active');
        }
    })

    // form inputs validation and masks:
    let scriptTag = document.createElement('script');
    scriptTag.src = "https://unpkg.com/imask";
    document.body.appendChild(scriptTag);

    scriptTag.onload = () => {
        const forms = document.querySelectorAll('.js-form');
        const phoneInputs = document.querySelectorAll('.js-input-mask_phone');
        const nameInputs = document.querySelectorAll('.js-input-mask_text');
        const emailInputs = document.querySelectorAll('.js-input-mask_email');


        if(forms.length) {
            phoneInputs.forEach(phoneInput => {
              const phoneMask = IMask(phoneInput, {
                mask: '+{7}(000)000-00-00',
                min: 10
              });

              phoneMask.on("accept", function () {
                console.log(phoneMask.value.length);
                if(phoneMask.value.length) {
                    console.log(phoneMask.value.length);
                }
              });

            })

            nameInputs.forEach(nameInput => {
              const nameMask = IMask(nameInput, {
                mask: /^[А-Яа-яЁёA-Za-z ]+$/,
              });
            })

            emailInputs.forEach(emailInput => {
              const emailMask = IMask(emailInput, {
                mask: /^\S*@?\S*$/,
              });
            })
        }

        Array.from(forms).forEach( form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let formInputs = form.querySelectorAll('input:required');
                let status;
                let validateBoolean;

                Array.from(formInputs).forEach(input => {

                    if(input.value == false) {
                        validateBoolean = false;
                        input.closest('.form__input-wrapper').querySelector('.error').classList.add('error--visible');

                        setTimeout(() => {
                            input.closest('.form__input-wrapper').querySelector('.error').classList.remove('error--visible');
                        }, 2000);

                        return;
                    }

                })

                if(validateBoolean == false) {
                    status = 'error';
                    // console.log(status);
                    return status;
                } else {
                    status = 'success';
                    // console.log(status);
                    return status;
                }
            })
        })
    }

    // swiper sliders:

    const aboveSwiper = new Swiper('.js-history-above-swiper', {
        sliderPerView: 1,

        controller: {
            by: 'container',
        },
    });

    const storylineSwiper = new Swiper('.js-storyline-swiper', {
        slidesPerView: 'auto',
        freeMode: true,
    });

    aboveSwiper.controller.control = storylineSwiper;
    storylineSwiper.controller.control = aboveSwiper;

    // news sliders:
    const newsMainSwiper = new Swiper('.js-news-item-slider', {
        slidesPerView: 1,

        navigation: {
            nextEl: '.news-item-section__button--next',
            prevEl: '.news-item-section__button--prev',
        },

        breakpoints: {
            992: {
                allowTouchMove: false,
            }
        }
    });

    const newsBottomSwiper = new Swiper('.js-news-bottom-slider', {
        slidesPerView: 1,
        spaceBetween: 0,

        breakpoints: {
            992: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        }
    });

    newsMainSwiper.controller.control = newsBottomSwiper;
    newsBottomSwiper.controller.control = newsMainSwiper;


    // about nav:
    Array.from(document.querySelectorAll('.nav-about__link')).forEach( link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            Array.from(document.querySelectorAll('.nav-about__link')).forEach( item => {
                item.classList.remove('nav-about__link--active');
            })

            let gettedId = link.dataset.link;
            let TY = 0;
                TY = document.getElementById(gettedId).offsetTop;
            window.scrollTo({
                top: TY,
                behavior: "smooth"
            });

            link.classList.add('nav-about__link--active');
        })
    })

    // brief-description open text:
    Array.from(document.querySelectorAll('.brief-description__button')).forEach( btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.brief-description__body').classList.toggle('brief-description__body--is-open');
        })
    })

    // report example control:
    Array.from(document.querySelectorAll('.report-example__btn')).forEach( btn => {
        btn.addEventListener('click', (e) => {
            Array.from(document.querySelectorAll('.report-example__btn')).forEach( button => {
                button.classList.remove('report-example__btn--active');
            })

            Array.from(document.querySelectorAll('.report-example__windows-item')).forEach( window => {
                window.classList.remove('report-example__windows-item--visible');
            })

            btn.classList.add('report-example__btn--active');
            document.querySelector(`[data-role=${btn.dataset.path}]`).classList.add('report-example__windows-item--visible');
        })
    })

    // seo slider:
    const seoGallerySwiper = new Swiper('.js-sample-page-slider', {
        slidesPerView: 1,
        spaceBetween: 0,

        navigation: {
            nextEl: '.sample-page__button--next',
            prevEl: '.sample-page__button--prev',
          },
    });

    // share btns control:
    Array.from(document.querySelectorAll('.js-share')).forEach( btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector('.js-open').classList.add('is-open');
            document.body.classList.add('popup-is-open');
        })
    })

    if(document.querySelector('.popup')) {
        document.querySelector('.popup').addEventListener('click', (e) => {
            if(!e.target.closest('.popup__content') || e.target.closest('.popup__close-btn')) {
                document.querySelector('.js-open').classList.remove('is-open');
                document.body.classList.remove('popup-is-open');
            }
        })
    }


    // search input result control:
    Array.from(document.querySelectorAll('.js-search-input')).forEach( input => {
        input.addEventListener('input', (e) => {
            if(e.target.value && (e.target === document.activeElement)) {
                document.body.classList.add('search-result-is-open');
            } else {
                document.body.classList.remove('search-result-is-open');
            }
        })
        input.addEventListener('change', (e) => {
            if(e.target.value && (e.target === document.activeElement)) {
                document.body.classList.add('search-result-is-open');
            } else {
                document.body.classList.remove('search-result-is-open');
            }
        })
    })
})
