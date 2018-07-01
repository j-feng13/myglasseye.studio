
## S3 Static hosting 6/30
### Setup Buckets
1. Requirements `index.html` and `error.html` + a domain 
2. Setup Buckets
	* Create two buckets `domainname.tld` and `www.domainname.tld` 
	* Enable static hosting for `domainname.tld` in the s3 console and set `index.html` and `error.html`
	* Enable static hosting for `www.domainname.tld` and redirect requests to `domainname.tld`
	* Upload `index.html` and `error.html` to bucket `domainname.tld`
3. Switch Domain
	* Copy DNS Records from gandi.net
	* Create a hosted zone in Route53 called `domainname.tld`
	* `Import Zone File`
	* Delete the previous A Records
	* Create two new record sets
		1. Name: _blank_ Type: A. Alias: Yes. Value: AWS Region (Ohio East)
		2. Name: _www_ Type: A. Alias: Yes. Value: AWS Region (Ohio East)
	* Copy AWS Name server to gandi under Domain -> Nameservers (not DNS Records)

### Link CSS and JS Files
1. Create `styles.css` and `app.js`
2. Add `<link>` and `<script>` tags to `index.html`
	* `link href="styles.css"`
	* `script src="app.js"`
3. Upload new `index.html` and `styles.css` and `app.js`