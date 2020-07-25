const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
/* Copy */
mix.copyDirectory('resources/assets/img', 'public/assets/img');

mix.sass('resources/assets/style/sass/laravel/app.scss',
    'public/assets/style/css/app.css').
    sass('resources/assets/style/sass/style.scss',
        'public/assets/style/css/style.css').
    version();

/* JS */
mix.js('resources/assets/js/custom.js',
        'public/assets/js/custom.js').
    js('resources/assets/js/clients/client.js',
        'public/assets/js/clients/client.js').
    js('resources/assets/js/department/department.js',
        'public/assets/js/department/department.js').
    js('resources/assets/js/roles/role.js',
        'public/assets/js/roles/role.js').
    js('resources/assets/js/users/user.js',
    'public/assets/js/users/user.js').
    js('resources/assets/js/profile/profile.js',
        'public/assets/js/profile/profile.js').
    js('resources/assets/js/projects/project.js',
        'public/assets/js/projects/project.js').
    version();
