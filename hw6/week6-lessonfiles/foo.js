
use test
for(i=0;i<10;i++) {
    for(j=0;j<10;j++) {
	for(k=0;k<10;k++) {
	    db.nums.insert({i:i, j:j, k:k})
	}
    }
}
db.nums.ensureIndex({i:1,j:1,k:1})
