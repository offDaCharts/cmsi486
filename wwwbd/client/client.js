Deps.autorun(function () {
    Meteor.subscribe("blog");
});

Template.hello.greeting = function () {
  return "Welcome to wwwbd.";
};
  
Template.buys.posts = function() {
  return Blog.find({"type": "buy"});
}

Template.sells.posts = function() {
  return Blog.find({"type": "sell"});
}

Template.holds.posts = function() {
  return Blog.find({"type": "hold"});
}
  
Template.says.posts = function() {
  return Blog.find({"type": "say"});
}

Template.hello.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  }
});
