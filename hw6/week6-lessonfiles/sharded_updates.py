
import pymongo
import sys

read_pref = pymongo.read_preferences.ReadPreference.PRIMARY

c = pymongo.MongoClient(host="mongodb://localhost:27017",
                        w=3, wtimeout=10000, j=True, 
                        read_preference=read_pref)


db = c.test
grades = db.grades

# lets do an update that we believe will hit shard 0
print "updating a document on shard 0"
try:
    grades.update({"student_id":699053},{'$push':{'scores':{'type':'homework','score':100}}},multi=False)
except:
    print "Unexpected error:", sys.exc_info()[0]
print "completed the update"

# now lets update a document on shard 1
print "updatina a document on shard 1"
try:
    grades.update({"student_id":155345},{'$push':{'scores':{'type':'homework','score':100}}},multi=False)
except:
    print "Unexpected error:", sys.exc_info()[0]
print "completed the update"





