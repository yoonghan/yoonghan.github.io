cd ..

#Start the mongodb
start /D "c:\PROGRA~1\MongoDB 2.6 Enterprise\bin\" mongod
ping 192.0.2.2 -n 1 -w 2000 > nul

#Start the play test service
start /D "C:\SelfProject\IDE\workspace_scala\selfservice" activator run
ping 192.0.2.2 -n 1 -w 10000 > nul

#Start the standalone pgm
start npm start
ping 192.0.2.2 -n 1 -w 1000 > nul

#Start the standalone pgm
start npm run e2etest

cd test