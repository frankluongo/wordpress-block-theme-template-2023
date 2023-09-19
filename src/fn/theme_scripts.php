<?php
if (!function_exists('theme_scripts')) :
  function theme_scripts()
  {
    // Name Stylesheet.
    $app_styles = 'app-stylesheet';
    // Register theme stylesheet.
    $theme_version = wp_get_theme()->get('Version');
    $version_string = is_string($theme_version) ? $theme_version : false;

    global $post;

    wp_register_style($app_styles, get_template_directory_uri() . '/assets/styles/app.css', array(), $version_string);
    wp_enqueue_script('app', get_template_directory_uri() . '/assets/scripts/app.js');

    // Enqueue theme stylesheet.
    wp_enqueue_style($app_styles);

    global $post;

    wp_reset_postdata();
  }
endif;

add_action('wp_enqueue_scripts', 'theme_scripts');
