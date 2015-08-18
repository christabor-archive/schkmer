function ColorSchemerProxy() {
    var self = this;
    this.active_scheme = null;
    this.setActive = function(name) {
        self.active_scheme = name;
    };
    this.schemeOriginal = function() {
        // Seeded color scheme
        var schemer = new ColorSchemer();
        return {
            'neutralLightCool'            : schemer.themes.neutral.light.cool(),
            'neutralLightWarm'            : schemer.themes.neutral.light.warm(),
            'neutralDarkCool'             : schemer.themes.neutral.dark.cool(),
            'neutralDarkWarm'             : schemer.themes.neutral.dark.warm(),
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
    };
    this.getActive = function() {
        var schemes = {
            original: self.schemeOriginal
        };
        return schemes[self.active_scheme]();
    };
}
