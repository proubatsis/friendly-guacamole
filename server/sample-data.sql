INSERT INTO poll (title, description) VALUES
	('Coke vs Pepsi', 'Just wanna know what ppl prefer'),
	('What is your major?', null),
	('Next place to travel.', 'First time travelling'),
	('What should I have for dinner', null);

INSERT INTO poll_option (poll_id, name) VALUES
	(1, 'Coke'),
	(1, 'Pepsi'),
	(2, 'Computer Science'),
	(2, 'Business'),
	(2, 'Engineering'),
	(3, 'Canada'),
	(3, 'United States'),
	(3, 'Mexico'),
	(4, 'Pizza'),
	(4, 'Pasta');
