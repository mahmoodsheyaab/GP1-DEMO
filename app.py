from pathlib import Path
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="dist", static_url_path="/")

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    file_path = Path(app.static_folder) / path
    if file_path.is_file():
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
