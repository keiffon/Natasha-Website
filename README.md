Warm Woods Books — local site

How to add or change book cover images

- Put image files in the `images/` folder (create subfolders if you like).
- Edit `script.js` and set the `cover` property for each book to the relative path, for example `"images/cover1.jpg"`.
- Recommended image size: 800×1200 (portrait) or a similar tall ratio. The CSS uses `background-size: cover` so the image scales to fill the card.

Example book entry in `script.js`:

{
  id: 1,
  title: "Hearthside Stories",
  author: "Anya Rowe",
  desc: "Short contemplative tales...",
  tone: "earth",
  cover: "images/hearthside.jpg"
}

Committing & pushing

If you want to push to a remote Git repo, provide the repo URL and I can add it and push for you. Or run these commands locally:

```powershell
Set-Location -Path 'c:\Users\keiff\OneDrive\Documents\Natasha website'
git remote add origin <REMOTE_URL>
git push -u origin master
```

If you prefer an isolated repo (already created here), you can add images and commit normally:

```powershell
git add images/your-image.jpg
git commit -m "Add cover images"
git push
```

Need help? Reply with the image filenames or upload the images and I'll wire them into the site for you.