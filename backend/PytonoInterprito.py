import sys
from IPython import get_ipython
from IPython.core.magic import register_cell_magic
import re
from collections import OrderedDict


def get_translation_groups():
    return OrderedDict([
        ("Conditionals", {
            "ratatata": "if",
            "tung": "elif",
            "sahur": "else"
        }),
        ("Exceptions", {
            "la": "try",
            "vaca": "except",
            "saturno": "else",
            "saturnita": "finally"
        }),
        ("Functions", {
            "bombardiro": "def",
            "crocodilo": "return",
            "bombombini gusini": "lambda"
        }),
        ("Input/Output", {
            "tralalero": "input",
            "tralala": "print"
        }),
        ("Logic Operators", {
            "ballerina": "is",
            "cappuccina": "not",
            "cappuccino": "not",
            "assassino": "in",
            "dun": "is",
            "ma": "not",
            "din": "in"
        }),
        ("Loops", {
            "frulli": "for",
            "frulla": "for",
            "brr": "break",
            "brrbrr": "break",
            "patapim": "continue",
            "boneca": "break",
            "ambalabu": "continue"
        })
    ])


def get_translation_map():
    merged = {}
    for group in get_translation_groups().values():
        merged.update(group)
    return merged


def translate_code(code: str) -> str:
    translation_map = get_translation_map()

    sorted_keywords = sorted(translation_map.items(), key=lambda x: len(x[0]), reverse=True)

    lines = code.split('\n')
    translated_lines = []

    for line in lines:
        original_line = line
        for brainrot_kw, py_kw in sorted_keywords:
            pattern = r'\b' + re.escape(brainrot_kw) + r'\b'
            if py_kw == "input":
                line = re.sub(pattern + r'\((.*?)\)', r'__get_input(\1)', line)
            else:
                line = re.sub(pattern, py_kw, line)
        translated_lines.append(line)

    return '\n'.join(translated_lines)


def interpret(code: str):
    translated = translate_code(code)
    exec(translated)


shell = get_ipython()
if shell:
    from IPython.core.magic import register_cell_magic

    @register_cell_magic
    def PytonoInterprito(line, cell):
        """Jupyter cell magic: translates brainrot syntax to Python and runs it."""
        code = translate_code(cell)
        exec(code, globals())


def main():
    if len(sys.argv) != 2:
        print("Usage: python pytono.py <filename.pyto>")
        sys.exit(1)

    filename = sys.argv[1]
    with open(filename, 'r', encoding='utf-8') as f:
        custom_code = f.read()

    translated_code = translate_code(custom_code)

    # print("=== Translated Python Code ===")
    # print(translated_code)

    exec(translated_code)


if __name__ == "__main__":
    main()
