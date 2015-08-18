function randomBgTextCombos() {
    var el = $('<div></div>');
    el.attr('id', 'foo');

    var el2 = $('<div></div>');
    el2.attr('id', 'foo2');

    var el3 = $('<div></div>');
    el3.attr('id', 'foo3');

    $('body').append(el);
    $('body').append(el2);
    $('body').append(el3);

    var rand = randomColor(255);
    addSwatches('#foo3', generateShades(rand, 5));
    addSwatches('#foo2', generateMutedShades(rand, 5));
    addSwatches('#foo', [tinycolor(rand)]);
}

function randomBtnGradients() {
    var rand = randomColor(255);
    var shades = generateShades(rand, 5);
    var mutedshades = generateMutedShades(rand, 5);

    $('h1, h2').css({
        'color': '#' + mutedshades[0].toHex()
    });
    $('h3').css({
        'color': '#' + mutedshades[4].toHex()
    });
    $('a').css('color', tinycolor.desaturate(rand, 20).toHex());
    $('.btn').css({
        'background-color': '#'+rand,
        'border-bottom-width': '6px',
        'border': '1px solid #'+tinycolor.darken(rand, 30).toHex(),
        'color': '#'+tinycolor.lighten(rand, 40).toHex()
    });
    $('.btn').attr('style', dualGradient('#'+shades[0].toHex(), '#'+mutedshades[0].toHex()));
    $('.jumbotron').css('background-color', mutedshades[4].toHex());
}

var rBlockswatches = function() {
    // $('body').empty();
    var base = randomColor(255);
    var parent = $('<div class="row well"><div class="col-md-8 col-md-offset-2"></div></div>');
    parent.appendTo('body');
    var h3 = $('<h3>Heading three</h3>');
    var baseShadowShade = tinycolor.lighten(base, 60);
    // var bgcolor = tinycolor.lighten(tinycolor.desaturate(tinycolor.complement(base), 40), 50);
    var bgcolor = tinycolor.desaturate(tinycolor.lighten(tinycolor.complement(base), 50), 10);
    parent.css({
        'background-color': '#'+ bgcolor.toHex(),
        'border': '4px solid #'+tinycolor.lighten(bgcolor, 40).toHex()
    });
    parent.append(h3);
    h3.css({
        'color': base,
        'text-shadow': '0 1px 3px #' + baseShadowShade.toHex()
    })
    .appendTo(parent.find('div'));
    $(window).scrollTop(100000);
};

// var intval = setInterval(function(){
//     rBlockswatches();
//     randomBtnGradients();
//     randomAlertShades();
// }, 400);

// $('body').on('click', function(){clearInterval(intval);});

function randomAlertShades() {
    // Always use the purest saturation for the base
    var base_danger = 'rgb(255, 0, 0)';
    var base_warn = 'rgb(255, 255, 0)';
    var base_info = 'rgb(0, 0, 255)';
    var base_success = 'rgb(0, 255, 0)';
    var saturation_amt = rando(60); // not too high, otherwise it loses the color meaning
    var mod_danger = tinycolor.desaturate(base_danger, saturation_amt);
    var mod_warn = tinycolor.desaturate(base_warn, saturation_amt);
    var mod_info = tinycolor.desaturate(base_info, saturation_amt);
    var mod_success = tinycolor.desaturate(base_success, saturation_amt);

    addAlertShades(mod_info, mod_warn, mod_danger, mod_success, 30);
}

function addAlertShades(mod_info, mod_warn, mod_danger, mod_success, lighten_amt) {
    $('.alert-info').css({
        'background-color': '#' + mod_info.toHex(),
        'color': '#'+tinycolor.lighten(mod_info, lighten_amt).toHex()
    });
    $('.alert-danger').css({
        'background-color': '#' + mod_danger.toHex(),
        'color': '#'+tinycolor.lighten(mod_danger, lighten_amt).toHex()
    });
    $('.alert-warning').css({
        'background-color': '#' + mod_warn.toHex(),
        'color': '#'+tinycolor.lighten(mod_warn, lighten_amt).toHex()
    });
    $('.alert-success').css({
        'background-color': '#' + mod_success.toHex(),
        'color': '#'+tinycolor.lighten(mod_success, lighten_amt).toHex()
    });
}

