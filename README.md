<div align="center">
  <img src="public/pytono-interprito.png" alt="Pytono Interprito Logo" width="300"/>
</div>

---

**Pytono Interprito** is a playful-yet-practical platform for writing Python code using custom syntax, featuring `tung` and `sahur` for `elif` and `else`, `bombardiro` and `crocodilo` for `def` and `return`, and `tralalero` and `tralala` for `input` and `print`.  

Under the hood, it's a tool for **designing and testing your own Python dialects** — great for educational experiments, language learners, or just for fun.

---

⚠️ **Alpha Notice**  
This project is currently in its **alpha stage**. Expect changes, features in flux, and lots more brainrot translations soon to come. Contributions, feedback, and absurd new keywords are welcome!

---

## 🧩 Features

- 🔤 **Custom Syntax Mapping**  
  Translate your keywords into real Python syntax (e.g., `ratatata` → `if`, `frulli` → `for`, `cappuccino` → `not`).

- 💻 **Live Code Execution**  
  Type, translate, and run your code directly in the browser with a Monaco Editor interface.

- 📜 **Translation Viewer**  
  Click a button to see all supported translations, categorized by purpose (conditionals, loops, etc.).

- 🧪 **Two Modes of Execution**
  - Use `PytonoInterprito.py` from the command line or in Jupyter.
  - Launch the web UI with `app.py` for a cozy and beautiful environment.

---

## 🚀 Getting Started

### 🐍 Prerequisites

- Python 3.8+
- `Flask`, `flask_cors`
- (Optional) Jupyter Notebook if you want the cell magic (your IDE will likely complain about typos)

```bash
pip install flask flask_cors
```

---

### 🧠 Brainrot-to-Python Example

```python
la:
    x = 10 / 0
vaca ZeroDivisionError:
    tralala("You can't divide by zero!")
saturno:
    tralala("No errors here!")
saturnita:
    tralala("- Tralalero Tralala")
```

⬇️ Becomes ⬇️

```python
try:
    x = 10 / 0
except ZeroDivisionError:
    print("You can't divide by zero!")
else:
    print("No errors here!")
finally:
    print("- Tralalero Tralala")
```

---

### 🧪 Run the App

Start the web server:

```bash
python backend/app.py
```

Then open your browser to:  
[http://127.0.0.1:5000](http://127.0.0.1:5000)

---

### 🧙‍♀️ Use in Jupyter (IDE will complain but code will run)

```python
%%PytonoInterprito

bombardiro say_hello():

    crocodilo "Hello, World!"

tralala(say_hello())

```

---

## 🪟 Download for Windows

Download the alpha release [here](https://utdallas.box.com/s/vmt4nr4nwiv6yuvnzx7sikuqywa6fgjv).

### 🚀 How to Run

1. Download the `.zip` file for your OS from the above link.
2. Extract the folder:  
   e.g., `PytonoInterprito-win32-x64.zip`
3. Open the extracted folder and run:
  `Pytono Interprito.exe`
> ⚠️ If you see a Windows SmartScreen warning, click **"More info"** → **"Run anyway"**. This is expected for unsigned apps in early development.

---

## 🗂 Project Structure

```
.
├── backend/
│   ├── app.py              # Flask server
│   └── PytonoInterprito.py # Core translator and executor
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
```

---

## 🧠 Add Your Own Language

You can customize the `get_translation_groups()` function in `PytonoInterprito.py` to add your own dialect — no need to stick to brainrot!

```python
("My Cool Words", {
    "scoot": "while",
    "zoop": "pass"
})
```

---

## 📦 Packaging

The backend is compatible with [PyInstaller](https://pyinstaller.org/) and other bundlers. A splash screen is supported, and runtime quirks can be handled via a loading screen delay.

---

## 🎯 Project Goals

This project is *not* just a joke — it’s a **framework for designing and testing language translations on top of Python**. If you want to create your own syntax, local dialect, or teaching tool, Pytono Interprito gives you a solid foundation with:

- A clean translation backend
- Jupyter and web support
- Syntax highlighting and categorized mappings

---

## 🤌 Brainrot Lexicon (partial)

| Brainrot     | Python |
|--------------|--------|
| `ratatata`   | `if`   |
| `sahur`      | `else` |
| `bombardiro` | `def`  |
| `tralala`    | `print`|
| `frulli`     | `for`  |
| `brr`        | `break`|

Use the in-app modal to view the full list!

---

## 🔮 Roadmap

- [ ] 🗣 More Italian brainrot translations
- [ ] 🧬 User-defined keyword upload support
- [ ] 💾 Persistent translation profiles
- [ ] 📁 Multi-file editor support
- [ ] 🔌 Integration with Pyodide for browser-only execution
- [ ] 🧪 Testing framework and error highlighting

---

## 🧃 Credits

Built by [@Zainuddin Mohammed](https://github.com/zainuddinmohammed)

---

![The Scooter in Question](https://i.imgur.com/CT8sDui.gif)
