function ColorDispatcher(container, scheme_proxy, template, modes) {
    var self          = this;
    this.modes        = modes;
    this.use_scheme   = true;
    this.scheme_proxy = scheme_proxy;
    this.active_mode  = 'blocks';
    this.$gen         = container;
    this.$template    = template;
    this.applicator   = new ColorApplicator();
    this.getModeNames = function() {
        var names = [];
        $.each(self.modes, function(name, _){
            names.push(name);
        });
        return names;
    }
    this.process = function() {
        // Grab data off the template container
        var template_html = self.$template.html().trim();
        var schemes = self.scheme_proxy.getActive();
        self.$gen.empty();
        // OLD WAY
        console.log(schemes);
        $.each(schemes, function(scheme_name, scheme){
            var html = [
                '<div class="row fonts" id="' + scheme_name + '">',
                    '<h2 class="scheme-title text-center">' + scheme_name + '</h2><hr />',
                    '<div class="swatches"></div>',
                    '<div class="col-md-12">' + template_html + '</div>',
                '</div>'
            ].join('');
            self.$gen.append(html);
            if(self.use_scheme) {
                self.applicator.addTestSwatches($('#' + scheme_name).find('.swatches'), scheme);
                self.applicator.applyScheme($('#' + scheme_name).find('.wrapper'), scheme);
                self.applicator.reconcile($('#' + scheme_name).find('.wrapper'), scheme);
            }
        });
    };
    this.activate = function(mode) {
        self.active_mode = mode || self.active_mode;
        console.info('Activating! `' + self.active_mode);
        var html_file = self.modes[self.active_mode];
        // Given an external HTML file, load the contents and add containers for
        // each color scheme with this HTML, showcasing each individual color
        // scheme in its own context.
        if(!html_file || html_file === null) {
            self.process();
            return;
        }
        self.$template.empty().load(html_file, function(){
            self.process();
        });
    };
}
