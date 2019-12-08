# ned

## Wordpress Developement Procedure

1- Install xampp

2- Install wordpress on htdocs folder of xampp installation

3- Create a theme folder on wp-content/themes
 
 Inside the theme folder it is necessary to have at list two files: **1- index.php and 2- style.css**. These names matter! The screenshot.png file
 should be **1200*900**. 
 
4- Modify wp-config.php to activate the debugging mode:

  * define( 'WP_DEBUG', true );

  * define( 'WP_DEBUG_LOG', true );
  
  * define( 'WP_DEBUG_DISPLAY', false );

5- **index.php** acts as a fall-back or the last line of defence when there is no other file to power the link url that we are asking for.
**page.php** is what powers pages posts and **single.php** is what powers general posts. In summary, wordpress is always on the lookout for 
different php files in the theme directory to see which one to use to power the specific url that we are asking for.

6- After creating index.php you are going to need to add **header.php** and **footer.php** and include `get_header()` and `get_footer()` in 
various php files that you need to create hereafter such as page.php and single.php.

7- `add_action()` function is very important because this is the function that tells wordpress **what to do when!**. The first argument of this 
function is responsible for this. These first arguments are the **hooks** that we need to hook on to. 

8- `wp_footer()` at the end of the **footer.php** file (right before the ending body tag) is responsible for activating the js files which typically
run at the end of the page loading. 




