# Jill Hayhurst | CMHC e-Portfolio

## How the files are organized

- index.html: Home page (Curriculum Vitae and Letters of Recommendation)
- professional-development/: overview page plus one page per area
- counselor-identity/: overview page plus one page per disposition
- css/style.css: every color, font, and layout rule for the whole site
- js/main.js: builds the side menu, the next and previous links, and the document viewers
- artifacts/: put your PDFs and images here

## Adding an artifact

1. Save the file into the artifacts folder with a simple name and no spaces, like cnl-500-theories-presentation.pdf.
2. Open the page for that artifact and find its panel (search for the assignment title).
3. Type the path between the quotes in data-file, always starting with artifacts/:
   data-file="artifacts/cnl-500-theories-presentation.pdf"
4. Save. The document now shows right on the page with an "Open in a new tab" link, and the progress line updates.

## Adding a reflection (disposition pages)

Find the reflection box on the page and put each paragraph inside its own p tag:
<p>First paragraph of the reflection.</p>
<p>Second paragraph.</p>

## Changing the look

Colors and fonts are at the top of css/style.css under :root. Change one there and it changes everywhere.

## Changing the menu

The side menu comes from the SITE list at the top of js/main.js. Edit it there once and every page updates.
