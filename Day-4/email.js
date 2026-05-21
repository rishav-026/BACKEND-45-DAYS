module.exports.send = (users, callback) => {
    console.log("Sending email to:", users);
    callback(null, "Emails sent!");
};