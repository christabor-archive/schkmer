// Applicator takes strategies for showing colors (applying)
// and renders them using the given color scheme.
function ColorApplicator(active_strategy) {
    var self = this;
    this.active_strategy = active_strategy || 'default';
    this.addTestSwatches = function(el, scheme) {
        $.each(scheme, function(k, color){
            var container = $('<div class="swatch-container"></div>');
            if($.isArray(color)) {
                container.append(k.split('_').join('\n'));
                $.each(color, function(_k, _color){
                    addSwatch(container, _color);
                });
            } else {
                container.append(k.split('_').join('\n'));
                addSwatch(container, tinycolor(color));
            }
            $(el).append(container);
        });
    };
    this.applyScheme = function(el, scheme) {
        if(self.active_strategy === 'default') {
            // OLD WAY
            $(el).clrfy({'bg': scheme.section_bg});
            $(el).find('p, ul, ol, dl, dt').clrfy({'fg': scheme.section_fg});
            $(el).find('.btn').clrfy({'brd': scheme.btnBorder, 'bg': scheme.section_bg_interactive, 'fg': scheme.section_fg_interactive});
            $(el).find('h1').clrfy({'fg': scheme.section_fg_highlight});
            $(el).find('h2').clrfy({'fg': scheme.h2});
            $(el).find('h3').clrfy({'fg': scheme.h3});
            $(el).find('h4').clrfy({'fg': scheme.h4});
            $(el).find('small').clrfy({'fg': scheme.section_fg_subdued});
            $(el).find('hr').clrfy({'brd': scheme.section_fg_subdued});
            $(el).find('a:not(.btn)').clrfy({'fg': scheme.section_bg_interactive});
            $(el).find('.alternate').clrfy({'bg': scheme.section_alternate_bg, 'fg': scheme.section_alternate_fg});
            $(el).find('.alternate').find('p, ul, ol, dl, dt').clrfy({'fg': scheme.section_alternate_fg});
            $(el).find('.alternate').find('h1, h2').clrfy({'fg': scheme.section_alternate_fg_highlight});
            $(el).find('.alternate').find('small, h3, h4, .brandable-icon').clrfy({'fg': scheme.section_alternate_fg});
            $(el).find('.alternate').find('small').clrfy({'fg': scheme.section_alternate_fg_subdued});
            $(el).find('.alternate').find('.btn').clrfy({'brd': scheme.btnBorder, 'bg': scheme.section_alternate_bg_interactive, 'fg': scheme.section_alternate_fg_interactive});
            $(el).find('.alternate').find('hr').clrfy({'brd': scheme.section_alternate_fg_subdued});
            $(el).find('.alternate').find('a:not(.btn)').clrfy({'fg': scheme.section_alternate_bg_interactive});
        } else if(self.active_strategy === 'blocks') {

            var is_dark = false;
            var s1base = randomColorHex();

            var section1 = new ColorSectionAnalagous(randomColorHex(), is_dark, '.block1');
            var section2 = new ColorSectionAnalagous(randomColorHex(), is_dark, '.block2');
            var section3 = new ColorSectionAnalagous(randomColorHex(), is_dark, '.block3');
            var section4 = new ColorSectionAnalagous(randomColorHex(), is_dark, '.block4');

            // var section1 = new ColorSectionComplementary(randomColorHex(), is_dark, '.block');
            // var section2 = new ColorSectionComplementary(randomColorHex(), !is_dark, '.block');
            // var section3 = new ColorSectionComplementary(randomColorHex(), is_dark, '.block');
            // var section4 = new ColorSectionComplementary(randomColorHex(), !is_dark, '.block');

            // var section1 = new ColorSectionTriadic(s1base);
            // var section2 = new ColorSectionTriadic(tinycolor(s1base).complement());
            // var section3 = new ColorSectionTriadic(randomColorHex(), is_dark, '.block1');
            // var section4 = new ColorSectionTriadic(randomColorHex(), is_dark, '.block2');

            // var section1 = new ColorSectionPlain(s1base, is_dark, '.block1');
            // var section2 = new ColorSectionPlain(tinycolor(s1base).complement(), is_dark, '.alternate');
            // var section3 = new ColorSectionPlain(randomColorHex(), is_dark, '.block3');
            // var section4 = new ColorSectionGrayScale(is_dark, '.footer');

            section1.applyColors();
            section2.applyColors();
            section3.applyColors();
            section4.applyColors();
        }
    };
    this.reconcile = function() {
        // Reconciles any invisible/illegible combinations, post-application.
    };
}
