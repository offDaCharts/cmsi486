Meteor.startup(function () {
    Meteor.methods({
        createPost: function (params) {
            console.log(1);
            console.log(params.type);
            console.log(params.text);
            return Blog.insert(params);
        },

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
