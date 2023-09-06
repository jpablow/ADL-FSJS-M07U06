CREATE DATABASE softjobs;

CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password
VARCHAR(200) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );

SELECT * FROM usuarios;

DROP TABLE usuarios;