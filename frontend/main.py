from flask import Flask
app = Flask(__name__, static_url_path="", static_folder="./static")

# Standard route when entering the application. 
# This route generates the main view in the app. 
@app.route('/')
def main():
    return app.send_static_file('main.html')

# To run the app, in command line write: "python main.py"
if __name__ == "__main__":
    app.run(debug=True)
