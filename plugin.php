<?php
/*
Plugin Name: Due Date Calculator by Calculator.iO
Plugin URI: https://www.calculator.io/due-date-calculator/
Description: This online due date calculator helps moms-to-be calculate their due date based on their last menstrual period or the date of conception.
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_due_date_calculator
*/

if (!function_exists('add_shortcode')) die("No direct call");

function display_ci_due_date_calculator(){
    $page = 'index.html';
    return '<h2><a href="https://www.calculator.io/due-date-calculator/" target="_blank"><img src="' . plugins_url('assets/images/icon-48.png', __FILE__ ) . '" width="48" height="48"></a> Due Date Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . plugins_url($page, __FILE__ ) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_due_date_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_due_date_calculator', 'display_ci_due_date_calculator' );