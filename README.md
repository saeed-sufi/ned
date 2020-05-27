# ned

## Wordpress Developement Procedure

* Install xampp

* Install wordpress on htdocs folder of xampp installation. You can access the website by writing "localhost/nameofthewebsitefolder" in the browser address bar. Then go to admin panel of MySQL in xampp to create the database for your website. 

* If you need to have backup of your local site, first copy the wordpress folder which is located in xampp/htdocs and paste it somewhere. Then go to MySQL panel click on website database name and go to export tab to get a copy of your database. You can import the database by first deleting the corrupted database and then importing the backup database.

* Create a theme folder on wp-content/themes
 
 Inside the theme folder it is necessary to have at list two files: **1- index.php and 2- style.css**. These names matter! The screenshot.png file
 should be **1200*900**. 
 
* Modify wp-config.php to activate the debugging mode:

  * define( 'WP_DEBUG', true );

  * define( 'WP_DEBUG_LOG', true );
  
  * define( 'WP_DEBUG_DISPLAY', false );

* **index.php** acts as a fall-back or the last line of defence when there is no other file to power the link url that we are asking for.
**page.php** is what powers pages posts and **single.php** is what powers general posts. In summary, wordpress is always on the lookout for 
different php files in the theme directory to see which one to use to power the specific url that we are asking for.

* After creating index.php you are going to need to add **header.php** and **footer.php** and include `get_header()` and `get_footer()` in 
various php files that you need to create hereafter such as page.php and single.php.

* `add_action()` function is very important because this is the function that tells wordpress **what to do when!**. The first argument of this 
function is responsible for this. These first arguments are the **hooks** that we need to hook on to. 

* `wp_footer()` at the end of the **footer.php** file (right before the ending body tag) is responsible for activating the js files which typically
run at the end of the page loading. 


In order to go live with your website, first install **all-in-one wp migration** plugin and export the wp data and import it in your from your admin live wordpress import the data. 



