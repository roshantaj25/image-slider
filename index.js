const images = [
    "images/photo-1697469994783-b12bbd9c4cff.avif",
    "images/photo-1697451964285-efa976c9178b.avif",
    "images/photo-1697230188928-fb36c4964bf7.avif",
    "images/photo-1685350767266-a0fc514fb41e.avif",
    "images/photo-1697581886387-a8b3af94ef0b.avif",
    "images/photo-1697487957555-5f8df6a965f6.avif",
    "images/photo-1697638332749-da3ba4046082.avif",
    "images/photo-1694250990115-ca7d9d991b24.avif",
    "images/photo-1697386576502-812fce23b209.avif",
    "images/photo-1697716080597-be01c4946985.avif",
    "images/photo-1697554521121-3a3cda83105a.avif",
    "images/photo-1697485538022-766751333c4f.avif",
    "images/photo-1619807811096-7d0584eedecf.avif"
]
const imageList = $('.image-slider-container-wrapper-right')
let interval = ''

$(function () {
    $(imageList).html(
        images.map((img) => {
            return `<div class="image-slider-container-wrapper-right-item" data-image="${img}">
                        <div class="image-slider-container-wrapper-right-item-img">
                            <img src="${img}">
                        </div>
                    </div>`
        }).join('')
    )

    $('body').on('click', '.image-slider-container-wrapper-right-item.next', function () {
        changePlaces($(this), 'next');
    });

    let explores = $('.image-slider-container');
    changePlaces($(explores).find('.image-slider-container-wrapper-right-item')[0], 'next');

    $('body').on('click', '.next-place-btn', function () {
        let exploreContainer = $(this).parent().parent();
        changePlaces($(exploreContainer).find('.image-slider-container-wrapper-right-item.next'), 'next');
    });

    $('body').on('click', '.prev-place-btn', function () {
        let exploreContainer = $(this).parent().parent();
        changePlaces($(exploreContainer).find('.image-slider-container-wrapper-right-item:nth-last-child(2)'), 'prev');
    });

    $('body').on('click', '.auto-play-item.main', function () {
        autoPlay($(this).text())
    })
})

function changePlaces(place, dir) {
    let image = $(place).data('image');
    let placeWrapper = $(place).parent();
    let exploreContainer = $(placeWrapper).parent().parent().parent().parent();

    if (dir == 'next') {
        $(placeWrapper).find('.image-slider-container-wrapper-right-item').removeClass('next');
        $(place).next().addClass('next');
        $(place).addClass('active');

        setTimeout(() => {
            $(placeWrapper).append($(place));
            $(place).removeClass('active');
        }, 300);
    }

    if (dir == 'prev') {
        $(placeWrapper).prepend($(place).next());
        $(placeWrapper).find('.image-slider-container-wrapper-right-item').first().addClass('active');

        setTimeout(() => {
            $(placeWrapper).find('.image-slider-container-wrapper-right-item').removeClass('next');
            $(placeWrapper).find('.image-slider-container-wrapper-right-item').first().removeClass('active').addClass('next');
        });
    }

    $(exploreContainer).css('background-image', `url(${image})`);
}

function autoPlay(type, speed = 2000) {
    const container = $('.auto-play-item.main')
    if (type === 'Play') {
        $(container).text('Pause')
        interval = setInterval(() => {
            $('.image-slider-container-wrapper-right-item.next').click()
        }, speed);
    }
    if (type === 'Pause') {
        $(container).text('Play')
        clearInterval(interval)
    }
}