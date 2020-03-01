INSERT INTO spg.records (time_infos, temperature, humidity, ph, water_level, luminosity) 
VALUES (now(), (20 + rand()*20), rand()*100, rand()*9, (50 + rand()*50), true);


INSERT INTO spg.scenarios (scen_name , light_day , light_night , temperature , temperature_tests_frequency ,humidity , humidity_tests_frequency , ph ,	ph_tests_frequency, water_level_min ,	water_level_max ,	water_level_tests_frequency , ventilation_intraction_duration , ventilation_intraction_frequency, ventilation_extraction_duration , ventilation_extraction_frequency , records_frequency, screens_frequency) 
VALUES ('default', '00:00:00','16:00:00', 35 , 3, 50, 4,7, 12, 10, 40, 5, 120, 4,60, 3, 5,60);	

	