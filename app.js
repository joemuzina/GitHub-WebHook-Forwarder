const CONFIG = require('./config.js');
const FORWARD = CONFIG.FORWARD_URL;
const SECRET = CONFIG.SECRET_KEY;
const REPOSITORY = CONFIG.REPOSITORY;

if (REPOSITORY == "") {
    throw new Error("\nFATAL ERROR - no GitHub repository assigned in config.js.\n");
}

if (FORWARD == "") {
    throw new Error("\nFATAL ERROR - no forwarding URL assigned in config.js.\n");
}

if (SECRET == "") {
    console.log("\nWARNING: You do not have a secret key assigned in config.js! Improve the security of your webhook by adding a secret key.\n");
}

const express = require('express');
const app = express();
const crypto = require('crypto');

var bodyParser = require("body-parser");
app.use(bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}))

app.set('trust proxy', 1)
port = 9042; // some random port
console.log("Github Web Forwarder launched.");

app.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function correctKey(req) {
    const bodyString = Buffer.from(req.rawBody, 'utf8')
    let hashReceived = req.headers["x-hub-signature-256"].slice(7);

    let hmac = crypto.createHmac('sha256', SECRET);
    hmac.update(bodyString);

    let hashCheck = hmac.digest('hex');

    return (hashReceived == hashCheck);
}

function validateReq(req) {
    if (req.rawBody != null) {
        if ((SECRET == "") || (correctKey(req))) {
            if (req.body.repository != null) {
                let repositoryData = req.body.repository;
                if (repositoryData != null) {
        
                    let repositoryName = repositoryData.full_name;
                    if (repositoryName != null) {
                        let repositoryName = repositoryData.full_name;
        
                        let senderValid = (repositoryName == REPOSITORY);
        
                        if (senderValid) {
                            return true;
                        }
                        else {
                            return "Invalid repository name!";
                        }
                    }
                    else {
                        return "Invalidly formatted post; no repository name included.";
                    }
                }
                else {
                    return "Invalidly formatted post; no repository data found.";
                }
            }
            else {
                return "Invalidly formatted post; no repository at all!";
            }
        }
        else {
            return "Invalid secret key!";
        }
    }
    else {
        return "Improperly formatted request body!";
    }
}

// Given a path i.e. refs/head/main, return the lowest level (main)
function leafDirectory(dirPath) {
    let lastSlash = dirPath.lastIndexOf("/");
    return dirPath.slice(lastSlash + 1);
}

function isMainBranch(requestBody) {
    let currentMainBranch = requestBody.repository["master_branch"];
    let updatedBranch = leafDirectory(requestBody["ref"]);

    return (updatedBranch == currentMainBranch);
}

function eventType(head) {
    return head["x-github-event"];
}

function shouldForward(req) {
    let reqValidationResponse = validateReq(req);

    if (reqValidationResponse == true) {
        if (eventType(req.headers) == "push") {
            if (isMainBranch(req.body)) {
                return true;
            }
            else {
                res.write(reqValidationResponse);
                return false;
            }
        }
        
        return true;
    }

    res.write(reqValidationResponse);
    return false;
}

// Forward the webhook request to the desired target
function forwardRequest(req, res) {
    res.redirect(307, FORWARD);
}

app.post(
    '/gitPayload',
    function(req, res) {
        if (shouldForward(req)) {
            forwardRequest(req, res);
        }
        else {
            res.write("Webhook request failed!");
            res.send();
        }
    }
);