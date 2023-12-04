from flask import Flask, render_template
 
app = Flask(__name__)
 
 
@app.route("/")
def hi():
    return render_template("todo.html")
 
app.run(debug=True)
   