
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
	* Add `images.domainname.tld` as the CNAME
	* In Route53, add a CNAME `images.domainname.tld` to the Cloudfront distribuation address of the photo bucket