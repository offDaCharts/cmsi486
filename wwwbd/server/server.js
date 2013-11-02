//Meteor.startup(function () {
//    Meteor.methods({
//    });
//});

Meteor.publish("blog", function () {
  return Blog.find();
});