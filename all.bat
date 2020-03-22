#!/bin/bash

cmd -e 'node ./sgp_srv.js'
sleep 10
cmd -e 'electron .'
