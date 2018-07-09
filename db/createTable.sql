CREATE TABLE photos (
	id SERIAL PRIMARY KEY,
	image text UNIQUE,
	before_image text,
	description text,
	title varchar(50),
	created timestamp default current_timestamp
)