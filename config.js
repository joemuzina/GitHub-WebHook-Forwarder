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
    "SECRET_KEY" : "WWIzybLPsUt4PSEupxrmmD7ttRaq79fklaUF87IA7XDnGAkA8swjUoeuSYS2707HfTGjrSwHURTJa2Z3dKhk7FN0d1KnnBWk2rWarY20c0gV9aD6K0jqwv6vfWImQLno",

    // Where should valid webhook requests be forwarded?
    "FORWARD_URL" : "https://discord.com/api/webhooks/809596161198784542/PyrZ295ZwQGfug2D6aCyq7QOYAbd0fyHD0V1LnftmOM91rs9Fry31-bPHZtva1kw-p9g/github",
    
    // The username of the repo owner and repo name.
    "REPOSITORY" : "joemuzina/webhookTest"
};

module.exports = cfg;