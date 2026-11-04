# BunkBench GNDEC

**GNDEC's notes, chaos, and semester survival kit.**

BunkBench GNDEC is an unofficial, student-made Mechanical Engineering resource hub for GNDEC students. It is not affiliated with or endorsed by GNDEC. Verify official notices through official college channels.

## Run locally

Open `index.html` directly for a quick preview, or run a small local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## BunkBench GNDEC Admin Workflow

1. Add a PDF or image to the correct repository folder, such as `resources/` or `assets/memes/`.
2. Add its details in the appropriate data file: `data/resources.js`, `data/updates.js`, `data/memes.js`, or `data/subjects.js`.
3. Preview the website locally before publishing.
4. Commit and push the changes to GitHub.
5. GitHub Pages publishes the update.

### Content notes

- Use relative paths such as `resources/thermo-notes.pdf`.
- Only label a link as an official source when it points to the actual GNDEC or department website.
- Do not upload personal data, private notices, or copyrighted books without permission.
- There is no login or upload system: GitHub is the content-management workflow.

## Pages

`index.html` is the public landing page. `resources.html`, `subject.html`, `timetable.html`, `updates.html`, `memes.html`, and `about.html` are the student-facing sections. `admin-guide.html` is a static owner reference page and is not a secure admin panel.
