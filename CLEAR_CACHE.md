# Clear Portfolio Cache

If you're seeing broken images for GitHub projects, you need to clear the cached data:

## Option 1: Through Browser Console

1. Open your portfolio website
2. Press `F12` or right-click → Inspect
3. Go to **Console** tab
4. Run this command:

```javascript
localStorage.removeItem('portfolio_selected_repos');
location.reload();
```

## Option 2: Through Admin Panel

1. Click the gear icon (⚙️) in bottom-right corner
2. Deselect all projects with broken images
3. Click "Save Selection"
4. Re-select those projects again (they will be re-analyzed)
5. Click "Save Selection" again

## Option 3: Clear All Browser Data

1. In your browser, go to Settings → Privacy → Clear browsing data
2. Select "Cached images and files" and "Local Storage"
3. Click Clear
4. Reload your portfolio

---

After clearing, all GitHub projects will show their first letter in a styled box (like your Color Palette Generator and LeetCode projects).
