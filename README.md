# ned Project: Learning Wordpress, PHP and JS

## Wordpress Developement Environment Setup

* A `collation` in database, will determine how the characters are sorted and compared. 

* Remember to delete `install.php` file from `wp-admin` folder in `public-html` root of the server.

* always use `wp-config.php` file to edit and install wordpress instead of using the wordpress gui installer.

* If you need to have backup of your local site, first copy the wordpress folder which is located in xampp/htdocs and paste it somewhere. Then go to MySQL panel click on website database name and go to export tab to get a copy of your database. You can import the database by first deleting the corrupted database and then importing the backup database.
 
 Inside the theme folder it is necessary to have at list two files: **1- index.php and 2- style.css**. These names matter! The screenshot.png file
 should be **1200*900**. You can write some information about the theme in style.css file.
 
* Modify wp-config.php to activate the debugging mode:

  * define( 'WP_DEBUG', true );

  * define( 'WP_DEBUG_LOG', true );
  
  * define( 'WP_DEBUG_DISPLAY', false );
  When new errors are catched, a `debug.log` file will automatically be created in `wp-content` folder.
  
* In order to hide extra files and folders from vs code sidebar while developing wordpress themes, add following code to `settings.json`: 
```
    "files.exclude": {
        "*.php":true,
        "license.txt": true,
        "readme.html": true,
        ".htaccess": true,
        "node_modules/":true,
        "wp-admin/": true,
        "wp-includes":true,
        "wp-content/uploads/":true,
        "wp-content/plugins/":true,
        "wp-content/index.php": true,
        "wp-content/themes/index.php": true,
        "wp-content/themes/closeup_studio/index.php": true,
        "wp-content/themes/closeup_studio/screenshot.png": true,
        "wp-content/themes/closeup_studio/style.css": true,
        "wp-content/debug.log": true,
    }
```

* In order to go live with your website, first install **all-in-one wp migration** plugin and export the wp data and import it in your from your admin live wordpress import the data.

## How Wordpress works

* Wordpress knows what post to query from the database based on the url (permalink or slug) that we visit. On home page wordpress automatically query the 10 most recent posts. 

* the root directory of wordpress help load and setup wordpress. The files inside `wp-includes` folder provides functions and classes that help wordpress process requests. No logic is implemented in them and they can do nothing on their own. 

*  The files in the root directory of wp installation, determine what file should be loaded on every page request.

* wordpress uses `index.php` file to handle a majority of requests. But in admin side of the wordpress (files in wp-admin folder) `index.php` file doesn't handle anything. 

* **index.php** acts as a fall-back or the last line of defence when there is no other file to power the link url that we are asking for.

* In xampp panel open apache `php.ini` file and edit the following 3 parameters: 
```
 max_execution_time = 500 // by setting this value to a high number you would avoid time_out errors if execution of your scripts takes a bit longer than expected.
 post_max_size = 50M // this will allow us to submit large requests up to 50mb. 
 upload_max_filesize = 50M 
```
* wordpress goes to theme folder and scan the `file_header` section of the file located in every theme folder to get `meta_information` it needs about a theme.

* the `tags` meta information in the `file_header` of `style.css` file is used by Wordpress theme's repository. If you plan to upload your theme to wp repository it's important to have it. 

* name `text domain` property of `style.css` file header to your theme name. If you want your themes or plugins to be translate-ready, then set the `text domain` to something unique. It's a unique id for our translations. 

* all the theme's logic are placed in `functions.php` file. This file is executed before all the template files. 

* Always use `get_theme_file_path` to point to files as it provides full system path. `get_theme_file_uri` will return full web url.

* When a user makes a request, wp will go to the db and start deciding what needs to be loaded. Theme and plugins will load afterwards. When theme is loaded wp would look for `functions.php` file inside theme folder and start executing it line by line. 

* `register`ing a stylesheet will tell wp about a stylesheet where it can be called later. While `enqueue`ing a stylesheet tells wp to load the stylesheet right away. So, it's best to register first and then enqueue.

* Never ever override defautl wp scripts. Including jQuery.

**page.php** is what powers pages posts and **single.php** is what powers general posts. In summary, wordpress is always on the lookout for 
different php files in the theme directory to see which one to use to power the specific url that we are asking for.

