function ColorSectionAnalagous(base) {
    var self = this;
    throw new Error('Not implemented');
}

function ColorSectionComplementary(base, dark, root) {
    var self = this;
    var BRIGHTNESS_AMT = 40;
    var DESATURATION_AMT = 30;
    base = tinycolor(base).analogous();
    this.$root = $(root);
    this.colors = {
        bg              : dark ? tinycolor(base[0]).darken(45) : tinycolor(base[0]).lighten(44),
        highlight       : tinycolor(base[2]).desaturate(DESATURATION_AMT / 3),
        highlight2      : tinycolor(base[2]).desaturate(DESATURATION_AMT),
        interactive     : tinycolor(base[3]).saturate(20),
        interactive_brd : base[4],
    };
    this.colors['fg'] = this.colors['bg'].isDark() ? tinycolor(base[1]).desaturate(60).lighten(BRIGHTNESS_AMT) : tinycolor(base[1]).desaturate(60).darken(BRIGHTNESS_AMT);
    this.colors['highlight'] = dark ? self.colors.highlight.darken(BRIGHTNESS_AMT / 4) : self.colors.highlight.lighten(BRIGHTNESS_AMT / 4);
    this.colors['highlight2'] = dark ? self.colors.highlight2.darken(BRIGHTNESS_AMT / 4) : self.colors.highlight2.lighten(BRIGHTNESS_AMT / 4);

    this.$root.on('click', function(){
        return self.exportCSS();
    });
    this.applyColors = function(){
        self.$root = $(root);
        self.$root.clrfy({bg: self.colors.bg});
        self.$root.find('p, ul, ol, small').clrfy({fg: self.colors.fg});
        self.$root.find('h1, blockquote, .iconpic').clrfy({fg: self.colors.highlight});
        self.$root.find('h2, h3, h4, h5, h6').clrfy({fg: self.colors.highlight2});
        self.$root.find('a').clrfy({fg: self.colors.interactive});
        self.$root.find('.btn, button').clrfy({bg: self.colors.interactive, brd: self.colors.interactive_brd});
    };
    this.getSwatches = function() {
        return self.colors;
    };
    this.exportCSS = function() {
        var colors = self.colors;
        var ramp_distance = 4;
        var css = [
            makeCSSRule('body', {color: colors['fg'], 'background-color': colors['bg']}),
            makeCSSRule('p, ul, ol, small', {color: colors['fg']}, self.$root.selector),
            makeCSSRule('h1, blockquote, .iconpic', {color: colors['fg']}, self.$root.selector),
            makeCSSRule('h2, h3, h4, h5, h6', {color: colors['highlight2']}, self.$root.selector),
            makeCSSRule('a', {color: colors['interactive']}, self.$root.selector),
            makeCSSRule('.btn, button', {
                color: colors['fg'],
                '': dualGradient(tinycolor(self.colors.interactive).lighten(ramp_distance).toHex(), tinycolor(self.colors.interactive).darken(ramp_distance).toHex()),
                border: self.colors.interactive_brd},
            '.block'),
        ].join('\n');
        $('#exported-output').html(css);
    };
}

function ColorSectionTriadic(base, dark, root) {
    var self = this;
    base = tinycolor(base).triad();
    this.$root = $(root);
    this.colors = {
        bg          : dark ? tinycolor(base[0]).darken(45) : tinycolor(base[0]).lighten(44),
        fg          : tinycolor(base[1]).desaturate(60),
        highlight   : tinycolor(base[2]).desaturate(10).lighten(30),
        highlight2  : tinycolor(base[2]).desaturate(10).lighten(40),
        interactive : tinycolor(base[2]).saturate(20),
    };
    this.colors['interactive_brd'] = tinycolor(self.colors.interactive).darken(10);
    this.colors['brd'] = tinycolor(self.colors.bg).darken(20);

    this.$root.on('click', function(){
        return self.exportCSS();
    });
    this.applyColors = function(){
        self.$root = $(root);
        self.$root.clrfy({bg: self.colors.bg, brd: self.colors.brd});
        self.$root.find('p, ul, ol, small').clrfy({fg: self.colors.fg});
        self.$root.find('h1, blockquote, .iconpic').clrfy({fg: self.colors.highlight});
        self.$root.find('h2, h3, h4, h5, h6').clrfy({fg: self.colors.highlight2});
        self.$root.find('a').clrfy({fg: self.colors.interactive});
        self.$root.find('.btn, button').clrfy({bg: self.colors.interactive, brd: self.colors.interactive_brd});
    };
    this.getSwatches = function() {
        return self.colors;
    };
    this.exportCSS = function() {
        var colors = self.colors;
        var ramp_distance = 4;
        var css = [
            makeCSSRule('body', {color: colors['fg'], 'background-color': colors['bg']}),
            makeCSSRule('p, ul, ol, small', {color: colors['fg']}, self.$root.selector),
            makeCSSRule('h1, blockquote, .iconpic', {color: colors['fg']}, self.$root.selector),
            makeCSSRule('h2, h3, h4, h5, h6', {color: colors['highlight2']}, self.$root.selector),
            makeCSSRule('a', {color: colors['interactive']}, self.$root.selector),
            makeCSSRule('.btn, button', {
                color: colors['fg'],
                '': dualGradient(tinycolor(self.colors.interactive).lighten(ramp_distance).toHex(), tinycolor(self.colors.interactive).darken(ramp_distance).toHex()),
                border: self.colors.interactive_brd},
            '.block'),
        ].join('\n');
        $('#exported-output').html(css);
    };
}

