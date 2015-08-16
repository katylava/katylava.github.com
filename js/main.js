var hue = Math.floor(Math.random() * 360)
$('html').css('background-color', 'hsl(' + hue + ',84%,90%)')

setInterval(function() {
    hue = hue || 359
    $('html').css('background-color', 'hsl(' + --hue + ',84%,90%)')
}, 2000)

