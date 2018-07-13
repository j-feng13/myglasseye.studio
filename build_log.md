## S3 Static hosting 6/30
### Setup Website Buckets
1. Requirements `index.html` and `error.html` + a domain 
2. Setup Buckets
	* Create two buckets `domainname.tld` and `www.domainname.tld` 
	* Enable static hosting for `domainname.tld` in the s3 console and set `index.html` and `error.html`
	* Enable static hosting for `www.domainname.tld` and redirect requests to `domainname.tld`
	* Upload `index.html` and `error.html` to bucket `domainname.tld`
3. Switch DNS Providers
	* Copy DNS Records from gandi.net
	* Create a hosted zone in Route53 called `domainname.tld`
	* `Import Zone File`
	* Delete the previous A Records
	* Create two new record sets
		1. Name: _blank_ Type: A. Alias: Yes. Value: AWS Region (Ohio East)
		2. Name: _www_ Type: A. Alias: Yes. Value: AWS Region (Ohio East) [Removed]
	* Copy AWS Name server to gandi under Domain -> Nameservers (not DNS Records)

### Create Image Bucket
1. Create a bucket with default options named `domainname.tld.photos`

### Link CSS and JS Files
1. Create `styles.css` and `app.js`
2. Add `<link>` and `<script>` tags to `index.html`
	* `link href="styles.css"`
	* `script src="app.js"`
3. Upload new `index.html` and `styles.css` and `app.js`

### Cloudfront
1. Create a Cloudfront distribution for `domainname.tld`
	* Add `domainname.tld` as the CNAME
	* Set the S3 bucket address as the path
	* In Route53, change the A name record to point to the Cloudfront distribution
	* the WWW A name can continue to point to the bucket because it's forwarder anyway [Removed]
2. Create a Cloudfront distribution for `domainname.tld.studios`
	* Add `photos.domainname.tld` as the CNAME
	* In Route53, add a CNAME `photos.domainname.tld` to the Cloudfront distribuation address of the photo bucket

## File/Description List 7/3
A JSON file with images and text will be used instead of using API Gateway -> Lambda -> RDS to store images and text
1. JSON will have links to each photo, possible link to photo before editing, and text description.
2. Files will be limited to 100 entries
3. A tool will generate the file after reading from a PostgreDB

### Install PostgreSQL Ubuntu 16.04
1. Install PostgreSQL and PostgreSQL-contrib
	* `sudo apt-get update && sudo apt-get install postgresql postgresql-contrib`
2. Secure default Postgresql user `postgres`
	* `sudo passwd postgres`
	* `su - postgres`
	* `> psql -d template1 -c "ALTER USER postgres WITH PASSWORD `newpassword`"`
3. Create a new user (Run as `postgres` user)
	* `createuser _username_ --pwprompt`
4. Create new database
	* `createdb myglasseye`
5. Run table create script
	* `psql -f db/createTable.sql -d myglasseye`

### Create Rust executable
1. Install `rustup`
	* `curl https://sh.rustup.rs -sSf | sh`
2. Create a new repo `rusty_photo_uploader`
3. Initialize the project
	* `cargo new --bin rusty_photo_uploader`
4. Add the clap
	* In Cargo.toml under [dependencies] `clap = "2.32"`

## Do some front end MVP work 7/8

### Change up DB a little
1. `ALTER TABLE photos ADD COLUMN title varchar(50)`
2. `ALTER TABLE photos RENAME COLUMN name TO image`
3. `ALTER TABLE photos ALTER COLUMN image TYPE text`
4. `ALTER TABLE photos ALTER COLUMN before_image TYPE text`

### Add some photos and a JSON file
1. Uploaded a small selection of files to a folder `main_images` in the `myglasseye.studio.photos` bucket
2. Created a JSON file with fields `image, title, description`
3. Upload JSON file to `myglasseye.studio` bucket

### Image Loading
1. append relative url from json file to base url -> `http://photos.myglasseye.studio` + _relative_
2. load and be thankful for cors
3. invalidations are virtually free. feel free to use cloudfront invalidations (first 1k/month free)


## Styling 7/9
### Create a header (I don't know why this is next)
1. Make a header
2. Use some JS to check if scrolled past header height
3. Add a class if so. Remove otherwise
4. Add a hover handler
5. Make sure to move content down a bit at first to prevent overlapping

## Styling 7/12
1. Remove sticky headers. This is sort of dumb
2. Flex that image feed
3. `width: 100%; height: auto` preserves image aspect ratio

### Header
1. Should be bold - Copy the color scheme from the national
3. Should have `Home` and `About`
	- `Feeds` and Other pages can be added later
4. Make everything centered and larger

### Grid
1. Should be simple
2. Flex / responsive
3. Minimal spacing between items
4. Instagram-like without being too clustered

### Title and Descriptions
#### Adding fonts
1. wow these are expensive
2. Google fonts are great
3. The National uses sans serif geometric fonts 
	* I use Google Font Muli