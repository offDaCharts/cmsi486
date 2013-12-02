var actions = ["buy", "sell", "say"];

Deps.autorun(function () {
    Meteor.subscribe("blog");
    Meteor.subscribe("holdings");
    Meteor.subscribe("users");
});

Template.hello.greeting = function () {
    return "Welcome to wwwbd.";
};
  
Template.buy.posts = function() {
    return Blog.find({"type": "buy"});
}

Template.sell.posts = function() {
    return Blog.find({"type": "sell"});
}

Template.hold.holdings = function() {
    return Holdings.find();
}

actions.forEach(function(tabType) {
    Template[tabType].rendered  = function() {
        var $container = $("#wwwb_" + tabType);
        $container.find("#postLabel").text("What would Warren Buffet "+tabType+"?");

        $container.find("#submitPost")
            .unbind()
            .click(function () {
                Meteor.call("createPost", {
                    type: tabType,
                    text: $container.find("#postInput").val()
                });
                $container.find("#postInput").val("");
            }); 

    };
});

Template.hold.rendered = function() {
    //var result = Holdings.aggregate({$group: {_id:"", tickers: {$push: "$ticker"}}}),
    //    tickers = results[0].tickers;
    //cold use aggregate functions but meteor's minimongo doesn't support it
    var $container = $("#wwwb_hold"),
        tickers = [],
        ids = {},
        url = "https://www.google.com/finance/info?infotype=infoquoteall&q=";

    $("#wwwb_hold").find("#postLabel").text("What would Warren Buffet hold?");

    Holdings.find().forEach(function(hold) {
        tickers.push(hold.ticker);
        ids[hold.ticker] = hold._id;
    });

    if(tickers.length) {
        Meteor.call("getQuote", url+tickers.join(","), function(error, results) {
      	    var resultsStr = results.content,
      	        quotes = JSON.parse(resultsStr.substr(resultsStr.indexOf('//')+2).trim());
            quotes.forEach(function(quote, index) {
                var $deleteButton = $("<a></a>")
                        .addClass("btn btn-danger btn-small deleteHoldButton")
                        .append($("<i></i>")
                            .addClass("icon-white icon-remove")
                );
                $("#" + tickers[index])
                    .empty()
                    .append("<td>" + quote.name + "</td>")
                    .append("<td>" + quote.t + "</td>")
                    .append("<td>" + quote.l + "</td>")
                    .append("<td>" + quote.c + "</td>")
                    .append("<td>" + quote.cp + "</td>")
                    .append("<td>" + quote.hi + "</td>")
                    .append("<td>" + quote.lo + "</td>")
                    .append("<td>" + quote.hi52 + "</td>")
                    .append("<td>" + quote.lo52 + "</td>")
                    .append($("<td></td>")
                        .append($deleteButton
                            .click(function() {
                                console.log(ids[tickers[index]]);
                                Meteor.call("removeHolding", {
                                    _id: ids[tickers[index]]
                                });
                            })
                        )
                    )
            
            })

      	});
    }

    $container.find("#postLabel").text("What would Warren Buffet hold?");

    $container.find("#submitPost")
        .unbind()
        .click(function () {
            Meteor.call("addHolding", {
                ticker: $container.find("#postInput").val()
            });
            $container.find("#postInput").val("");
        }); 

}
  
Template.say.posts = function() {
    return Blog.find({"type": "say"});
}

Template.post.rendered = function() {
    $(".deletePostButton")
        .unbind()
        .click(function() {
            Meteor.call("deletePost", {
                _id: $(this).attr("id")
            });
        });
}





