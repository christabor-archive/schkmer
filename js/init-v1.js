var schemeLayout = (function(){
    var all_btn      = $('#random-all');
    var colors_btn   = $('#random-colors');
    var NAMESPACE    = '#layout-gen';
    var $gen         = $(NAMESPACE);
    var fonts_btn    = $('#random-fonts');
    var font_data    = null;
    var dark_active  = true;
    var light_active = true;
    var toggled      = true;
    var scheme_proxy = new ColorSchemerProxy();
    var dispatcher   = new ColorDispatcher($gen, scheme_proxy, $('#template-container'), {
        bootstrap_nested    : 'templates/bootstrap-nested.html',
        bootstrap           : 'templates/bootstrap.html',
        tags                : 'templates/tags.html',
        app_bootstrap_type1 : 'templates/app-bootstrap-type1.html',
        app                 : 'templates/startup-style.html',
        blocks              : 'templates/blocks.html',
        material_ui         : ''
    });

    function previewMode(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if(toggled) $('#options, .swatches').hide();
        if(!toggled) $('#options, .swatches').show();
        $gen.toggleClass('container-fluid container');
        toggled = !toggled;
    }

    function buildFontCSS(fonts) {
        return [
            makeCSSRule('h1', {'font-family': fonts[0].family}),
            makeCSSRule('h2, h3, h4, .btn', {'font-family': fonts[1].family}),
            makeCSSRule('body, p, ol, ul, small', {'font-family': fonts[2].family}),
        ].join('\n');
    }

    function generateFonts(e) {
        var fonts = randomFonts(3, font_data);
        var url0  = buildUrlFragment(fonts[0]);
        var url1  = buildUrlFragment(fonts[1]);
        var url2  = buildUrlFragment(fonts[2]);
        var full_url = 'http://fonts.googleapis.com/css?family=' + [url0, url1, url2].join('|');
        var link_html = updateHref('#goog-font', full_url);
        updateFontCSS({
            'h1': fonts[0].family,
            'h2, h3, h4': fonts[1].family,
            'p, ol, ul, small': fonts[2].family,
            '.btn': fonts[1].family
        });
        var css = buildFontCSS(fonts) + '\n\n' + link_html;
        $("#exported-output-fonts").text(css);
        $('#temp-font-style-font').html(css);
    }

    function updateFontCSS(font_data) {
        var style_str = '';
        $.each(font_data, function(selector, font){
            style_str += (' .wrapper ' + selector + '{ font-family:"' + font + '"; }\n');
        });
        $('#temp-font-style-color').html(style_str);
    }

    function initEvents() {
        $('#preview').on('click', previewMode);
        $('#border-radius').on('change', function(e) {
            $gen.find('.btn').css('border-radius', $(this).val() + 'px');
        });
        fonts_btn.on('click', generateFonts);
        colors_btn.on('click', function(e){
            e.preventDefault();
            dispatcher.activate();
        });
        all_btn.on('click', function(e){
            e.preventDefault();
            generateFonts();
            dispatcher.activate();
        });
        $('#modes').empty();
        $.each(dispatcher.getModeNames(), function(_, name){
            $('#modes').append('<li><a href="#" data-mode="' + name + '">' + name.split('_').join(' ') + '</a></li>')
        });
        $('#modes').on('click', 'a', function(e){
            var active_mode = $(this).attr('data-mode');
            dispatcher.activate(active_mode);
        });
    }

    function start() {
        initEvents();
        setTimeout(function(){
            scheme_proxy.setActive('original');
            dispatcher.activate();
        }, 600);
    }

    function init() {
        start();
        try {
            $.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w', function (d) {
                if(d.items) {
                    font_data = d.items;
                    start();
                }
            });
        } catch(e) {
            start();
        }
    }
    return {
        init: init
    };

})();

$(document).ready(schemeLayout.init);
