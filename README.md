# In-Browser-data-profiler
Web application with in-browser data profiling on CSV files
## Use
Operations performed on the files include printing the number of rows, counting the columns and getting the headers of the file
## Technologies
1.  Node.js
2.  Express.js
3.  Passport.js
4.  SQLite
5.  Sequelize
6.  Axios
7.  Web Assembly
8.  C
## Motivation 
Better performance as Web assembly runs on native speed. Also by making the data profiling in-browser, we choose not to save the users' files in a database or a file storage, thus avoiding requests and their overhead and securing the privacy of the users.
## Compilation 
compile c to web assembly: emcc wrapping.c -o wtf.js -s EXPORTED_FUNCTIONS=_printLength,_malloc,_free -s EXPORTED_RUNTIME_METHODS=ccall,cwrap,getValue,setValue
