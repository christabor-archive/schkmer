class ColorSection
    self             = this
    BRIGHTNESS_AMT   = 40
    DESATURATION_AMT = 30
    SUBDUE_AMT       = 6

    constructor: (@base, @dark, @root) ->
        @$root = $(root)
        @colors = {bg: '', fg: '', highlight: '', interactive: ''}

    applyColors: ->
        console.log 'applying...'

    genSwatches: ->
        return self.colors

    exportCSS: ->
        console.log 'exporting css...'

    addEvents: ->
        self.$root.on 'click', () ->
            return self.exportCSS()


class ColorSectionAnalagous extends ColorSection

    constructor: ->
        throw new Error 'Not implemented'


class ColorSectionComplementary extends ColorSection
    base = tinycolor(@base).analogous()
    colors = {
        bg              : if @dark then tinycolor(base[0]).darken 45 else tinycolor(base[0]).lighten 44
        highlight       : tinycolor(base[2]).desaturate @DESATURATION_AMT / 3
        highlight2      : tinycolor(base[2]).desaturate @DESATURATION_AMT
        interactive     : tinycolor(base[3]).saturate 20
        interactive_brd : base[4]
    }

    applyColors: ->
        self.$root.find('p, ul, ol, small').clrfy         { fg: self.colors.fg}
        self.$root.find('h1, blockquote, .iconpic').clrfy { fg: self.colors.highlight}
        self.$root.find('h2, h3, h4, h5, h6').clrfy       { fg: self.colors.highlight2}
        self.$root.find('a').clrfy                        { fg: self.colors.interactive}
        self.$root.find('.btn, button').clrfy             { bg: self.colors.interactive, brd: self.colors.interactive_brd}

    exportCSS: ->
        colors = self.colors
        ramp_distance = 4
        grad = dualGradient(tinycolor(self.colors.interactive).lighten(ramp_distance).toHex() tinycolor(self.colors.interactive).darken(ramp_distance).toHex())
        css = [
            makeCSSRule 'body',                     {color: colors['fg'], 'background-color': colors['bg']}
            makeCSSRule 'p, ul, ol, small',         {color: colors['fg']}, self.$root.selector
            makeCSSRule 'h1, blockquote, .iconpic', {color: colors['fg']}, self.$root.selector
            makeCSSRule 'h2, h3, h4, h5, h6',       {color: colors['highlight2']}, self.$root.selector
            makeCSSRule 'a',                        {color: colors['interactive']}, self.$root.selector
            makeCSSRule '.btn, button',             {color: colors['fg'], '': grad, border: self.colors.interactive_brd}
            '.block'
        ]
        css.join('\n')
        $('#exported-output').html(css)


class ColorSectionTriadic extends ColorSection
    self = this
    base = tinycolor(@base).triad()
    @colors = {
        bg          : if @dark then tinycolor(base[0]).darken 45 else tinycolor(base[0]).lighten 44
        fg          : tinycolor(base[1]).desaturate(60)
        highlight   : tinycolor(base[2]).desaturate(10).lighten(30)
        highlight2  : tinycolor(base[2]).desaturate(10).lighten(40)
        interactive : tinycolor(base[2]).saturate(20)
    }
    @colors['interactive_brd'] = tinycolor(self.colors.interactive).darken(10)
    @colors['brd'] = tinycolor(self.colors.bg).darken(20)

    @applyColors: ->
        self.$root = $(root)
        self.$root.clrfy                                  { bg: self.colors.bg, brd: self.colors.brd}
        self.$root.find('p, ul, ol, small').clrfy         { fg: self.colors.fg}
        self.$root.find('h1, blockquote, .iconpic').clrfy { fg: self.colors.highlight}
        self.$root.find('h2, h3, h4, h5, h6').clrfy       { fg: self.colors.highlight2}
        self.$root.find('a').clrfy                        { fg: self.colors.interactive}
        self.$root.find('.btn, button').clrfy             { bg: self.colors.interactive, brd: self.colors.interactive_brd}

    @exportCSS: ->
        colors = self.colors
        ramp_distance = 4
        css = [
            makeCSSRule 'body', {color: colors['fg'], 'background-color': colors['bg']}
            makeCSSRule 'p, ul, ol, small', {color: colors['fg']}, self.$root.selector
            makeCSSRule 'h1, blockquote, .iconpic', {color: colors['fg']}, self.$root.selector
            makeCSSRule 'h2, h3, h4, h5, h6', {color: colors['highlight2']}, self.$root.selector
            makeCSSRule 'a', {color: colors['interactive']}, self.$root.selector
            makeCSSRule '.btn, button', {
                color: colors['fg'],
                '': dualGradient(tinycolor(self.colors.interactive).lighten(ramp_distance).toHex() tinycolor(self.colors.interactive).darken(ramp_distance).toHex())
                border: self.colors.interactive_brd},
            '.block'
        ]
        css.join('\n')
        $('#exported-output').html(css)

