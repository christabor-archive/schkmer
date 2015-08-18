function ColorExtractor() {
    var self = this;
    this.updateStylesheet = function(el, scheme) {
        var css = [
            el.selector + ' .container-fluid {',
                'background-color: ' + scheme.section_bg + ';}',

            el.selector + ' p',
            el.selector + ' ul',
            el.selector + ' ol',
            el.selector + ' dl',
            el.selector + ' td {',
                'color: ' + scheme.section_fg + ';}',

            el.selector + ' .btn {',
                'border-color: ' + scheme.btnBorder + ';',
                'background-color: ' + scheme.section_bg_interactive + ';',
                'color: ' + scheme.section_fg_interactive + ';}',

            el.selector + ' h1 {',
                'color: ' + scheme.section_fg_highlight + ';}',

            el.selector + ' h2 {',
                'color: ' + scheme.h2 + ';}',

            el.selector + ' h3 {',
                'color: ' + scheme.h3 + ';}',

            el.selector + ' h4 {',
                'color: ' + scheme.h4 + ';}',

            el.selector + ' small {',
                'color: ' + scheme.section_fg_subdued + ';}',

            el.selector + ' hr {',
                'border-color: ' + scheme.section_fg_subdued + ';}',

            el.selector + ' a:not(.btn) {',
                'color: ' + scheme.section_bg_interactive + ';}',

            el.selector + ' .alternate {',
                'background-color: ' + scheme.section_alternate_bg + ';',
                'color: ' + scheme.section_alternate_fg + ';}',

            el.selector + ' .alternate p,',
            el.selector + ' .alternate ul, .alternate ol,',
            el.selector + ' .alternate dl, .alternate dt {',
                'color: ' + scheme.section_alternate_fg + ';}',

            el.selector + ' .alternate .h1, h2 {',
                'color: ' + scheme.section_alternate_fg_highlight + ';}',

            el.selector + ' .alternate small,',
            el.selector + ' .alternate h3,',
            el.selector + ' .alternate h4, .brandable-icon {',
                'color: ' + scheme.section_alternate_fg + ';}',

            el.selector + ' .alternate small {',
                'color: ' + scheme.section_alternate_fg_subdued + ';}',

            el.selector + ' .alternate .btn {',
                'border-color: ' + scheme.btnBorder + ';',
                'background-color: ' + scheme.section_alternate_bg_interactive + ';',
                'color: ' + scheme.section_alternate_fg_interactive + ';}',

            el.selector + ' .alternate hr {',
                'border-color: ' + scheme.section_alternate_fg_subdued + ';}',

            el.selector + ' .alternate .a:not(.btn) {',
                'color: ' + scheme.section_alternate_bg_interactive + ';}',
        ].join('\n');
        $('#css-code').val($('#css-code').val() + css);
        $('#temp-font-style-color').html($('#temp-font-style-color').html() + css);
    };
}
