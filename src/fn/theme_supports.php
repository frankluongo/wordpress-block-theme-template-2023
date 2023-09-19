<?php

if (!function_exists('add_theme_supports')) :
  /**
   * Sets up theme defaults and registers support for various WordPress features.
   *
   * Note that this function is hooked into the after_setup_theme hook, which runs
   * before the init hook.
   */
  function add_theme_supports()
  {
    // Add support for block styles.
    add_theme_support('wp-block-styles');

    // Enqueue editor styles.
    add_editor_style('editor-style.css');
    // Basic supports
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_theme_support('html5', array('style', 'script',));
    add_theme_support('automatic-feed-links');
    // Block-specific supports
    add_theme_support('editor-font-sizes', array());
    add_theme_support('custom-line-height');
    add_theme_support('align-wide');
    add_theme_support('editor-color-palette', array());
    add_theme_support('editor-gradient-presets', array());
    add_theme_support('custom-spacing');
    add_theme_support('custom-units', array());
  }
endif; // add_theme_supports
add_action('after_setup_theme', 'add_theme_supports');
