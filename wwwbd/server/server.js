Meteor.startup(function () {
    Meteor.methods({
        getQuote: function (url) {
            return Meteor.http.call("GET", url);
        }
    });
});

Meteor.publish("blog", function () {
    return Blog.find();
});

Meteor.publish("holdings", function () {
    return Holdings.find();
});