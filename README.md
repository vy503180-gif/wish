# Birthday Surprise — Mobile-First GitHub Pages Website

A responsive birthday microsite with a name-personalized greeting, falling decorations, interactive message tiles, a birthday cake illustration, and a background song attempt. Built with plain HTML, CSS, and JavaScript.

## Files
- `index.html` — content and audio element
- `style.css` — visual design, mobile layouts, cake, balloons, and falling effects
- `script.js` — personalized name, surprise tiles, confetti, falling decorations, and audio startup
- `assets/audio/happy-birthday.mp3` — optional recorded song file; add a recording you have permission to use

## Add a song
Put your legally usable MP3 at `assets/audio/happy-birthday.mp3`. The site attempts to play it automatically, but mobile Chrome and Safari may block autoplay with sound. If blocked, the visitor can tap anywhere once to start it. This is a browser restriction; a website cannot reliably force audible autoplay on every phone.

## Publish to GitHub Pages
1. Create a repository, for example `birthday-surprise`.
2. Upload all files and the `assets/audio` folder, preserving the folder structure.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, branch `main`, folder `/(root)`, then **Save**.
5. Open the published URL shown on that page.

Example URL: `https://YOUR-USERNAME.github.io/birthday-surprise/`

## Personalize the link
- Recipient: `https://YOUR-USERNAME.github.io/birthday-surprise/?name=Rahul`
- Recipient + sender: `https://YOUR-USERNAME.github.io/birthday-surprise/?name=Rahul&from=Vicky`

Replace `YOUR-USERNAME` with your GitHub username. URL-encode spaces and special characters if needed.

## Important audio note
Browsers intentionally limit autoplay with sound. This project tries to start the MP3 on page load and also starts it after the visitor's first tap or keypress if the browser blocks it. Do not expect sound to start automatically in every browser.
