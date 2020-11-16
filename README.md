# ned Project: Learning Wordpress, PHP and JS

## Wordpress Developement Environment Setup

* Install xampp

* Install wordpress on htdocs folder of xampp installation. You can access the website by writing "localhost/nameofthewebsitefolder" in the browser address bar. Then go to admin panel of MySQL in xampp to create the database for your website. 

* If you need to have backup of your local site, first copy the wordpress folder which is located in xampp/htdocs and paste it somewhere. Then go to MySQL panel click on website database name and go to export tab to get a copy of your database. You can import the database by first deleting the corrupted database and then importing the backup database.

* Create a theme folder on wp-content/themes
 
 Inside the theme folder it is necessary to have at list two files: **1- index.php and 2- style.css**. These names matter! The screenshot.png file
 should be **1200*900**. You can write some information about the theme in style.css file.
 
* Modify wp-config.php to activate the debugging mode:

  * define( 'WP_DEBUG', true );

  * define( 'WP_DEBUG_LOG', true );
  
  * define( 'WP_DEBUG_DISPLAY', false );
  When new errors are catched, a `debug.log` file will automatically be created in `wp-content` folder.
  
 * In order to go live with your website, first install **all-in-one wp migration** plugin and export the wp data and import it in your from your admin live wordpress import the data. 
 
 * In order to load fresh js and css files on each reload of the page, we need to change the version of the file when calling it in `wp_enqueue_scripts`.

## How Wordpress works

* Wordpress knows what post to query from the database based on the url (permalink or slug) that we visit. On home page wordpress automatically query the 10 most recent posts. 

* **index.php** acts as a fall-back or the last line of defence when there is no other file to power the link url that we are asking for.
**page.php** is what powers pages posts and **single.php** is what powers general posts. In summary, wordpress is always on the lookout for 
different php files in the theme directory to see which one to use to power the specific url that we are asking for.

* After creating index.php you are going to need to add **header.php** and **footer.php** and include `get_header()` and `get_footer()` in 
various php files that you need to create hereafter such as page.php and single.php.

* `wp_head()` function lets wordpress to be in control of the `head` section so that if you add a plugin later and it has its own css files, wordpress would take care of them too.

* `functions.php` lets us to have a conversation with the wordpress system. All the other php files in theme folder are actually template files which dictates how an html file is shown to the user. 

* `add_action()` function is very important because this is the function that tells wordpress **what to do when!**. The first argument of this 
function is responsible for this. These first arguments are the **hooks** that we need to hook on to. The second argument is the name of the function we want to wordpress to run.

* `wp_footer()` at the end of the **footer.php** file (right before the ending body tag) is responsible for activating the js files which typically run at the end of the page loading. 

* In order to make generic menus and showing the menu link in admin panel, we need to add `register_nav_menu('headerMenu', 'Header Menu')` to `add_theme_support` hook. Then in the html, use `wp_nav_menu` function to use the menu you created in the admin panel.

* "Custom Post Types" and "Custom Fields" allow us to programmatically relate different content together.

## Common Wordpress Functions
```
bloginfo('the_title') | bloginfo('description')
the_post()
have_posts()
the_permalink()
the_title()
the_content()
get_footer()
get_header()
wp_head() // lets wordpress to be in control of the head section
wp_footer() 
wp_enqueue_style('university_styles', get_stylesheet_uri())
add_theme_support('title-tag') // there are many features we can enable using this function.
site_url()
get_the_ID() // gives the id of the current page that is viewed. 
wp_get_post_parent_ID() // It takes an id of a page or a post and gives back the id of its parent.
wp_list_pages(array()) // This outputs links to every page on the website.
get_pages(array()) // return the pages in memory.
language_attributes() // place this inside the opening html tag to tell web browsers what language our website is using. This depends on the language you set in the wordpress setting.
<meta charset="<?php bloginfo("charset") ?>" > 
<body <?php body_class() ?> > // This gives you all types of information you might need to know about the page that you are viewing and you can use the class names in developing the `css` and `javascript` for  your website.
register_nav_menu('headerMenuLocation', 'Header Menu Location') // If you want to add the menu option to the appearance menu of wordpress dashboard. Its hook is `after_setup_theme`

```

## Common wordpress hooks
```
// First argument of the below functions, is the name of the wordpress "event" that we want to "hook" on to.
add_action('wp_enqueue_scripts', 'functionname') // to attach js and css files to our project
add_action('after_setup_theme', 'functionname') // 
```