* After creating index.php you are going to need to add **header.php** and **footer.php** and include `get_header()` and `get_footer()` in 
various php files that you need to create hereafter such as page.php and single.php.

* `wp_head()` function lets wordpress to be in control of the `head` section so that if you add a plugin later and it has its own css files, wordpress would take care of them too.

* `functions.php` lets us to have a conversation with the wordpress system. All the other php files in theme folder are actually template files which dictates how an html file is shown to the user. 

* `add_action()` function is very important because this is the function that tells wordpress **what to do when!**. The first argument of this 
function is responsible for this. These first arguments are the **hooks** that we need to hook on to. The second argument is the name of the function we want to wordpress to run.

* `wp_footer()` at the end of the **footer.php** file (right before the ending body tag) is responsible for activating the js files which typically run at the end of the page loading. 

* If you have more than one footer or header template, you can include them in other templates via `get_header('v2')` for a template with the title of `header-v2.php`.

* In order to make generic menus and showing the menu link in admin panel, we need to add `register_nav_menu('headerMenu', 'Header Menu')` to `add_theme_support` hook. Then in the html, use `wp_nav_menu` function to display the menu in template.

* "Custom Post Types" and "Custom Fields" allow us to programmatically relate different content together.

* `front-page.php` is used to power the home page and `index.php` is used to output the generic blog listing screen.

* Wordpress makes default queries based on the links of each page or posts. If we need to query whatever we want from the database, we need to use costume query `WP_Query()`.

* Remember to always use `wp_reset_postdata()` after the while loop of the costume query ends. This way everything get backs to the state it was back when we hadn't still defined a custome query. 

* A hook is a way for you to listen to an event and execute code when that event happens. This is what Wordpress calls the plugins API.

* It's the best practice to always name your functions and handles with a prefix so that we don't run into any naming conflicts between plugins.

* `after_setup_theme` hook is called when theme is loaded internally which means all the functions defined in the `functions.php` is loaded.

* `__` is a specia function created by wordpress. It allows for text to be translated to various languages. You need to pass `text domain` as its second parameter which acts as an id so that wp knows this translation relates to the theme not to other plugins.

* `body_class` function inside the opening `body` tag gives you the classes that wp use to apply to the template. It has default classes applied as default even when you don't add `body_class` function applied. Taking advantage of these classes, is optional. wp adds a class to the `body` tag which tells you about the device size: `device-xm, device-sm ,...`

* use minimal css to style widgets. It's hard to apply it to dynamic sidebars. There might be some trials and errors involved. `before_widget` is a container tag for the whole widget.

* when there is conflicts between our theme styling with default html and css that wp imposes, it's easier to just edit our template css files. 

* even if you are providing your own styling for the widgets, you're required to stylize the default widgets as well. 

* always use `get_the_date` instead of `the_date` function. `the_date` function acts funny with dating posts that are generated in the same date.

* **always** register and then enqueue the styles and scripts because the plugins that do compression, modification and concatenation will only work if you have registered styles and scripts first. 

* `single.php` vs `singular.php`: The post types that come bundled with wp, with the exception of post type posts, do not use `single.php` template. `singular.php` template, is the universal post type template. It doesn't matter if the post type is custome or in-built, the `singular.php` template will be used

* In Gutenberg editor you can use `page break` block to make your post span multiple pages. Then do not forget to use `wp_link_pages()` in your template to link these pages together.

* `WP_Query` class is beneficial in the following contexts: 
  * add a list of related posts to the current post filtering categories
  * creating two loops in the same page. ex. FAQ page with questions at the top and answers at the bottom.
  * creating a custom list of recent posts in the sidebar or the footer.
  * creating custom queries for taxonomies using more than one taxonomy to define what's displayed.

* Do not use `WP_Query` in the following scenarios:
  * If all you need to do is changing the posts are being displayed. Instead use a specific template.
  * If you want to display a few more or less posts than would normally be show. Instead use `pre_get_posts` to modify the main query.

* In pages, when creating loops, you do not need to check if for `have_posts()`. Because wp checks if a page is available and if not, it will load 404 template. 

