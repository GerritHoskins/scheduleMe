'use strict';



const { admin, db } = require('./admin');
const cookieParser = require('cookie-parser')();

// Express middleware that checks if a Firebase ID Tokens is passed in the `Authorization` HTTP
// header or the `__session` cookie and decodes it.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// When decoded successfully, the ID Token content will be added as `req.user`.
async function validateFirebaseIdToken(req, res, next) {
	console.log('Check if request is authorized with Firebase ID token');
	
	const idToken = await getIdTokenFromRequest(req, res);
	if (idToken) {
		await addDecodedIdTokenToRequest(idToken, req, res, next)
	}
	//return validateFirebaseIdToken;
	//next();
}

/**
 * Returns a Promise with the Firebase ID Token if found in the Authorization or the __session cookie.
 */
function getIdTokenFromRequest(req, res) {
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		console.log('Found "Authorization" header');
		// Read the ID Token from the Authorization header.
		return Promise.resolve(req.headers.authorization.split('Bearer ')[1]);
	}
	return new Promise((resolve, reject) => {
		cookieParser(req, res, () => {
			if (req.cookies && req.cookies.__session) {
				console.log('Found "__session" cookie');
				// Read the ID Token from cookie.
				resolve(req.cookies.__session);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Returns a Promise with the Decoded ID Token and adds it to req.user.
 */
async function addDecodedIdTokenToRequest(idToken, req, res, next) {
	try {
		 await 
		 admin
		 .auth()
		 .verifyIdToken(idToken)
		 .then((decodedIdToken) => {
			req.user = decodedIdToken;
		//	console.log(req.user);	
			return db.collection('users').where('userId', '==', req.user.uid).limit(1).get();
		 })	
		 .then((data) => {
			 console.log(data.docs[0].data());
			req.user.username = data.docs[0].data().username;
			req.user.image = data.docs[0].data().imageURL;
			return next();	
		 })
		.catch((err) => {
			console.error('Error while verifying token', err);
			return res.status(403).json(err);
		}) 
	} catch (error) {
		console.error('Error while verifying Firebase ID token:', error);
	}
}

module.exports = (req, res, next) => {
	validateFirebaseIdToken(req, res, next)	
}
//exports.validateFirebaseIdToken = validateFirebaseIdToken;