Meteor.startup(function () {
    Meteor.methods({
        createPost: function (params) {
            return Blog.insert(params);
        },

        deletePost: function (params) {
            return Blog.remove(params);
        },

        addHolding: function (params) {
            return Holdings.insert(params);
        },

        removeHolding: function (params) {
            return Holdings.remove(params);
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