* You can use `single_post_title` to get the title of the page outside of a loop.

* Use `_e()` to make the text content inside of some pages, translatable.

* Whenever you only need to apply some css to specific pages, it's better to use classes that wp generates by default on `body` element of the page rather than creating a very specific page template.

* wp doesn't have a template to show posts from a beginning date to the end date.

* A mime type is a way for a program/browser to identify what kind of file is being loaded; similar to extensions. 

* wp considers all file uploads as attachments. 

* By calling the function `the_post`, variable `$post` is created and you can use it anywhere you want.

* custom templates are by default enabled for pages only. 

* WordPress recognizes the subfolder page-templates. Therefore, it’s a good idea to store your global page templates in this folder to help keep them organized.

* Archive tags can be used outside of the `LOOP`.
## Order

* `category.php` is used specifically to display category pages. Unlike category template, `archive.php` template is used for various pieces of pages like tags, dates, ... . It also displays posts in chronological order.

* Category template is a special type of archive template because it displays a list of posts based on category. 

* Category Template Order: `category-{slug}.php` -> `category-{id}.php` -> `category.php` -> `archive.php` -> `index.php`.

* Page Template Order: `custom template file` -> `page-{slug}.php` -> `page-{id}.php` -> `page.php` -> `singular.php` -> `index.php`.

* `date` template is used when a user is viewing an archive which belongs to a year, month or day. It's not used very often.

* Date Template Order: `date.php` -> `archive.php` -> `index.php`.

* Attachment Template Order: `mime-type.php` -> `attachment.php` -> `single-attachment-{slug}.php` -> `single.php` -> `singular.php` -> `index.php`.

* we can use pdf viewer or video players in attachment templates by creating specific attachment template for each mime type.
## Misc notes

* Before starting an online shop answer these qs: 1- what are you selling? a. physicall objects b. downloadable digital content c. services. 2- who are you selling to? a. payment portal b. one or multiple samples c. returning the product d. saving purchase bascket e. sharing f. transportation. 3- how do you sell it? a. only online b. both online and shop c. marketer d. selling through other online shops.

* `woocommerce` and `easy digital downloads` are two most popular wp shops. 

* add `xml-prc ping services` so that search engines would be notified about your site updates.

* check your site traffic using `hypestat.com` 

* you can use `poedit` software to translate a theme. 

* `codex` is where Wordpress documents its features and how to use them. `developer` site is where you'll find documentation related to the code of the wordpress core. 

* If some code is `pluggable` it means that the code can be extended by third party plugins or wordpress itself. `comment_form()` is an example of such code. That's why it's better to use this function instead of creating the form manually. 

* For preventing spams in comments sections, we'd better use plugins to manage them.

* When you want to do modifications to a value, then you want a function that returns a value rather than output it. 

## Useful plugins

* `plugintable.com` is a website which gathers all the popular wordpress plugins.

* all in one seo
* contact form
* google xml sitemaps
* `FakerPress` to generate dummy content.
* `wp quads` to show ads on the any location in the website.
* `wp subtitle` add subtitle to (custom) posts or pages.
* 

## Common Wordpress Functions
```
bloginfo('the_title') | bloginfo('description')
the_post()
echo __FILE__ // this constant stores the full system path to the file it's being used in
have_posts() // the_post() and have_posts() are tied to difault query. 
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
wp_nav_menu(array())
is_page()
the_author_posts_link()
the_time('F')
get_the_category_list(',')
paginate_links()
is_category() // will return true if we are on a category archive screen
is_author() // will return true if we are on a author archive screen
the_archive_title() // manages all types of titles of archive posts
the_archive_description()
wp_trim_words(the_content(), 18) // Extract only the number of words you need from a content.
wp_reset_postdata()
comments_template(); comments_open(); get_comments_number();
post_password_required(); boolean, if it returns true, it means only signed in users can see the post (comment, ...).
the_comments_pagination(); add this right after the $comments loop.

```

## Common wordpress hooks
```
// First argument of the below functions, is the name of the wordpress "event" that we want to "hook" on to.
add_action('wp_enqueue_scripts', 'functionname') // to attach js and css files to our project
add_action('after_setup_theme', 'functionname') // 
```


