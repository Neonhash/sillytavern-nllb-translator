from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

def translate(text):
    try:
        # Übersetzungsbefehl an NLLB senden
        process = subprocess.Popen(
            ['python', 'translate.py', text],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            raise Exception(stderr.decode('utf-8'))

        return stdout.decode('utf-8')

    except Exception as e:
        print(f"Fehler bei der Übersetzung: {e}")
        return "Übersetzungsfehler"

@app.route('/translate', methods=['POST'])
def handle_translation():
    data = request.json
    text = data.get('text')
    if not text:
        return jsonify({'error': 'Kein Text zum Übersetzen angegeben'}), 400

    translated_text = translate(text)
    return jsonify({'translated_text': translated_text})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5007)
