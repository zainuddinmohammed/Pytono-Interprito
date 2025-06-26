from flask import Flask, request, jsonify, send_from_directory, Response, abort
from flask_cors import CORS
from PytonoInterprito import translate_code, interpret, get_translation_groups
import os
import sys
import io
import json

# ----------- PATH SETUP -----------

if getattr(sys, 'frozen', False):
    BASE_DIR = sys._MEIPASS
else:
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

FRONTEND_DIR = os.path.join(BASE_DIR, 'public')

# ----------- INIT APP -----------

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path='')
CORS(app)


# ----------- STATIC FILE ROUTES -----------

@app.route('/')
def serve_index():
    index_path = os.path.join(FRONTEND_DIR, 'index.html')
    if os.path.exists(index_path):
        return send_from_directory(FRONTEND_DIR, 'index.html')
    else:
        print(f"[ERROR] index.html not found at: {index_path}")
        abort(404)


@app.route('/<path:filename>')
def serve_static(filename):
    file_path = os.path.join(FRONTEND_DIR, filename)
    if os.path.exists(file_path):
        return send_from_directory(FRONTEND_DIR, filename)
    else:
        print(f"[ERROR] Static file not found: {file_path}")
        abort(404)


# ----------- API ROUTES -----------

@app.route("/translations", methods=["GET"])
def get_translations():
    data = list(get_translation_groups().items())
    return Response(json.dumps(data, indent=2), content_type='application/json')


@app.route('/translate', methods=['POST'])
def translate():
    code = request.json.get("code", "")
    return jsonify({"translated": translate_code(code)})


@app.route('/run', methods=['POST'])
def run():
    code = request.json.get("code", "")
    inputs = request.json.get("inputs", [])
    translated = translate_code(code)

    input_iter = iter(inputs)

    def __get_input(prompt=""):
        try:
            return next(input_iter)
        except StopIteration:
            return ""

    old_stdout = sys.stdout
    sys.stdout = mystdout = io.StringIO()

    try:
        exec(translated, {"__get_input": __get_input, "input": __get_input})
        output = mystdout.getvalue()
    except Exception as e:
        output = f"Error: {e}"

    sys.stdout = old_stdout
    return jsonify({"output": output.strip()})


# ----------- LAUNCH -----------

if __name__ == "__main__":
    print(f"Serving from: {FRONTEND_DIR}")
    app.run(host="0.0.0.0", port=5000)
