import pymongo
import sys

connection = pymongo.Connection("mongodb://localhost", safe=True)

db=connection.school
students = db.students

cur = students.find()

student_id = -1
for doc in cur:
    print doc
    lowest = {'score': 1000}
    for score in doc['scores']:
        print score
        if score['type'] == 'homework' and score['score'] < lowest['score']:
            lowest = score
    print '\n'
    print lowest
    print '\n'
    print doc['scores']
    doc['scores'].remove(lowest)
    print doc['scores']
    #print doc['scores']
    students.update({'_id': doc['_id']}, doc)
    
#print(grades.find_one({}))