class ColorSectionPlain extends ColorSection
    self        = this
    SUBDUE_AMT  = 30
    base       = tinycolor(@base).triad()
    @colors = {
        bg          : tinycolor(base),
        highlight   : if @dark then tinycolor(base[1]).lighten 10 else tinycolor(base[1]).darken 10
        interactive : tinycolor(base[2]).saturate(100),
    }
    @colors['fg']              = if tinycolor(base).isDark() then 'white' else 'black'
    @colors['highlight2']      = if @dark then tinycolor(self.colors.fg).lighten(SUBDUE_AMT) else tinycolor(self.colors.fg).darken(SUBDUE_AMT)
    @colors['interactive_brd'] = tinycolor(self.colors.interactive).darken(10)
    @colors['brd']             = tinycolor(self.colors.bg).darken(20)

    @applyColors: ->
        self.$root.clrfy({bg: self.colors.bg, brd: self.colors.brd})
        self.$root.find('p, ul, ol, small, h1, blockquote, .iconpic').clrfy({fg: self.colors.fg})
        self.$root.find('h2, h3, h4, h5, h6').clrfy({fg: self.colors.highlight2})
        self.$root.find('a').clrfy({fg: self.colors.interactive})
        self.$root.find('.btn, button').clrfy({bg: self.colors.interactive, brd: self.colors.interactive_brd})

class ColorSectionGrayScale extends ColorSection
    self           = this
    BRIGHTNESS_AMT = 50
    SUBDUE_AMT     = 30
    MAX_SHADES     = 6
    bases          = tinycolor().monochromatic(MAX_SHADES)
    @colors    = {
        bg          : if @dark then bases[0] else bases[MAX_SHADES - 1],
        highlight   : if @dark then tinycolor('white').darken(BRIGHTNESS_AMT / 2) else tinycolor('black').lighten(BRIGHTNESS_AMT / 2),
        interactive : if @dark then 'white' else 'black',
    }
    @colors['fg']              = if @dark then tinycolor(self.colors.fg).darken(BRIGHTNESS_AMT) else tinycolor(self.colors.fg).lighten(BRIGHTNESS_AMT)
    @colors['highlight2']      = if @dark then tinycolor(self.colors.fg).lighten(SUBDUE_AMT) else tinycolor(self.colors.fg).darken(SUBDUE_AMT)
    @colors['interactive_brd'] = tinycolor(self.colors.interactive).darken 10
    @colors['brd']             = tinycolor(self.colors.bg).darken 20

    @applyColors: ->
        self.$root = $(self.root)
        self.$root.clrfy({bg: self.colors.bg, brd: self.colors.brd})
        self.$root.find('p, ul, ol, small, h1, blockquote, .iconpic').clrfy({fg: self.colors.fg})
        self.$root.find('h2, h3, h4, h5, h6').clrfy({fg: self.colors.highlight2})
        self.$root.find('a').clrfy({fg: self.colors.interactive})
        self.$root.find('.btn, button').clrfy({bg: self.colors.interactive, brd: self.colors.interactive_brd})
