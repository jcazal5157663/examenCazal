var exitsSuccess = function(res,result) {  
            res.status(200); // Success
            res.json(result);
    }
    
var actionSuccess = function(res) {
            res.status(201); //Created/Updated/Deleted
            res.json();
    }

var serverError = function(res,error) {
            res.status(500); //Server error
            res.json(error);
    }

var commonError = function(res,error) {
            res.status(404); // Not found
            res.json(error);
    }


module.exports = {
    exitsSuccess:exitsSuccess,
    actionSuccess:actionSuccess,
    serverError:serverError,
    commonError:commonError
};