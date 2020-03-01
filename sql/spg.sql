-- DROP TABLE table;
CREATE TABLE records (
	id int primary key not null AUTO_INCREMENT,
	time_infos datetime not null,
	temperature numeric null,
	humidity numeric null,
	ph int null,
	water_level numeric null,
	luminosity boolean not null
);
-- 'YYYY-MM-DD HH:MM:SS'


CREATE TABLE scenarios (
	id int primary key not null AUTO_INCREMENT,
	scen_name varchar(40), 
	light_day time not null,
    light_night time not null,
    
    temperature numeric null,
    temperature_tests_frequency int default 2 not null,
    
	humidity numeric null,
	humidity_tests_frequency int default 3 not null,
    
	ph int null,
	ph_tests_frequency int default 24 not null,
    
	water_level_min numeric null,
	water_level_max numeric null,
	water_level_tests_frequency int default 12 not null,
    
    ventilation_intraction_duration int default 60 not null,
    ventilation_intraction_frequency int default 2 not null,
    
    ventilation_extraction_duration int default 60 not null,
    ventilation_extraction_frequency int default 1 not null,
    
    records_frequency int default 5 not null,
    screens_frequency int default 60 not null
    
);

CREATE TABLE monitoring (
	id int primary key not null AUTO_INCREMENT,
	record_time datetime not null,

	picture varchar(150),

	liked_record_id int not null,
	
);