import pymongo
import sys

connection = pymongo.Connection("mongodb://localhost", safe=True)

db=connection.students
grades = db.grades

cur = grades.find({'type':'homework'}).sort([('student_id',pymongo.ASCENDING),('score',pymongo.ASCENDING)])

student_id = -1
for doc in cur:
    #print doc
    #print doc['student_id']
    if student_id != doc['student_id']:
        student_id = doc['student_id'] 
        grades.remove({'_id':doc['_id']})
    #print doc
    
#print(grades.find_one({}))
