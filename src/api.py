from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flaskext.mysql import MySQL
from random import randint
from email.mime.text import MIMEText
from validate_email import validate_email
import smtplib
import json
app = Flask(__name__)
CORS(app)
api = Api(app)
mysql = MySQL()
 
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Brock114039'
app.config['MYSQL_DATABASE_DB'] = 'Login'
app.config['MYSQL_DATABASE_HOST'] = '198.199.102.156'
mysql.init_app(app)

class HelloWorld(Resource):
    #allows "GET" On this API.
    def get(self):
        return {'hello': 'world'}

    @app.route('/Login/<string:username>/<string:password>', methods=['GET'])
    def Login(username, password):
        cur = mysql.get_db().cursor()
        cur.execute('''SELECT Password, Username FROM Users where Username=%s''', (username))
        rv = cur.fetchone()
        if(rv != None):
            if(rv[0] == password):
                cur.execute('''SELECT data FROM Unread WHERE username=%s''', (username))
                unread = cur.fetchall()
                return jsonify({"message": "Login success!", "username": rv[1], "unread": unread})
            else:
                return jsonify({"message": "Password is wrong. Please try again."})
        else:
            return jsonify({"message": "Username not found. Please try again."})

    @app.route('/Register/<string:username>/<string:password>/<string:email>', methods=['POST', 'GET'])
    def Register(username, password, email):
        cur = mysql.get_db().cursor()
        cur.execute('''SELECT Username FROM Users where Username=%s''', (username))
        rv = cur.fetchone()
        if(rv != None):
            return jsonify({"message": "Username already taken. Please try again."})
        else:
            cur.execute('''SELECT Email from Users where Email=%s''', (email))
            rv = cur.fetchone()
            if(rv != None):
                return jsonify({"message": "Email already taken. Please try again."})
            else:
                is_valid = validate_email(email,verify=True)
                if(is_valid == False):
                    return jsonify({"message": "Please type in a valid email address"})
                else:
                    #insert new user
                    cur.execute("INSERT INTO Users(username, password, email) VALUES(%s, %s, %s)", (username, password, email))
                    mysql.get_db().commit()
                    return jsonify({"message": "Register successful!"})

    @app.route('/ChangePassword/<string:username>/<string:oldPassword>/<string:newPassword>', methods=['POST', 'GET'])
    def ChangePassword(username, oldPassword, newPassword):
        cur = mysql.get_db().cursor()
        cur.execute('''SELECT Password FROM Users where Username=%s''', (username))
        rv = cur.fetchone()
        if(rv == None):
            return jsonify({"message": "No valid username."})
        elif(rv[0] != oldPassword):
            return jsonify({"message": "Old password is incorrect. Try again."})
        else:
            #insert new user
            cur.execute('''UPDATE Users SET Password=%s where Username=%s''', (newPassword, username))
            mysql.get_db().commit()
            return jsonify({"message": "Password changed!"})

    @app.route('/ResetPassword/<string:username>', methods=['POST', 'GET'])
    def ResetPassword(username):
        cur = mysql.get_db().cursor()
        cur.execute('''SELECT Email FROM Users where Username=%s''', (username))
        rv = cur.fetchone()
        if(rv == None):
            return jsonify({"message": "No account with that username."})
        else:
            #insert new user
            try:
                newPassword = (str(randint(0, 9)) + str(randint(0, 9)) + str(randint(0, 9)) + str(randint(0, 9)))
                cur.execute('''UPDATE Users SET Password=%s where Username=%s''', (newPassword, username))
                mysql.get_db().commit()
                msg = MIMEText(("Your new password is " + newPassword))
                # me == the sender's email address
                # you == the recipient's email address
                msg['Subject'] = 'Changed password'
                msg['From'] = 'bdamico33@gmail.com'
                msg['To'] = rv[0]

                # Send the message via our own SMTP server, but don't include the
                # envelope header.
                s = smtplib.SMTP("smtp.gmail.com", 587)
                s.starttls()
                s.login("bdamico33@gmail.com", "heroforsake")
                s.sendmail('bdamico33@gmail.com', [rv[0]], msg.as_string())
                s.close()
                return jsonify({"message": "Password reset! Check your email."})
            except Exception as e:
                return jsonify({"message": jsonify(e)})

    @app.route('/ResetUsername/<string:email>', methods=['POST'])
    def ResetUsername(email):
        cur = mysql.get_db().cursor()
        cur.execute('''SELECT Username FROM Users where Email=%s''', (email))
        rv = cur.fetchone()
        if(rv == None):
            return jsonify({"message": "No account with that email."})
        else:
            #insert new user
            try:
                msg = MIMEText(("Your Username is " + rv[0]))
                # me == the sender's email address
                # you == the recipient's email address
                msg['Subject'] = 'Your app username - Brocks Project'
                msg['From'] = 'bdamico33@gmail.com'
                msg['To'] = email

                # Send the message via our own SMTP server, but don't include the
                # envelope header.
                s = smtplib.SMTP("smtp.gmail.com", 587)
                s.starttls()
                s.login("bdamico33@gmail.com", "heroforsake")
                s.sendmail('bdamico33@gmail.com', [email], msg.as_string())
                s.close()
                return jsonify({"message": "Username sent to your email."})
            except Exception as e:
                return jsonify({"message": jsonify(e)})

    @app.route('/AddComic/<string:username>', methods=['POST', 'GET'])
    def AddComic(username):
        comic = request.get_json()
        cur = mysql.get_db().cursor()
        cur.execute('''SELECT quantity FROM Unread where Username=%s AND ID=%s''', (username, comic["id"]))
        rv = cur.fetchone()
        if(rv == None):
            cur.execute('''INSERT INTO Unread VALUES (%s, %s, %s, %s)''', (username, json.dumps(comic), comic['id'], int(1)))
            mysql.get_db().commit()
            return jsonify({"message": "Added successfully!", "comic": comic})
        else:
            cur.execute('''UPDATE Unread set quantity=%s WHERE ID=%s AND Username=%s''', (rv[0]+1, comic['id'], username))
            return jsonify({"message": "Added successfully!", "comic": comic})
        return jsonify({"message": "Added successfully!", "comic": comic})    

    @app.route('/DeleteComicUnread/<string:username>/<int:comic_id>', methods=['POST', 'GET'])
    def DeleteComicUnread(username, comic_id):
        cur = mysql.get_db().cursor()
        cur.execute('''DELETE FROM Unread WHERE Username=%s AND ID=%s''', (username, comic_id))
        mysql.get_db().commit()
        return jsonify({"message": "Deleted successfully!", "id": comic_id})    
api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)