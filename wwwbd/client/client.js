Deps.autorun(function () {
    Meteor.subscribe("blog");
    Meteor.subscribe("holdings");
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

Template.holds.holdings = function() {
  return Holdings.find();
}

Template.holds.rendered = function() {
	Holdings.find().forEach(function(stock){
		var url = "https://www.google.com/finance/info?infotype=infoquoteall&q=";
		Meteor.call("getQuote", url+stock.ticker, function(error, results) {
		    var resultsStr = results.content,
		        quote = JSON.parse(resultsStr.substr(resultsStr.indexOf('//')+2).trim());
            $("#" + stock.ticker)
                .empty()
                .append("<td>" + quote[0].name + "</td>")
                .append("<td>" + quote[0].t + "</td>")
                .append("<td>" + quote[0].l + "</td>")
                .append("<td>" + quote[0].c + "</td>")
                .append("<td>" + quote[0].cp + "</td>")
                .append("<td>" + quote[0].hi + "</td>")
                .append("<td>" + quote[0].lo + "</td>")
                .append("<td>" + quote[0].hi52 + "</td>")
                .append("<td>" + quote[0].lo52 + "</td>")

		});
	})
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
