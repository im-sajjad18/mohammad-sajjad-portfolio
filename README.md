# Mohammad Sajjad — Personal Portfolio

A responsive, cinematic dark portfolio built with React 19, Vite, Framer Motion, Lucide icons, and custom CSS.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Personalize
Edit `src/config/site.js` to update your identity, biography, contact details, education, skills, and featured project.

### Add your portrait
Place your own portrait at `public/assets/portrait.webp`. Your supplied portrait is included at `public/assets/portrait.webp` and is used in the hero section. It is converted to WebP without altering the subject's facial appearance or composition.

### Add project artwork
The featured Sajjad.words artwork is an original CSS composition. Replace it with your own project screenshot by updating the project section in `src/main.jsx` if desired.

## Deploy to GitHub Pages
1. Create a GitHub repository, for example `mohammad-sajjad-portfolio`.
2. Push this project to the repository's `main` branch.
3. The included `vite.config.js` is preconfigured for a repository named `mohammad-sajjad-portfolio`. If you choose another repository name, change the GitHub Actions base path in that file to `'/YOUR-REPOSITORY-NAME/'`. For a custom domain or user site repository, use `'/'`.
4. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
5. Add the workflow below as `.github/workflows/deploy.yml` and push again.
6. After the workflow succeeds, GitHub Pages will publish the site at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

The exact public URL depends on your GitHub username and repository name, which have not yet been supplied.
