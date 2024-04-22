from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={"*": {"origins": "*"}})
DB_FILE = 'backend/database.db'

def create_tables():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()

    # create the course table
    c.execute('''CREATE TABLE IF NOT EXISTS course (
                    courseID INTEGER PRIMARY KEY AUTOINCREMENT,
                    department TEXT,
                    number TEXT,
                    professor TEXT,
                    num_students INTEGER
                )''')
    
    # create the teaching assistant table
    c.execute(''' CREATE TABLE IF NOT EXISTS teaching_assistant (
                    email TEXT PRIMARY KEY,
                    name TEXT,
                    year TEXT
              )''')
    
    # create the office hour table
    c.execute(''' CREATE TABLE IF NOT EXISTS office_hour (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    courseID INTEGER,
                    ta_email TEXT,
                    time TIME,
                    duration INTEGER,
                    location TEXT,
                    day TEXT,
                    capacity INTEGER,
                    FOREIGN KEY (courseID) REFERENCES course (courseID),
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
    # qs = request.args
    conn = sqlite3.connect(DB_FILE)

    c = conn.cursor()
    c.execute('SELECT * FROM course')
    courses = c.fetchall()
    conn.close()
    return jsonify(courses)

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
    
    where_clause = "WHERE"
    args = ()
    for q, v in request.args.items():
        if (q == "department_course") and len(v) != 0:
            q_arr = ["department", "number"]
            v_arr = v.split()
            where_clause += f" C.{q_arr[0]} = ? AND C.{q_arr[1]} = ? AND"
            args += (v_arr[0],)
            args += (v_arr[1],)
        elif len(v) != 0 and q == "capacity":
            where_clause += f" O.{q} >= ? AND"
            args += (v,)
        elif len(v) != 0:
            where_clause += f" O.{q} = ? AND"
            args += (v,)

    if len(args) > 0:
        where_clause = where_clause[:-3]
    else:
        where_clause = ""

    #print(where_clause)
    #print(args)

    qs = f'''SELECT O.id, C.department, C.number, T.name, T.email, O.time, O.location, O.day, O.capacity, O.duration 
              FROM office_hour O NATURAL JOIN course C JOIN teaching_assistant T ON t.email = O.ta_email
            {where_clause}'''
    
    c.execute(qs, args)

    office_hours = c.fetchall()
    conn.close()
    return jsonify(office_hours)

@app.route('/api/courses', methods=["POST"])
def post_new_courses():
    try:
        data = request.json
        department = data.get('courseDepartment')
        course_number = data.get('courseNumber')
        professor = data.get('professor')
        num_students = data.get('num_students')
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()

        # Using parameterized query to insert the new course into the database
        c.execute("INSERT INTO course (department, number, professor, num_students) VALUES (?, ?, ?, ?)",
                  (department, course_number, professor, num_students))
        conn.commit()
        conn.close()

        return jsonify({"message": "Course added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/teaching_assistants', methods=["POST"])
def post_new_TA():
    try:
        data = request.json
        email = data.get('email')
        name = data.get('name')
        year = data.get('year')
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()

        # Using parameterized query to insert the new course into the database
        c.execute("INSERT INTO teaching_assistant (email, name, year) VALUES (?, ?, ?)",
                  (email, name, year))
        conn.commit()
        conn.close()

        return jsonify({"message": "TA added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/office_hours', methods=["POST"])
def post_new_OH():
    try:
        data = request.json
        department = data.get('department')
        course_number = data.get('courseNumber')
        name = data.get('ta_name')
        time = data.get('time')
        location = data.get('location')
        day = data.get('day')
        capacity = data.get('capacity')
        duration = data.get('duration')
        print(data)
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()

        # Using parameterized query to insert the new course into the database
        c.execute('''INSERT INTO office_hour (courseID, ta_email, time, duration, location, day, capacity)
                  VALUES ((SELECT min(courseID) FROM course WHERE department = ? AND number = ?),
                  (SELECT email FROM teaching_assistant WHERE name = ?), ?, ?, ?, ?, ?)''',
                  (department, course_number, name, time, duration, location, day, capacity))
        conn.commit()
        conn.close()

        return jsonify({"message": "Office Hour added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/courses/', methods=["PUT"])
def edit_course():
    try:
        data = request.json

        course_id = data.get('courseID')
        department = data.get('department')
        course_number = data.get('number')
        professor = data.get('professor')
        num_students = data.get('num_students')
        
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()

        # Using parameterized query to update the course information in the database
        c.execute("UPDATE course SET department=?, number=?, professor=?, num_students=? WHERE courseID=?",
                  (department, course_number, professor, num_students, course_id))
        conn.commit()
        conn.close()

        return jsonify({"message": "Course updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/office_hours/', methods=["PUT"])
def edit_OH():
    try:
        data = request.json
        id = data.get("id")
        department = data.get('department')
        course_number = data.get('course_number')
        email = data.get('email')
        time = data.get('time')
        location = data.get('location')
        day =  data.get('day')
        capacity = data.get('capacity')
        duration = data.get('duration')
        
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()

        # Using parameterized query to update the course information in the database
        c.execute('''UPDATE office_hour SET courseID = (SELECT min(courseID) FROM course WHERE department = ? AND number = ?),
                 ta_email = ?, time = ?, duration = ?, location = ?, day = ?, capacity = ?
                  WHERE id = ?''',
                  (department, course_number, email, time, duration, location, day, capacity, id))
        conn.commit()
        conn.close()

        return jsonify({"message": "Office Hour updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/courses/', methods=["DELETE"])
def delete_course():
    try:
        data = request.json
        course_id = data.get('courseID')
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("DELETE FROM course WHERE courseID=?",
                  (course_id, ))
        conn.commit()
        conn.close()
        return jsonify({"message": "Course deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/office_hours/', methods=["DELETE"])
def delete_office_hour():
    try:
        data = request.json
        print(data)
        id = data.get('id')
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("DELETE FROM office_hour WHERE id=?",
                  (id, ))
        conn.commit()
        conn.close()
        return jsonify({"message": "Office Hour deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    create_tables()
    #test_insertions()
    app.run(debug=True)

