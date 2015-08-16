var imageTemplate = Handlebars.compile($('#thumbnail-template').html())
var overlayTemplate = Handlebars.compile($('#overlay-template').html())

$.ajax({
    type: 'GET',
    url: 'https://api.imgur.com/3/album/0ZCCS/images',
    dataType: 'json',
    headers: { 'Authorization': 'Client-ID f0ce85247de23db' },
    success: function(data) {
        var images = data.data.map(function(image) {
            return {
                description: image.description,
                id: image.id,
                link: image.link,
                thumbnail: image.link.replace(image.id, image.id + 'm'),
                title: image.title.replace('[GISHWhes 2015]', '')

            }
        })

        $('#imgur-album > div').append(imageTemplate({ images: images }))
    },
    error: function(xhr, type) {
        $('#imgur-album > div').append('<p>Oh noes! Imgur sayz "u no can haz pictuars." :(');
    }
})

$('#imgur-album').on('click tap', 'img', function() {
    var $parent = $(this).parent();

    $('.overlay').html(overlayTemplate({
        description: $parent.next('p').text(),
        src: $parent.attr('href'),
        title: $parent.prev('h1').text()
    })).show()

    return false
})

$('.overlay').on('click tap', function(e) {
    if (e.target === this) {
        $(this).hide().html('')
    }
})

$('.overlay').on('click tap', 'div', function() { return false })

