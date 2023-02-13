const formContact = document.getElementById('formContact');
formContact.addEventListener('submit', submitHandler);

async function submitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });
        console.log({ responseData });
    }
    catch (error) {
        console.error(error);
    }
}

async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: formDataJsonString
    };
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}


$(document).on('keyup', '#zipCode', function (e) {
    const code = $(this).val();
    const key = event.keyCode || event.charCode;

    if ($(this).val().length == 2) {
        if (key == 8 || key == 46) {
        }
        else {
            $(this).val(code + '-');
        }
    }
    if ($(this).val().indexOf('--') !== -1) {
        $(this).val(code.replace('--', '-'));
    }
});

const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 4000
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 40
        },
        960: {
            slidesPerView: 4,
            spaceBetween: 40
        }
    },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});