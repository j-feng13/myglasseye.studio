CREATE TABLE photos (
	id SERIAL PRIMARY KEY,
	name varchar (50) UNIQUE,
	before_image varchar (50),
	description text,
	created timestamp default current_timestamp
)