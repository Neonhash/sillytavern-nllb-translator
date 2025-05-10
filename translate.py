import sys

def translate_text(text):
    # Hier wird später die tatsächliche NLLB-Übersetzungslogik implementiert
    # Vorerst eine einfache Rückgabe für Testzwecke
    return f"Übersetzt: {text}"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Verwendung: python translate.py <text>")
        sys.exit(1)

    input_text = sys.argv[1]
    print(translate_text(input_text))
