var schemeLayout = (function(){
    var FONTS_KEY     = 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w';
    var theme_root    = 'css/themes/';
    var $gen          = $('#layout-gen');
    var font_data     = null;
    var dark_active   = true;
    var light_active  = true;
    var toggled       = true;
    var styles        = [];
    var font_css      = '';
    var font_link     = '';
    var current       = getCurrent();
    var LUMINANCE_AMT = 10;

    function getCurrent() {
        return getParam('scheme') ? getParam('scheme').toLowerCase().replace(/[^a-z]/, '') : 'triad';
    }

    function getAllSchemes() {
        var schemer = new ColorSchemer();
        return {
            'neutralLightCool': schemer.themes.neutral.light.cool(),
            'neutralLightWarm': schemer.themes.neutral.light.warm(),
            'neutralDarkCool' : schemer.themes.neutral.dark.cool(),
            'neutralDarkWarm' : schemer.themes.neutral.dark.warm(),
            'complementaryLightCool'      : schemer.themes.complementary.light.cool(),
            'complementaryLightWarm'      : schemer.themes.complementary.light.warm(),
            'complementaryDarkCool'       : schemer.themes.complementary.dark.cool(),
            'complementaryDarkWarm'       : schemer.themes.complementary.dark.warm(),
            'analogousLightCool'          : schemer.themes.analogous.light.cool(),
            'analogousLightWarm'          : schemer.themes.analogous.light.warm(),
            'analogousDarkCool'           : schemer.themes.analogous.dark.cool(),
            'analogousDarkWarm'           : schemer.themes.analogous.dark.warm(),
            'splitComplementaryLightCool' : schemer.themes.split_complementary.light.cool(),
            'splitComplementaryLightWarm' : schemer.themes.split_complementary.light.warm(),
            'splitComplementaryDarkCool'  : schemer.themes.split_complementary.dark.cool(),
            'splitComplementaryDarkWarm'  : schemer.themes.split_complementary.dark.warm()
        };
    }

    function buildFontCSS(fonts) {
        return [
        makeCSSRule('h1', {'font-family'               : fonts[0].family}),
        makeCSSRule('h2, h3, h4, .btn', {'font-family' : fonts[1].family}),
        makeCSSRule('body, p, ol, ul, small', {'font-family'       : fonts[2].family}),
        ].join('\n');
    }

    function clearStyles() {
        styles = [];
    }

    function generateFonts(e) {
        var fonts     = randomFonts(3, font_data);
        var url0      = buildUrlFragment(fonts[0]);
        var url1      = buildUrlFragment(fonts[1]);
        var url2      = buildUrlFragment(fonts[2]);
        var full_url  = 'http://fonts.googleapis.com/css?family=' + [url0, url1, url2].join('|');
        font_link     = updateStyleHref('#goog-font', full_url);
        updateFontCSS({
            'h1'    : fonts[0].family,
            'h2, h3, h4, legend'                           : fonts[1].family,
            'body, p, ol, ul, small, input, label'         : fonts[2].family,
            '.btn'  : fonts[1].family
        });
    }

    function updateFontCSS(font_data) {
        var style_str = '';
        var export_str = '';
        $.each(font_data, function(selector, font){
            export_str += (selector + '{ font-family:"' + font + '"; }\n');
            style_str += ('#layout-gen ' + selector + '{ font-family:"' + font + '"; }\n');
        });
        export_str += '\n\n<link rel="stylesheet" href="' + $('#goog-font').attr('href') + '">';
        $('#temp-font-style-color').html(style_str);
        $('#exported-output-fonts').text(export_str);
    }

    function initEvents() {
        $('#random-fontsize').on('click', generateFontSizing);
        $('#random-fonts').on('click', generateFonts);
        $('#random-colors').on('click', randomColorScheme);
        $('#random-all').on('click', function(e){
            e.preventDefault();
            generateFonts();
            randomColorScheme();
            generateFontSizing();
        });
    }

    function initColorPicker() {
        $gen.find('table, div').spectrum({
            move: generateColorScheme
        });
    }

    $.fn.fgColor = function(color) {
        if(!color) return this;
        styles.push(makeCSSRule(this.selector, {'color': color.toHexString()}));
        this.each(function(k, el){
            $(el).css({'color'  : color.toHexString()});
        });
        return this;
    }

    $.fn.bgColor = function(color) {
        styles.push(makeCSSRule(this.selector, {'background-color' : color.toHexString()}));
        this.each(function(k, el){
            $(el).css({'background-color': color.toHexString()});
        });
        return this;
    }

    $.fn.brdColor = function(color) {
        styles.push(makeCSSRule(this.selector, {'border-color': color.toHexString()}));
        this.each(function(k, el){
            $(el).css({'border-color': color.toHexString()});
        });
        return this;
    }

    function checkReadable(bg, els) {
        if(!allReadable(bg, els)) {
            $('#messages').text('BG/FG are not readable!');
            $('#status').addClass('bad-scheme');
        } else {
            $('#messages').empty();
            $('#status').removeClass('bad-scheme');
        }
    }

    function clearSwatches() {
        $('#swatches').empty();
    }

    function randomColorScheme() {
        generateColorScheme(randomColor());
    }

    function generateFontSizing() {
        var root = $('#layout-gen');
        root.find('h1').css('font-size', rando(80) + 'px');
        root.find('h2').css('font-size', rando(32) + 'px');
        root.find('h3').css('font-size', rando(24) + 'px');
        root.find('h4').css('font-size', rando(18) + 'px');
        root.find('h5').css('font-size', rando(16) + 'px');
        root.find('p, ul, ol, .btn').css('font-size', rando(14));
    }

    function getColors(base) {
        current = getCurrent();
        var colors = {
            triad: function() {
                return tinycolor(base).triad();
            },
            splitcomplement: function() {
                return tinycolor(base).splitcomplement();
            },
            tetrad: function() {
                return tinycolor(base).tetrad();
            },
            monochromatic: function() {
                return tinycolor(base).monochromatic();
            },
            complement: function() {
                return tinycolor(base).complement();
            },
            analogous: function() {
                return tinycolor(base).analogous();
            }
        };
        console.log('CURRENT', current);
        return colors[current]();
    }

    function getNormalizedColors(_base) {
        var base              = tinycolor(_base);
        var colors            = getColors(_base);
        var lum               = base.getLuminance();
        var dark_base         = base.isDark();
        var bg                = tinycolor(base);
        var shades            = bg.monochromatic();
        var fg                = tinycolor.mostReadable(bg, shades);
        var button            = (dark_base ? colors[1].lighten(20) : colors[1].darken(20)).saturate(20);
        var button_fg         = tinycolor.mostReadable(button, shades);
        var primary_heading   = colors[2];
        var secondary_heading = (dark_base ? shades[2] : shades[4]).saturate(20);
        var tertiary_heading  = (dark_base ? shades[1] : shades[3]).saturate(20);
        var base_highlight    = dark_base ? shades[3].lighten(10) : shades[3].darken(10);

        var widget_active_bg  = dark_base ? button.lighten(LUMINANCE_AMT) : button.darken(LUMINANCE_AMT);
        var widget_border     = widget_active_bg.darken(LUMINANCE_AMT);

        // TODO
        var danger            = tinycolor('red');
        var success           = tinycolor('green');
        var info              = tinycolor('blue');
        var warning           = tinycolor('yellow');

        var _bg               = bg;
        var table             = dark_base ? _bg.lighten(10) : _bg.darken(10);
        var table_fg          = dark_base ? _bg.darken(10) : _bg.lighten(10);
        var table_alt         = dark_base ? _bg.lighten(20) : _bg.darken(20);
        var table_fg_alt      = tinycolor.mostReadable(table_alt, shades);
        var table_bg_border   = dark_base ? tinycolor(table_alt).lighten(20) : tinycolor(table_alt).darken(20);

        return {
            'base'              : base,
            'colors'            : colors,
            'lum'               : lum,
            'dark_base'         : dark_base,
            'bg'                : bg,
            'shades'            : shades,
            'fg'                : fg,
            'button'            : button,
            'button_fg'         : button_fg,
            'primary_heading'   : primary_heading,
            'secondary_heading' : secondary_heading,
            'tertiary_heading'  : tertiary_heading,
            'base_highlight'    : widget_active_bg,
            'widget_active_bg'  : widget_active_bg,
            'widget_border'     : widget_border,
            'danger'            : danger,
            'success'           : success,
            'info'              : info,
            'warning'           : warning,
            'table'             : table,
            'table_fg'          : table_fg,
            'table_alt'         : table_alt,
            'table_fg_alt'      : table_fg_alt,
            'table_bg_border'   : table_bg_border
        }
    }

    function generateColorScheme(_base) {
        console.log('BASE: ' + _base);
        var light_theme = false;
        var colors = getNormalizedColors(_base);
        var schemes = getAllSchemes();

        clearSwatches();
        clearStyles();
        addSwatches('#swatches', colors);

        var attempts = 0;

        while(!tinycolor.isReadable(colors.bg, colors.fg)) {
            if(attempts > 10) break;
            // Check all fg type colors against bg
            checkReadable(colors.bg, [colors.primary_heading, colors.secondary_heading, colors.fg]);
            attempts += 1;
            console.log('Reconciling colors... (attempt #' + attempts + ')');
            bg = tinycolor(colors.bg).darken(1);
            fg = tinycolor(colors.fg).lighten(1);
        }

        var root = $('#layout-gen');
        var fg_dark = tinycolor(colors.fg).darken(3);
        var fg_light = tinycolor(colors.fg).lighten(3);

        // backgrounds
        root.bgColor(colors.bg);

        // All plain foregrounds (text)
        root.find('h1').fgColor(colors.primary_heading);
        root.find('h2').fgColor(colors.secondary_heading);
        root.find('h3, h4, h5, h6, fieldset').fgColor(colors.tertiary_heading);
        root.find('p, ul, li, body, dl, small, blockquote, .help-block, label').fgColor(colors.fg);

        root.find("a:not('.alert-link')").fgColor(colors.button);

        root.find('.btn-link, .btn-default')
        .bgColor(colors.button)
        .brdColor(colors.button.darken(10))
        .fgColor(colors.button_fg);

        // background - widgets (Active states)
        root.find('.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus, .nav-tabs>li.active>a, .nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus, .pagination>.active>a, .pagination>.active>span, .pagination>.active>a:hover, .pagination>.active>span:hover, .pagination>.active>a:focus, .pagination>.active>span:focus, .nav-pills>li.active>a, .nav-pills>li.active>a:hover, .nav-pills>li.active>a:focus')
        .bgColor(colors.widget_active_bg)
        .fgColor(colors.fg)
        .brdColor(colors.widget_border);

        // backgrounds (darker) - widgets
        root.find('.panel-default>.panel-heading, .well, .breadcrumb, .jumbotron')
        .fgColor(colors.bg)
        .bgColor(tinycolor(colors.bg).darken(20));
        root.find('.panel-default>.panel-heading *, .jumbotron *')
        .fgColor(colors.dark_base ? colors.fg_light : colors.fg_dark);

        root.find('.panel-default>.panel-heading, .navbar.navbar-inverse')
        .bgColor(colors.base_highlight)
        .fgColor(colors.bg);

        // backgrounds (darker) with highlight colors - invert fg/bg
        root.find('.well h1, .jumbotron h1, .navbar.navbar-inverse h1, .breadcrumb>.active')
        .fgColor(colors.fg);

        root.find('.well, blockquote').brdColor(colors.base_highlight);
        root.find('.navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:hover, .navbar-inverse .navbar-nav>.active>a:focus')
        .bgColor(colors.dark_base ? colors.base_highlight.lighten(4) : colors.base_highlight.darken(4))
        .fgColor(colors.bg)
        .brdColor(colors.dark_base ? colors.base_highlight.lighten(3) : colors.base_highlight.darken(3));

        // Tables
        root.find('.table.table-striped')
            .bgColor(colors.table)
            .fgColor(colors.table_fg)
            .brdColor(colors.bg.darken(12));

        root.find('.table-striped>tbody>tr:nth-child(odd)')
            .bgColor(colors.table_alt)
            .fgColor(colors.table_fg_alt);

        root.find('.table-bordered, .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td')
            .brdColor(colors.table_bg_border);

        // backgrounds (accent) - widgets
        root.find('.page-header').brdColor(colors.dark_base ? colors.base.lighten(4) : colors.base.darken(4));

        // Statuses - alerts, labels, progressbar, text
        var success = tinycolor($('.progress-bar-success').css('background-color')).saturate(colors.lum);
        root.find('.alert-danger, .label-danger, .progress-bar-danger').bgColor(colors.danger);
        root.find('.alert-success, .label-success, .progress-bar-success').bgColor(colors.success);
        root.find('.alert-info, .label-info, .progress-bar-info').bgColor(colors.info);
        root.find('.alert-warning, .label-warning, .progress-bar-warning').bgColor(colors.warning);
        root.find('.text-danger').fgColor(colors.danger);
        root.find('.text-success').fgColor(colors.success);
        root.find('.text-info').fgColor(colors.info);
        root.find('.text-warning').fgColor(colors.warning);

        exportCSS(styles);
    }

    function exportCSS(styles) {
        $('#exported-output').html(extractCSS(styles));
        $('#temp-font-style-font').html(font_css);
    }

    function extractCSS(declarations) {
        var html = '';
        $.each(declarations, function(k, declaration){
            html += declaration + '\n';
        });
        return html;
    }

    function _load() {
        // $gen.load('templates/app-bootstrap-type1.html', initColorPicker);
        // $gen.load('templates/app-bootstrap-type2.html', initColorPicker);
        $gen.load('templates/app-bootstrap-type3.html', initColorPicker);
        // $gen.load('templates/startup-style.html', initColorPicker);
    }

    function init() {
        initEvents();
        // try {
        //     $.get('https://www.googleapis.com/webfonts/v1/webfonts?key=' + FONTS_KEY, function (d) {
        //         if(d.items) {
        //             font_data = d.items;
        //         }
        //         _load();
        //     });
        // } catch(e) {
        //     _load();
        // }
        _load();
    }
    return {
        init: init
    };

})();

$(document).ready(schemeLayout.init);
