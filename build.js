({
    appDir: './',
    baseUrl: './js',
    dir: './../Digital Signage',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
		fotorama_amd:'libs/fotorama/fotoramaAMD',
		Globals:'helpers/Globals',
        text: 'text'
    },
	 inlineText: false,
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    }
})
