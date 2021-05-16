const { message, status } = require('../configs');

// error handler middleware
module.exports = (err, req, res, next) => {
	console.log("err",err);
	const code = err.status ? err.status : 500;
	if (err.message === 'Validation error') {
		err.message = message.exist;
		err.status = 400;
	}
	switch (code) {
		case status.HTTP_UNPROCESSABLE_ENTITY: {
			let error = err.details.reduce((prev, curr) => {
				prev[curr.path[0]] = curr.message.replace(/"/g, "");
				return prev;
			}, {});
			let msg = Object.values(error).length ? Object.values(error).join(', ') : message[400];
			err.message = msg
			return res.status(code).json({
				status: code,
				message: msg,
				// error
			});
		}

		default: {
			return res.status(err.status || 500).json({
				status: 500,//err.status || 500,
				message: 'Internal Server Error'//err.message || 'Internal Server Error',
			});
		}
			break;
	};

};