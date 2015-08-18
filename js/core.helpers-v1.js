// Namespace to make updates easier and more terse.
// Lots of assumptions about implementation
$.fn.clrfy = function(opts) {
    var ramp_distance = 6;
    // Needs to come first, otherwise it clobbers styles.
    if(opts.bg) $(this).attr('style', dualGradient(tinycolor(opts.bg).lighten(ramp_distance).toHex(), tinycolor(opts.bg).darken(ramp_distance).toHex()));
    if(opts.fg) {
        var color = tinycolor(opts.fg).isDark() ? tinycolor(opts.fg).darken(40) : tinycolor(opts.fg).lighten(40);
        $(this).css({
            'color': '#' + tinycolor(opts.fg).toHex(),
            'text-shadow': '0 2px 2px ' + color.desaturate(100).toHex()
        });
    }
    if(opts.bg) $(this).css('background-color', '#' + tinycolor(opts.bg).toHex());
    if(opts.brd) $(this).css('border-color', '#' + tinycolor(opts.brd).toHex());
};

function randomFonts(number, font_data) {
    var fonts = [];
    for(var i = 0; i < number; i++) {
        fonts.push(randomArrayValue(font_data));
    }
    return fonts;
}

function checkVisibility(color1, color2) {
    // http://www.w3.org/TR/AERT#color-contrast

    // Color brightness is determined by the following formula:
    // ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

    // Note: This algorithm is taken from a formula for converting RGB values to
    // YIQ values. This brightness value gives a perceived brightness for a color.

    // Color difference is determined by the following formula:
    // (maximum (Red value 1, Red value 2) - minimum (Red value 1, Red value 2)) + (maximum (Green value 1, Green value 2) - minimum (Green value 1, Green value 2)) + (maximum (Blue value 1, Blue value 2) - minimum (Blue value 1, Blue value 2))

    // The range for color brightness difference is 125. The range for color difference is 500.

    var red_max = Math.max(color1.r, color2.r);
    var red_min = Math.min(color1.r, color2.r);

    var green_max = Math.max(color1.g, color2.g);
    var green_min = Math.min(color1.g, color2.g);

    var blue_max = Math.max(color1.b, color2.b);
    var blue_min = Math.min(color1.b, color2.b);

    var color_diff = (red_max - red_min) + (green_max - green_min) + (blue_max - blue_min);
    var brightness_diff = ((color1.r * 299) + (color1.g * 587) + (color1.b * 114)) / 1000;
    return [color_diff, brightness_diff];
}

function randomColorTest() {
    var bg = randomColorObject(255);
    var fg = randomColorObject(255);
    var diffs = checkVisibility(bg, fg);
    var text = ['[Visibility] ', 'Color: ', diffs[0], 'Brightness:', diffs[1]].join(' ');
    $('*').css({
        'color': rgbString(fg.r, fg.g, fg.b),
        'background-color': rgbString(bg.r, bg.g, bg.b)
    });
    return text;
}

function updateHref(link_el, url) {
    // Open+Sans:300italic,600italic,700italic,800italic,400,600,300,700
    $(link_el).attr({
        'href': url,
        'rel': 'stylesheet',
        'type': 'text/css'
    });
    return '<link rel="stylesheet" href="' + url + '" type="text/css">';
}

function buildUrlFragment(font_obj) {
    // Creates the appropriate Google
    // font link href for embedding stylesheets.
    var url = font_obj.family.replace(/\s/gi, '+') + ':' + font_obj.variants.join(',');
    return url;
}

function addAllSwatches(dark_el, light_el, dark, light) {
    addSwatches(dark_el, dark);
    addSwatches(light_el, light);
}

function addSwatch(container, color) {
    var swatch = $('<div></div>');
    swatch.addClass('swatch');
    swatch.css({
        'background-color': '#' + color.toHex(),
        'color': '#' + tinycolor(tinycolor(tinycolor(color).complement()).desaturate(100)).lighten(50).toHex()
    });
    swatch.text('#' + tinycolor(color).toHex());
    $(container).append(swatch);
}

function addSwatches(el, colors) {
    $(el).empty();
    $.each(colors, function(_, color){
        addSwatch(el, color);
    });
}

function generateShades(primary, num_colors) {
    var colors = [];
    for(var i = 0; i < num_colors; i++) {
        colors.push(tinycolor(tinycolor(primary).complement(), (i + 1) * 8)).lighten();
    }
    return colors;
}

function generateMutedShades(primary, num_colors) {
    var colors = [];
    for(var i = 0; i < num_colors; i++) {
        colors.push(tinycolor.desaturate(tinycolor.lighten(tinycolor.complement(primary), (i + 1) * 8), 70));
    }
    return colors;
}

function makeCSSRule(selectors, declarations, prefix) {
    selectors = selectors.split(',');
    $.each(selectors, function(k, sel){
        selectors[k] = (prefix ? prefix : '') + ' ' + sel;
    });
    var css = selectors.join(',\n') + ' {\n';
    $.each(declarations, function(prop, value){
        if(prop === 'font-family') value = '"' + value + '"';
        if(prop.length === 0) {
            css += value + '\n';
        } else {
            css += prop + ': ' + value + ';\n';
        }
    });
    css += '}';
    return css;
}
