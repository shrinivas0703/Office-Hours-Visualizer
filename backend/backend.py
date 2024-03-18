from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
DB_FILE = 'backend/database.db'

def create_tables():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()

    # create the course table
    c.execute('''CREATE TABLE IF NOT EXISTS course (
                    courseID INTEGER PRIMARY KEY AUTOINCREMENT,
                    department TEXT,
                    number TEXT
                )''')
    
    # create the course section table
    c.execute(''' CREATE TABLE IF NOT EXISTS course_section (
                    courseID INTEGER,
                    sectionID INTEGER,
                    semester TEXT,
                    num_students INTEGER,
                    PRIMARY KEY (courseID, sectionID),
                    FOREIGN KEY (courseID) REFERENCES course (courseID)
              )''')
    
    # create the teaching assistant table
    c.execute(''' CREATE TABLE IF NOT EXISTS teaching_assistant (
                    email TEXT PRIMARY KEY,
                    name TEXT,
                    year TEXT
              )''')
    
    # create the office hour table
    c.execute(''' CREATE TABLE IF NOT EXISTS office_hour (
                    courseID INTEGER,
                    sectionID INTEGER,
                    ta_email TEXT,
                    time TIME,
                    duration TIME,
                    location TEXT,
                    day TEXT,
                    capacity INTEGER,
                    PRIMARY KEY (courseID, sectionID, ta_email, location, time),
                    FOREIGN KEY (courseID) REFERENCES course (courseID),
                    FOREIGN KEY (sectionID) REFERENCES course_section (sectionID),
                    FOREIGN KEY (ta_email) REFERENCES teaching_assistant (email)
              )''')
    conn.commit()
    conn.close()

def test_insertions():
    conn = sqlite3.connect(DB_FILE)
    c=conn.cursor()
    c.execute(''' INSERT INTO teaching_assistant(email, name, year)
                    VALUES ("test_email@purdue.edu", "Purdue Pete", "junior")
              ''')
    c.execute(''' INSERT INTO course (department, number)
                    VALUES ("CS", "348")
              ''')
    conn.commit()
    conn.close()

@app.route('/api/courses', methods=['GET'])
def get_courses():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('SELECT * FROM course')
    courses = c.fetchall()
    conn.close()
    return jsonify(courses)

@app.route('/api/course_sections', methods=['GET'])
def get_course_sections():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('SELECT * FROM course_section')
    sections = c.fetchall()
    conn.close()
    return jsonify(sections)

@app.route('/api/teaching_assistants', methods=['GET'])
def get_teaching_assistants():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('SELECT * FROM teaching_assistant')
    tas = c.fetchall()
    conn.close()
    return jsonify(tas)

@app.route('/api/office_hours', methods=['GET'])
def get_office_hours():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('SELECT * FROM office_hour')
    office_hours = c.fetchall()
    conn.close()
    return jsonify(office_hours)

if __name__ == '__main__':
    create_tables()
    #test_insertions()
    app.run(debug=True)