function generateAll() {
    // Choose scheme type based on dropdown
    var colors = tinycolor[$('#scheme-type').val()](color_seed);
    bootstrap 3 components
    var block_fg_els = '.jumbotron, nav, .list-group > .list-group-item, .panel-heading';
    var lighter_block_fg_els = 'table, .breadcrumb, .pagination > li a, .pager > li a';
    var use_gradient_btns = false;
    var gradient, root, btns, h1, subheadings, body_copy, links = null;

    // Seeded color scheme
    color_seed = color_seed || randomColor(clamp(255, 100, 255), 100);

    // Choose scheme type based on dropdown
    var colors = tinycolor[$('#scheme-type').val()](color_seed);

    // Altered colors
    var heading_dark = tinycolor.lighten(colors[0], 30);
    var heading_light = colors[0];

    var body_copy_dark = tinycolor.lighten(tinycolor.desaturate((colors[1]), 80), 30);
    var body_copy_light = tinycolor.desaturate((colors[1]), 80);

    var btn_dark = tinycolor.lighten(tinycolor.complement(heading_dark), 10);
    var btn_light = tinycolor.darken(tinycolor.complement(heading_light), 10);

    var subheading_dark = tinycolor.desaturate(btn_dark, 30);
    var subheading_light = tinycolor.darken(btn_light, 30);

    var bg_dark = tinycolor.desaturate(tinycolor.darken(colors[2], 60), 50);
    var bg_light = tinycolor.desaturate(tinycolor.lighten(colors[2], 60), 50);

    var link_dark = colors[2];
    var link_light = colors[2];
    // var link_dark = tinycolor.darken(btn_dark, 5);
    // var link_light = tinycolor.darken(btn_light, 5);

    // Light

    if(light_active) {
        root = $('#light-option');
        btns = root.find('.btn');
        h1 = root.find('h1');
        subheadings = root.find('h2, h3');
        body_copy = root.find('div:not(.alert) p , ul');
        links = root.find('a:not(.btn)');

        gradient = dualGradient(bg_light.toHex(), tinycolor.lighten(bg_light, 30).toHex());

        $('body').attr('style', gradient);
        btns.css({
            'border': 'none',
            'color': '#' + tinycolor.lighten(btn_light, 50).toHex()
        });
        if(use_gradient_btns) {
            btns.attr('style', dualGradient(btn_light.toHex(), btn_light.toHex()));
        } else {
            btns.css('background-color', '#' + btn_light.toHex());
        }

        root.find('.brandable-icon').css('color', '#' + tinycolor.darken(btn_light, 50).toHex());

        root.css('background-color', '#' + bg_light.toHex());
        links.css('color', '#' + link_light.toHex());
        h1.css('color', '#' + heading_light.toHex());
        subheadings.css('color', '#' + subheading_light.toHex());
        body_copy.css('color', '#' + body_copy_light.toHex());

        addSwatches('#light-option > .swatches', [
            heading_light,
            body_copy_light,
            btn_light,
            subheading_light,
            bg_light
        ]);

        // bootstrap 3 stuff
        var blocks_light_bg = tinycolor.darken(bg_light, 5);
        root.find(block_fg_els).css({
            'background-color': '#' + blocks_light_bg.toHex(),
            'border-color': '#' + tinycolor.darken(blocks_light_bg, 10).toHex()
        });
        root.find(lighter_block_fg_els).css({
            'background-color': '#' + tinycolor.darken(blocks_light_bg, 5).toHex(),
            'border-color': '#' + tinycolor.lighten(blocks_light_bg, 10).toHex(),
            'color': '#' + tinycolor.lighten(blocks_light_bg, 20).toHex()
        });
    }

    Dark

    if(dark_active) {
        root = $('#dark-option');
        btns = root.find('.btn');
        h1 = root.find('h1');
        subheadings = root.find('h2, h3');
        body_copy = root.find('div:not(.alert) p , ul');
        links = root.find('a:not(.btn)');

        gradient = dualGradient(bg_dark.toHex(), tinycolor.lighten(bg_dark, 30).toHex());

        root.find('.brandable-icon').css('color', '#' + tinycolor.darken(btn_dark, 50).toHex());

        $('body').attr('style', gradient);
        btns.css({
            'border': 'none',
            'color': '#' + tinycolor.darken(btn_dark, 50).toHex()
        });
        if(use_gradient_btns) {
            btns.attr('style', dualGradient(btn_dark.toHex(), tinycolor.darken(btn_dark, 30).toHex()));
        } else {
            btns.css('background-color', '#' + btn_dark.toHex());
        }

        root.css('background-color', '#' + bg_dark.toHex());
        links.css('color', '#' + link_dark.toHex());
        h1.css('color', '#' + heading_dark.toHex());
        subheadings.css('color', '#' + subheading_dark.toHex());
        body_copy.css('color', '#' + body_copy_dark.toHex());

        addSwatches('#dark-option > .swatches', [
            heading_dark,
            body_copy_dark,
            btn_dark,
            subheading_dark,
            bg_dark
        ]);

        // bootstrap 3 stuff
        var blocks_dark_bg = tinycolor.lighten(bg_dark, 10);
        $('#dark-option').find(block_fg_els).css({
            'background-color': '#' + blocks_dark_bg.toHex(),
            'border-color': '#' + tinycolor.lighten(blocks_dark_bg, 10).toHex()
        });
        $('#dark-option').find(lighter_block_fg_els).css({
            'background-color': '#' + tinycolor.lighten(blocks_dark_bg, 30).toHex(),
            'border-color': '#' + tinycolor.lighten(blocks_dark_bg, 50).toHex(),
            'color': '#' + tinycolor.lighten(blocks_dark_bg, 60).toHex()
        });
    }
}


