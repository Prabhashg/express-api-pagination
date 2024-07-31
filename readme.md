Aim: to build own api and fetch data from that api only, after serving it on localhost, 
	and then rendering that data in frontend html table as before using public API.

Learnings: express js
	   routing
	   get method
	   app(express()) vs router(express.Router())
	   pagination
	   
problems: CORS error - cross-origin resource sharing blocked by browser
	   Solution: used "cors" middleware to unblock CORS policy
	   (could have added cross-origin... into response header, but that for some other time)


View output:
	go live -> index.html from vs code
	cd api/
	node index.js


Author: Prabhash Kumar
Date: 30th July, 2024