function ColorSectionPlain(base, dark, root) {
    var self = this;
    var SUBDUE_AMT = 30;
    var _base = tinycolor(base).triad();
    this.$root = $(root);
    this.colors = {
        bg          : tinycolor(base),
        highlight   : dark ? tinycolor(_base[1]).lighten(10) : tinycolor(_base[1]).darken(10),
        interactive : tinycolor(_base[2]).saturate(100),
    };
    this.colors['fg']              = tinycolor(base).isDark() ? 'white' : 'black';
    this.colors['highlight2']      = dark ? tinycolor(self.colors.fg).lighten(SUBDUE_AMT) : tinycolor(self.colors.fg).darken(SUBDUE_AMT),
    this.colors['interactive_brd'] = tinycolor(self.colors.interactive).darken(10);
    this.colors['brd']             = tinycolor(self.colors.bg).darken(20);

    this.$root.on('click', function(){
        return self.exportCSS();
    });
    this.applyColors = function(){
        self.$root = $(root);
        self.$root.clrfy({bg: self.colors.bg, brd: self.colors.brd});
        self.$root.find('p, ul, ol, small, h1, blockquote, .iconpic').clrfy({fg: self.colors.fg});
        self.$root.find('h2, h3, h4, h5, h6').clrfy({fg: self.colors.highlight2});
        self.$root.find('a').clrfy({fg: self.colors.interactive});
        self.$root.find('.btn, button').clrfy({bg: self.colors.interactive, brd: self.colors.interactive_brd});
    };
    this.getSwatches = function() {
        return self.colors;
    };
    this.exportCSS = function() {
        var css = '';
        $('#exported-output').html(css);
    };
}

function ColorSectionGrayScale(dark, root) {
    var self = this;
    var BRIGHTNESS_AMT = 50;
    var SUBDUE_AMT = 30;
    var MAX_SHADES = 6;
    var bases = tinycolor().monochromatic(MAX_SHADES);
    this.$root = $(root);
    this.colors = {
        bg          : dark ? bases[0] : bases[MAX_SHADES - 1],
        highlight   : dark ? tinycolor('white').darken(BRIGHTNESS_AMT / 2) : tinycolor('black').lighten(BRIGHTNESS_AMT / 2),
        interactive : dark ? 'white' : 'black',
    };
    this.colors['fg']              = dark ? tinycolor(self.colors.fg).darken(BRIGHTNESS_AMT) : tinycolor(self.colors.fg).lighten(BRIGHTNESS_AMT);
    this.colors['highlight2']      = dark ? tinycolor(self.colors.fg).lighten(SUBDUE_AMT) : tinycolor(self.colors.fg).darken(SUBDUE_AMT),
    this.colors['interactive_brd'] = tinycolor(self.colors.interactive).darken(10);
    this.colors['brd']             = tinycolor(self.colors.bg).darken(20);

    this.applyColors = function(){
        self.$root = $(root);
        self.$root.clrfy({bg: self.colors.bg, brd: self.colors.brd});
        self.$root.find('p, ul, ol, small, h1, blockquote, .iconpic').clrfy({fg: self.colors.fg});
        self.$root.find('h2, h3, h4, h5, h6').clrfy({fg: self.colors.highlight2});
        self.$root.find('a').clrfy({fg: self.colors.interactive});
        self.$root.find('.btn, button').clrfy({bg: self.colors.interactive, brd: self.colors.interactive_brd});
    };
    this.getSwatches = function() {
        return self.colors;
    };
    this.exportCSS = function() {
        var css = '';
        $('#exported-output').html(css);
    };
}
