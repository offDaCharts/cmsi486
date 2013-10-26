use agg;
map = function() {
    emit({state:this.state, city: this.city}, {pop: this.pop});
}

reduce = function(key, values) {
    var pop = 0;
    values.forEach(function(doc) {
	pop += doc.pop;
    });
    return {'pop': pop};
}

db.zips.mapReduce(map, reduce, {out: 'pop_by_state'});
