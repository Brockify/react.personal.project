from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from flask import jsonify
from flaskext.mysql import MySQL
from random import randint

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
        cur.execute('''SELECT Password FROM Users where Username=%s''', (username))
        rv = cur.fetchone()
        if(rv != None):
            if(rv[0] == password):
                return jsonify({"message": "Login success!"})
            else:
                return jsonify({"message": "Password is wrong. Please try again."})
        else:
            return jsonify({"message": "Username not found. Please try again."})

    @app.route('/Register/<string:username>/<string:password>', methods=['POST', 'GET'])
    def Register(username, password):
        cur = mysql.get_db().cursor()
        cur.execute('''SELECT Username FROM Users where Username=%s''', (username))
        rv = cur.fetchone()
        if(rv != None):
            return jsonify({"message": "Username already taken. Please try again."})
        else:
            #insert new user
            cur.execute("INSERT INTO Users(username, password) VALUES(%s, %s)", (username, password))
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
        cur.execute('''SELECT Username FROM Users where Username=%s''', (username))
        rv = cur.fetchone()
        if(rv == None):
            return jsonify({"message": "No account with that username."})
        else:
            #insert new user
            newPassword = (str(randint(0, 9)) + str(randint(0, 9)) + str(randint(0, 9)) + str(randint(0, 9)))
            cur.execute('''UPDATE Users SET Password=%s where Username=%s''', (newPassword, username))
            mysql.get_db().commit()
            return jsonify({"message": "Password reset! Check your email."})

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)