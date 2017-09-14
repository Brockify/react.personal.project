from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from flask import jsonify
from flaskext.mysql import MySQL

app = Flask(__name__)
CORS(app)
api = Api(app)
mysql = MySQL()
 
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Brock114039'
app.config['MYSQL_DATABASE_DB'] = 'sys'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
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
            cur.execute("INSERT INTO sys.Users(username, password) VALUES(%s, %s)", (username, password))
            mysql.get_db().commit()
            return jsonify({"message": "Register successful!"})

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)