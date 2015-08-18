function randomFonts(number, font_data) {
    var fonts = [];
    for(var i = 0; i < number; i++) {
        fonts.push(randomArrayValue(font_data));
    }
    return fonts;
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

function allReadable(base, colors) {
    var is_valid = true;
    $.each(colors, function(k, color){
        if(!tinycolor.isReadable(base, color)) is_valid = false;
    });
    return is_valid;
}

function updateStyleHref(link_el, url) {
    // Open+Sans:300italic,600italic,700italic,800italic,400,600,300,700
    $(link_el).attr({
        'href': url,
        'rel': 'stylesheet',
        'type': 'text/css'
    });
}

function buildUrlFragment(font_obj) {
    // Creates the appropriate Google
    // font link href for embedding stylesheets.
    var url = font_obj.family.replace(/\s/gi, '+') + ':' + font_obj.variants.join(',');
    return url;
}

function addSwatch(container, color) {
    var swatch = $('<div></div>');
    swatch.addClass('swatch');
    swatch.css({
        'background-color': tinycolor(color).toHexString(),
        'color': tinycolor(tinycolor(tinycolor(color).complement()).desaturate(100)).lighten(50).toHexString()
    });
    swatch.attr('data-toggle', 'tooltip');
    swatch.attr('title', tinycolor(color).toHexString());
    $(container).append(swatch).tooltip();
}

function addSwatches(el, colors) {
    $(el).empty();
    $.each(colors, function(_, color){
        addSwatch(el, color);
    });
}

function addAllSwatches(dark_el, light_el, dark, light) {
    addSwatches(dark_el, dark);
    addSwatches(light_el, light);
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