function render(root, color_scheme) {
    // bootstrap 3 components
    var block_fg_els         = '.jumbotron, nav, .list-group > .list-group-item, .panel-heading';
    var lighter_block_fg_els = 'table, .breadcrumb, .pagination > li a, .pager > li a';
    var use_gradient_btns    = false;
    var gradient, btns, h1, subheadings, body_copy, links = null;

    // Altered colors
    // var heading = self.colors[1];
    var heading    = tinycolor.lighten(self.colors[0], 30);

    var copy       = tinycolor.lighten(tinycolor.desaturate((self.colors[1]), 80), 30);
    var btn = self.colors[0];

    // var btn        = tinycolor.lighten(tinycolor.complement(heading), 10);
    var subheading = tinycolor.desaturate(btn, 30);
    var bg         = simple_bg ? tinycolor('#f1f1f1') : tinycolor.desaturate(tinycolor.darken(self.colors[4], 30), 50);
    var link       = tinycolor.lighten(btn, 20);
    var blocks_bg  = tinycolor.darken(bg, 5);

    // Light
    btns        = root.find('.btn');
    h1          = root.find('h1');
    subheadings = root.find('h2, h3');
    body_copy   = root.find('div:not(.alert) p , ul');
    links       = root.find('a:not(.btn)');

    gradient = dualGradient(bg.toHex(), tinycolor.lighten(bg, 30).toHex());

    $('body').attr('style', gradient);
    btns.css({
        'border': 'none',
        'color': '#' + tinycolor.lighten(btn, 50).toHex()
    });
    $('.fa').css('color', '#' + tinycolor.lighten(btn, 50).toHex());
    if(use_gradient_btns) {
        btns.attr('style', dualGradient(btn.toHex(), btn.toHex()));
    } else {
        btns.css('background-color', '#' + btn.toHex());
    }

    root.find('.brandable-icon').css('color', '#' + tinycolor.darken(btn, 50).toHex());

    root.css('background-color', '#' + bg.toHex());
    links.css('color', '#' + link.toHex());
    h1.css('color', '#' + heading.toHex());
    subheadings.css('color', '#' + subheading.toHex());
    body_copy.css('color', '#' + copy.toHex());

    addSwatches(root.find('.swatches'), [
        heading,
        copy,
        btn,
        subheading,
        bg
    ]);

    // bootstrap 3 stuff
    root.find(block_fg_els).css({
        'background-color': '#' + blocks_bg.toHex(),
        'border-color': '#' + tinycolor.darken(blocks_bg, 10).toHex()
    });
    root.find(lighter_block_fg_els).css({
        'background-color': '#' + tinycolor.darken(blocks_bg, 5).toHex(),
        'border-color': '#' + tinycolor.lighten(blocks_bg, 10).toHex(),
        'color': '#' + tinycolor.lighten(blocks_bg, 20).toHex()
    });
}
