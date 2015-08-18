// Abstract colors
//
// Primary
// Secondary
// Tertiary
// Neutral1
// Neutral2

// Required colors profile:
// buttons
    // Hover
    // Click
    // Focus
// copy
// heading1
// heading2
// heading3
// heading4
// ul, ol
// blockquote
// section-bg-N (N depends on color scheme type.)

function ColorSchemer() {
    var self = this;
    this.makeRGBString = function(r, g, b) {
        return 'rgb(' + [r, g, b].join(',') + ')';
    };
    this.seedWarm = function(threshold) {
        threshold = threshold || 255;
        // Warm should be predominantly red, then green, then blue
        return self.makeRGBString(rando(threshold), rando(~~(threshold / 3)), rando(~~(threshold / 4)));
    };
    this.seedCool = function(threshold) {
        threshold = threshold || 255;
        // Cool should be predominantly blue, then green, then red
        return self.makeRGBString(rando(~~(threshold / 4)), rando(~~(threshold / 2)), rando(threshold));
    };
    this.setSeedColor = function(color) {
        self.seed_color = color;
    };
    // All possible theme types
    // Must always return the same object keys
    this.themes = {
        // NOTE: Shared = cool styles by default, then overridden
        // to keep things /somewhat/ DRY.

        // Neutrals still require a more vibrant CTA color

        // TODO: add a style option where multiple bgs are added, but the foreground
        //      color is always the same... light and dark options
        //      see https://dribbble.com/shots/1742752-Commerce-Analytics-Homepage-WIP/attachments/281998 for details !
        //      and sort of... https://dribbble.com/shots/1757843-Final-Card-Landing-Page/attachments/285772

        // TODO: use isReadable to filter out unreadable variations
        // TODO: don't use tags, just generic labels (e.g 'p' vs 'body copy' ?
        // TODO: add reverse/alternations
        // TODO: add config for amts
        // TODO: remove duplicate calls for matching values (e.g h1 fg / h1 fg alt)
        // TODO: replace btnHover and btnBorder with generic names, update init
        neutral: {
            light: {
                cool: function() {
                    return self.themes.neutral.light._shared(self.seedCool());
                },
                warm: function() {
                    return self.themes.neutral.light._shared(self.seedWarm());
                },
                _shared: function(seed_color) {
                    return {
                        '_seed': seed_color,

                        'section_bg': tinycolor(seed_color).desaturate(100).lighten(60),
                        'section_fg': tinycolor('#000').lighten(40),

                        'section_fg_highlight': tinycolor(seed_color).desaturate(80).lighten(5),
                        'section_fg_subdued': tinycolor(seed_color).desaturate(100).lighten(30),

                        'section_bg_interactive': tinycolor(seed_color).darken(20).saturate(80),
                        'section_fg_interactive': tinycolor(seed_color).saturate(80).lighten(40),

                        'section_alternate_bg': tinycolor(seed_color).saturate(50).darken(20),
                        'section_alternate_fg': tinycolor(seed_color).desaturate(100).lighten(50),

                        'section_alternate_fg_highlight': tinycolor(seed_color).desaturate(80).lighten(5),
                        'section_alternate_fg_subdued': tinycolor(seed_color).desaturate(100).lighten(30),

                        // Alternate of reg. fg/bg interactive
                        'section_alternate_bg_interactive': tinycolor(seed_color).saturate(80).lighten(40),
                        'section_alternate_fg_interactive': tinycolor(seed_color).saturate(80).darken(20),

                        // Old style @deprecated
                        'h2': tinycolor('black').lighten(20),
                        'h3': tinycolor('black').lighten(30),
                        'h4': tinycolor('black').lighten(40),
                        'btnBorder': tinycolor(seed_color).saturate(80).darken(40),
                        'btnHover': tinycolor(seed_color).saturate(100)
                    };
                }
            },
            dark: {
                cool: function() {
                    return self.themes.neutral.dark._shared(tinycolor(self.seedCool()));
                },
                warm: function() {
                    return self.themes.neutral.dark._shared(tinycolor(self.seedWarm()));
                },
                _shared: function(seed_color) {
                    return {
                        '_seed': seed_color,
                        'section_bg': tinycolor(seed_color).desaturate(1).darken(50),
                        'section_fg': tinycolor('black').lighten(40),

                        'section_fg_highlight': tinycolor(seed_color).desaturate(80).lighten(5),
                        'section_fg_subdued': tinycolor(seed_color).desaturate(100).lighten(30),

                        'section_bg_interactive': tinycolor(seed_color).saturate(80).lighten(20),
                        'section_fg_interactive': tinycolor(seed_color).saturate(80).darken(40),

                        'section_alternate_bg': tinycolor(seed_color).saturate(50).lighten(20),
                        'section_alternate_fg': tinycolor(seed_color).desaturate(1).darken(50),

                        'section_alternate_fg_highlight': tinycolor(seed_color).desaturate(8).darken(25),
                        'section_alternate_fg_subdued': tinycolor(seed_color).desaturate(1).darken(30),

                        // Alternate of reg. fg/bg interactive
                        'section_alternate_bg_interactive': tinycolor(seed_color).saturate(80).darken(40),
                        'section_alternate_fg_interactive': tinycolor(seed_color).saturate(80).lighten(20),

                        'h2': tinycolor('white').darken(10),
                        'h3': tinycolor('white').darken(20),
                        'h4': tinycolor('white').darken(30),
                        'btnBorder': tinycolor(seed_color).saturate(80).lighten(40),
                        'btnHover': tinycolor(seed_color).saturate(100)
                    };
                }
            }
        },
        complementary: {
            light: {
                cool: function() {
                    // Seed color is flipped because of complements
                    return self.themes.complementary.light._shared(self.seedWarm());
                },
                warm: function(){
                    // Seed color is flipped because of complements
                    return self.themes.complementary.light._shared(self.seedCool());
                },
                _shared: function(seed_color) {
                    var compl = tinycolor(seed_color).complement();
                    return {
                        '_seed': seed_color,
                        '_compl': compl,
                        'section_bg': tinycolor(compl).lighten(50),
                        'section_fg': tinycolor('black').lighten(40),

                        'section_fg_highlight': compl,
                        'section_fg_subdued': tinycolor(seed_color).desaturate(100).lighten(30),

                        'section_bg_interactive': tinycolor(seed_color).saturate(80).lighten(30),
                        'section_fg_interactive': tinycolor(seed_color).saturate(80).darken(30),

                        'section_alternate_bg': tinycolor(compl).saturate(50).darken(20),
                        'section_alternate_fg': tinycolor(seed_color).desaturate(100).lighten(60),

                        'section_alternate_fg_highlight': tinycolor(seed_color).desaturate(40).lighten(0),
                        'section_alternate_fg_subdued': tinycolor(seed_color).desaturate(100).lighten(40),

                        // Alternate of reg. fg/bg interactive
                        'section_alternate_bg_interactive': tinycolor(seed_color).saturate(80).lighten(40),
                        'section_alternate_fg_interactive': tinycolor(seed_color).saturate(80).darken(20),

                        'h2': tinycolor(seed_color),
                        'h3': tinycolor(compl).lighten(20),
                        'h4': tinycolor('black').lighten(30),

                        'btnBorder': tinycolor(seed_color).saturate(80).lighten(40),
                        'btnHover': tinycolor(compl).saturate(100)
                    };
                }
            },
            dark: {
                cool: function() {
                    // Seed color is flipped because of complements
                    return self.themes.complementary.dark._shared(self.seedWarm());
                },
                warm: function(){
                    // Seed color is flipped because of complements
                    return self.themes.complementary.dark._shared(self.seedCool());
                },
                _shared: function(seed_color) {
                    var compl = tinycolor(seed_color).complement().lighten(20);
                    return {
                        '_seed': seed_color,
                        '_compl': compl,

                        'section_bg': tinycolor(compl).darken(50),
                        'section_fg': tinycolor('white').darken(20),

                        'section_fg_highlight': compl,
                        'section_fg_subdued': tinycolor(seed_color).desaturate(100).lighten(30),

                        'section_bg_interactive': tinycolor(seed_color).saturate(80).lighten(40),
                        'section_fg_interactive': tinycolor(seed_color).saturate(80).darken(20),

                        'section_alternate_bg': tinycolor(compl).darken(20),
                        'section_alternate_fg': tinycolor(seed_color).desaturate(100).lighten(50),

                        'section_alternate_fg_highlight': tinycolor(seed_color).desaturate(40).lighten(0),
                        'section_alternate_fg_subdued': tinycolor(seed_color).desaturate(1).darken(20),

                        // Alternate of reg. fg/bg interactive
                        'section_alternate_bg_interactive': tinycolor(seed_color).saturate(80).lighten(30),
                        'section_alternate_fg_interactive': tinycolor(seed_color).saturate(80).darken(50),

                        'h2': tinycolor(seed_color).lighten(30),
                        'h3': tinycolor(compl).lighten(30),
                        'h4': tinycolor(seed_color).lighten(40),

                        'btnBorder': tinycolor(seed_color).saturate(80).lighten(40),
                        'btnHover': tinycolor(compl).saturate(100)
                    };
                }
            }
        },
        analogous: {
            light: {
                cool: function() {
                    return self.themes.analogous.light._shared(self.seedCool());
                },
                warm: function(){
                    return self.themes.analogous.light._shared(self.seedWarm());
                },
                _shared: function(seed_color) {
                    var colors = tinycolor(seed_color).analogous(4);
                    return {
                        '_seed': seed_color,
                        '_colors': colors,

                        'section_bg': tinycolor(colors[0]).lighten(55).desaturate(20),
                        'section_fg': tinycolor(colors[0]).darken(55).desaturate(20),

                        'section_fg_highlight': tinycolor(colors[1]).lighten(20),
                        'section_fg_subdued': tinycolor(colors[0]).lighten(30).desaturate(30),

                        'section_bg_interactive': tinycolor(colors[3]).saturate(100).lighten(20),
                        'section_fg_interactive': tinycolor(colors[0]).saturate(80).lighten(60),

                        'section_alternate_bg': tinycolor(colors[0]).lighten(20).desaturate(30),
                        'section_alternate_fg': tinycolor('#fff'),

                        'section_alternate_fg_highlight': tinycolor(colors[3]).saturate(60).lighten(45),
                        'section_alternate_fg_subdued': tinycolor(colors[0]).lighten(40).desaturate(20),

                        // Alternate of reg. fg/bg interactive
                        'section_alternate_bg_interactive': tinycolor(colors[0]).lighten(55).desaturate(20),
                        'section_alternate_fg_interactive': tinycolor(colors[3]).saturate(100),

                        'h2': tinycolor(colors[0]).lighten(10),
                        'h3': tinycolor(colors[1]).lighten(20),
                        'h4': tinycolor(colors[2]).lighten(30),

                        'btnBorder': tinycolor(colors[4]).saturate(80).darken(40),
                        'btnHover': tinycolor(colors[5]).saturate(100)
                    };
                }
            },
            dark: {
                cool: function() {
                    return self.themes.analogous.dark._shared(self.seedCool());
                },
                warm: function(){
                    return self.themes.analogous.dark._shared(self.seedWarm());
                },
                _shared: function(seed_color) {
                    var colors = tinycolor(seed_color).darken(15).analogous(4);
                    return {
                        '_seed': seed_color,
                        '_colors': colors,

                        'section_bg': tinycolor(colors[0]).desaturate(10),
                        'section_fg': tinycolor(colors[0]).desaturate(50).lighten(35),

                        'section_fg_highlight': tinycolor(colors[1]).lighten(40),
                        'section_fg_subdued': tinycolor(colors[0]).lighten(20).desaturate(30),

                        'section_bg_interactive': tinycolor(colors[3]).saturate(50).lighten(60),
                        'section_fg_interactive': tinycolor(colors[0]).desaturate(10),

                        'section_alternate_bg': tinycolor(colors[1]).lighten(40),
                        'section_alternate_fg': tinycolor(colors[0]).desaturate(10),

                        'section_alternate_fg_highlight': tinycolor(colors[3]).saturate(60).darken(45),
                        'section_alternate_fg_subdued': tinycolor(colors[0]).darken(40).desaturate(20),

                        // Alternate of reg. fg/bg interactive
                        'section_alternate_bg_interactive': tinycolor(colors[3]).saturate(50).lighten(40),
                        'section_alternate_fg_interactive': tinycolor(colors[2]).darken(60),

                        'h2': tinycolor(colors[0]).lighten(10),
                        'h3': tinycolor(colors[1]).lighten(20),
                        'h4': tinycolor(colors[2]).lighten(30),

                        'btnBorder': tinycolor(colors[4]).saturate(80).lighten(40),
                        'btnHover': tinycolor(colors[5]).saturate(100)
                    };
                }
            }
        },
        monochromatic: {
            dark: {
                cool: function(seed_color) {
                    alert('Implement me');
                },
                warm: function(seed_color){
                    alert('Implement me');
                }
            },
            light: {
                cool: function(seed_color) {
                    alert('Implement me');
                },
                warm: function(seed_color){
                    alert('Implement me');
                }
            }
        },
        split_complementary: {
            dark: {
                cool: function() {
                    return self.themes.split_complementary.dark._shared(self.seedCool());
                },
                warm: function(){
                    return self.themes.split_complementary.dark._shared(self.seedWarm());
                },
                _shared: function(seed_color) {
                    var colors = tinycolor(seed_color).splitcomplement();
                    return {
                        '_seed': seed_color,
                        '_colors': colors,

                        'section_bg': colors[0],
                        'section_fg': tinycolor(colors[2]).lighten(50).desaturate(70),

                        'section_fg_highlight': tinycolor(colors[1]).lighten(40).saturate(50),
                        'section_fg_subdued': tinycolor(colors[0]).lighten(20),

                        'section_bg_interactive': tinycolor(colors[2]).saturate(50).lighten(60),
                        'section_fg_interactive': tinycolor(colors[0]).desaturate(40),

                        'section_alternate_bg': tinycolor(colors[1]).lighten(30),
                        'section_alternate_fg': tinycolor(colors[0]).lighten(70).complement(40).desaturate(70),

                        'section_alternate_fg_highlight': tinycolor(colors[2]).saturate(60).darken(45),
                        'section_alternate_fg_subdued': tinycolor(colors[0]).darken(10),

                        // Alternate of reg. fg/bg interactive
                        'section_alternate_bg_interactive': tinycolor(colors[2]).saturate(50).lighten(40),
                        'section_alternate_fg_interactive': tinycolor(colors[2]).darken(60),

                        'h2': tinycolor(colors[1]).lighten(20),
                        'h3': tinycolor(colors[1]).lighten(30),
                        'h4': tinycolor(colors[2]).lighten(40),

                        'btnBorder': tinycolor(colors[2]).saturate(80).lighten(40),
                        'btnHover': tinycolor(colors[1]).saturate(100)
                    };
                }
            },
            light: {
                cool: function() {
                    return self.themes.split_complementary.light._shared(self.seedCool());
                },
                warm: function(){
                    return self.themes.split_complementary.light._shared(self.seedWarm());
                },
                _shared: function(seed_color) {
                    var colors = tinycolor(seed_color).splitcomplement();
                    return {
                        '_seed': seed_color,
                        '_colors': colors,

                        'section_bg': tinycolor(colors[0]).lighten(60),
                        'section_fg': tinycolor(colors[1]).lighten(30).desaturate(50),

                        'section_fg_highlight': tinycolor(colors[1]).darken(10).saturate(50),
                        'section_fg_subdued': tinycolor(colors[0]).darken(20),

                        'section_bg_interactive': tinycolor(colors[2]).lighten(40),
                        'section_fg_interactive': tinycolor(colors[2]).darken(50).desaturate(40),

                        'section_alternate_bg': tinycolor(colors[1]).lighten(30),
                        'section_alternate_fg': tinycolor(colors[0]).complement().lighten(70).desaturate(70),

                        'section_alternate_fg_highlight': tinycolor(colors[2]).lighten(40),
                        'section_alternate_fg_subdued': tinycolor(colors[1]).darken(50),

                        // Alternate of reg. fg/bg interactive
                        'section_alternate_bg_interactive': tinycolor(colors[2]).saturate(50).darken(40),
                        'section_alternate_fg_interactive': tinycolor(colors[2]).lighten(60),

                        'h2': tinycolor(colors[1]).lighten(20),
                        'h3': tinycolor(colors[2]).lighten(30),
                        'h4': tinycolor(colors[2]).lighten(40),

                        'btnBorder': tinycolor(colors[2]).saturate(80).darken(40),
                        'btnHover': tinycolor(colors[1]).saturate(100)
                    };
                }
            }
        },
        triadic: {
            dark: {
                cool: function(seed_color) {
                },
                warm: function(seed_color){
                }
            },
            light: {
                cool: function(seed_color) {

                },
                warm: function(seed_color){

                }
            }
        },
        tetradic: {
            dark: {
                cool: function(seed_color) {

                },
                warm: function(seed_color){

                }
            },
            light: {
                cool: function(seed_color) {

                },
                warm: function(seed_color){

                }
            }
        }
    };
}
