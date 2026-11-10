# Interactive Testing Lab

A dark-themed, browser-based learning project demonstrating **White Box Testing** and **Black Box Testing** for Software Engineering students.

## Features

### White Box Testing lab
- Interactive voting eligibility example.
- Displays illustrative Python source code.
- Highlights the condition and executed TRUE/FALSE branch.
- Tracks branch coverage across the current browser session.
- Demonstrates boundary values such as 17, 18 and 19.

### Black Box Testing lab
- Simulated login form.
- Try valid, invalid and empty credentials.
- Seven predefined functional test cases.
- Compares expected and actual outcomes and reports pass/fail.

### Knowledge check
- Three-question quiz with explanations and score.

## Run locally

No installation or build tools are required.

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`, or open it in a browser.
4. Internet is only needed to load the optional Google Fonts. The app itself runs locally.

For a local development server, you can also run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new **public** repository, for example `interactive-testing-lab`.
2. Upload all files and folders from this project. Keep the folder structure unchanged.
3. Open the repository's **Settings** tab.
4. Select **Pages** in the left sidebar.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then click **Save**.
7. Wait for GitHub Pages to publish. Your site will be available at:

   `https://YOUR-USERNAME.github.io/interactive-testing-lab/`

Replace `YOUR-USERNAME` with your GitHub username and use your repository name in the URL.

## Important learning notes

- The White Box example shows Python-like source code for teaching, but the interactive browser logic is an equivalent JavaScript implementation in `white-box/whitebox.js`. The highlighted path is a teaching trace, not a Python interpreter or production code-coverage tool.
- The Black Box example is a deliberately simple simulated login contract. Its demo credentials (`admin` / `1234`) are visible in the JavaScript file. **Do not use this as real authentication or deploy it to protect real accounts.**
- The branch coverage shown is based on the two outcomes of one `if` decision in this example. It is not full statement, condition, path or application-wide coverage.
- Both approaches are useful and complementary in real software testing.

## Project structure

```text
interactive-testing-lab/
├── index.html
├── style.css
├── script.js
├── white-box/
│   └── whitebox.js
├── black-box/
│   └── blackbox.js
└── README.md
```

## License

You may use, modify and share this educational project. Add your own name, course details and screenshots before submitting it as coursework.
