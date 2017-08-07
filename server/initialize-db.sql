CREATE TABLE guac_user (
	id serial primary key,
	username text unique not null,
	password text not null
);

CREATE TABLE poll (
    id serial primary key,
    title text not null,
    description text,
	created_at timestamp not null default now(),
	created_by int not null references guac_user(id)
);

CREATE TABLE poll_option (
    id serial primary key,
    poll_id int references poll(id),
    name text not null
);

CREATE TABLE poll_option_vote (
	id serial primary key,
	guac_user_id int not null references guac_user(id),
	poll_id int not null references poll(id),
	poll_option_id int not null references poll_option(id),
	unique (guac_user_id, poll_id)
);

CREATE TABLE poll_tags (
	id serial primary key,
	poll_id int not null references poll(id),
	tag text not null
);
