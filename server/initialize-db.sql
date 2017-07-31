CREATE TABLE poll (
    id serial primary key,
    title text not null,
    description text
);

CREATE TABLE poll_option (
    id serial primary key,
    poll_id int references poll(id),
    name text not null
);

CREATE TABLE guac_user (
	id serial primary key,
	username text unique not null,
	password text not null
);
