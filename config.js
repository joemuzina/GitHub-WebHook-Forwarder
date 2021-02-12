/*
Sample CFG:
    const cfg = {
        "SECRET_KEY" : "HsbeMy9lD7AUwkaBXqIiz7gRr1LsFPOP6U06xpb6IbqcPAKvSwi83Hz15RUgSmfOqvzb3i2RPjQXmpw3n0RbLbIPON2QB8x6G9gSuYJvizzObR0SmPH4Fv8hAOuo8LZk", // No, this is not my key.
        "FORWARD_URL" : "https://discord.com/api/webhooks/a_bunch_of_numbers_go_here/github",
        "REPOSITORY" : "joemuzina/sampleRepo"
    };
*/

const cfg = {
    // A string of random characters to authenticate webhook requests.
    // Make sure this is identical to the secret set in your GitHub repo's webhook settings. 
    "SECRET_KEY" : "",

    // Where should valid webhook requests be forwarded?
    "FORWARD_URL" : "",
    
    // The username of the repo owner and repo name.
    "REPOSITORY" : ""
};

module.exports = cfg;
