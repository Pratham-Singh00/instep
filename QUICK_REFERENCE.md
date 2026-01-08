# 🚀 Quick Reference Guide - In Step Community Connect Theme

## 📦 Theme Package

**Location**: `wordpress-theme/instep-community-connect.zip`
**Size**: ~822 KB
**Status**: ✅ Ready to install

## ⚡ Quick Install (3 Steps)

1. **Upload**: WordPress Admin → Appearance → Themes → Add New → Upload Theme
2. **Install**: Select `instep-community-connect.zip` → Install Now
3. **Activate**: Click "Activate" button

Done! Your site is live on all devices.

## 📱 Device Compatibility

✅ **Mobile Phones** (320px-767px) - Fully optimized
✅ **Tablets** (768px-1024px) - Perfect display
✅ **Desktops** (1025px+) - Full featured

## ⚙️ Requirements

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| WordPress  | 6.0     | 6.4+        |
| PHP        | 8.3     | 8.3+        |
| MySQL      | 5.7     | 8.0+        |

**⚠️ Important**: PHP 8.3 is REQUIRED (enforced by theme)

## 🎨 Editing Content

**Location**: WordPress Admin → **In Step Content** (left menu)

### Quick Edit Fields:
- Primary Phone Number
- Hero Highlight Text
- Hero Description  
- Contact Email
- Contact Phone
- Footer About Text

### Advanced Edit:
- Use JSON editor for complete control
- Structure matches default-content.json

## 📁 Files Overview

```
instep-community-connect.zip (Main package)
├── style.css (Theme header - REQUIRED)
├── functions.php (Setup & config)
├── index.php (Main template - REQUIRED)
├── header.php (Header template)
├── footer.php (Footer template)
├── responsive.css (Mobile styles)
├── screenshot.jpg (Theme preview)
├── assets/build/ (React app)
└── data/default-content.json (Content)
```

## 🔧 Common Tasks

### Change Phone Number
Admin → In Step Content → Primary Phone Number → Save

### Update Hero Text
Admin → In Step Content → Hero Highlight Text → Save

### Modify Contact Info
Admin → In Step Content → Contact Email/Phone → Save

### Edit All Content
Admin → In Step Content → Advanced JSON Editor → Save

## 🌐 Testing URLs

After installation, test these:
- Homepage: `yoursite.com/`
- Mobile: Use browser dev tools (F12) → Device toolbar
- Tablet: Resize browser window
- Desktop: Full screen view

## 🐛 Troubleshooting

### Theme Won't Activate
- **Check**: PHP version (must be 8.3+)
- **Fix**: Contact hosting to upgrade PHP

### Content Not Showing
- **Check**: Browser console (F12)
- **Fix**: Clear cache, save settings again

### Looks Broken
- **Check**: All CSS/JS files loaded
- **Fix**: Clear cache, re-save settings

### Can't Edit Content
- **Check**: User role (must be Administrator)
- **Fix**: Log in as admin user

## 📊 Performance Tips

1. **Install caching**: WP Super Cache or W3 Total Cache
2. **Optimize images**: Compress before upload
3. **Use CDN**: Cloudflare (free) recommended
4. **Keep updated**: WordPress, theme, plugins

## 🔒 Security Checklist

- [ ] Use strong admin password
- [ ] Enable HTTPS (SSL)
- [ ] Install security plugin (Wordfence)
- [ ] Keep WordPress updated
- [ ] Regular backups

## 📱 Responsive Features

✅ **Automatic**:
- Viewport scaling
- Responsive images
- Touch-friendly buttons
- Mobile menu
- Flexible layouts

**No configuration needed** - works out of the box!

## 🎯 Key Endpoints

REST API (auto-configured):
- `/wp-json/instep/v1/content` - Site content
- `/wp-json/instep/v1/team` - Team members
- `/wp-json/wp/v2/posts` - Blog posts

## 📞 Quick Support

**Issue**: Can't install theme
**Check**: File size limits, PHP version, WordPress version

**Issue**: Not responsive
**Check**: Browser cache, viewport meta tag loaded

**Issue**: Content not updating
**Check**: Cache plugins, save settings, browser cache

## 🎉 Success Indicators

After installation, you should see:
✅ Theme appears in Appearance → Themes
✅ Site displays on mobile perfectly
✅ Site displays on desktop perfectly
✅ "In Step Content" appears in admin menu
✅ All images load
✅ Navigation works
✅ No PHP errors

## 📚 Documentation

- **Installation Guide**: `INSTALLATION.md`
- **Theme README**: Inside ZIP → `README.md`
- **Conversion Details**: `CONVERSION_SUMMARY.md`

## 🔄 Rebuilding (Developers)

If you modify the React app:

```bash
# Build
npm run build:wordpress

# Copy assets
cp -r wordpress/wp-plugin/instep-community-connect/assets/build \
     wordpress-theme/instep-community-connect/assets/

# Or use build script
./build-theme.sh

# Repackage
cd wordpress-theme
zip -r instep-community-connect.zip instep-community-connect
```

## ✅ Pre-Launch Checklist

- [ ] Theme uploaded and activated
- [ ] PHP 8.3+ confirmed
- [ ] Content updated (phone, email, text)
- [ ] Tested on mobile device
- [ ] Tested on tablet
- [ ] Tested on desktop
- [ ] All browsers tested (Chrome, Firefox, Safari)
- [ ] Images loading correctly
- [ ] Navigation working
- [ ] Contact forms tested
- [ ] Cache cleared
- [ ] SSL enabled (HTTPS)
- [ ] Backup created

## 🎯 Quick Stats

- **Theme Version**: 1.0.0
- **Package Size**: 822 KB
- **Files Included**: 28+ files
- **React Components**: Fully optimized
- **CSS Bundle**: Minified
- **JS Bundle**: Minified
- **Images**: Optimized

## 🌟 Features Included

✅ Responsive design (all devices)
✅ WordPress admin integration
✅ Content management system
✅ REST API
✅ Modern React frontend
✅ SEO optimized
✅ Accessibility ready
✅ Performance optimized
✅ Security hardened
✅ Translation ready
✅ PHP 8.3 compatible

---

**Ready to Deploy!** 🚀

Upload `wordpress-theme/instep-community-connect.zip` to WordPress and activate!
