# In Step Community Connect - WordPress Theme Installation Guide

## 🎯 Overview

This guide will help you install the In Step Community Connect WordPress theme. The theme is a modern, responsive solution that works on all devices.

## ✅ Requirements

Before installing, ensure your server meets these requirements:

- **WordPress**: Version 6.0 or higher
- **PHP**: Version 8.3 or higher (REQUIRED)
- **MySQL**: Version 5.7 or higher (or MariaDB 10.3+)
- **HTTPS**: Recommended for security

## 📦 Installation Methods

### Method 1: WordPress Admin Upload (Recommended)

1. **Download the theme ZIP file**
   - File name: `instep-community-connect.zip`
   - Location: `wordpress-theme/instep-community-connect.zip`

2. **Log into WordPress Admin**
   - Go to your WordPress admin panel (usually `yoursite.com/wp-admin`)

3. **Navigate to Themes**
   - Click **Appearance** → **Themes**

4. **Upload Theme**
   - Click **Add New** at the top
   - Click **Upload Theme**
   - Click **Choose File** and select `instep-community-connect.zip`
   - Click **Install Now**

5. **Activate Theme**
   - After installation completes, click **Activate**

### Method 2: FTP/File Manager Upload

1. **Extract the ZIP file**
   - Unzip `instep-community-connect.zip`
   - You should see a folder named `instep-community-connect`

2. **Upload via FTP**
   - Connect to your server via FTP (using FileZilla, Cyberduck, etc.)
   - Navigate to `/wp-content/themes/`
   - Upload the entire `instep-community-connect` folder

3. **Activate in WordPress**
   - Go to WordPress Admin → Appearance → Themes
   - Find "In Step Community Connect"
   - Click **Activate**

## ⚙️ Post-Installation Setup

### 1. Verify PHP Version

After activation, if you see a warning about PHP version:
- Contact your hosting provider to upgrade to PHP 8.3 or higher
- Most modern hosts support PHP 8.3 (it's recommended for security and performance)

### 2. Configure Site Content

1. **Go to the Content Editor**
   - In WordPress Admin, click **In Step Content** in the left menu

2. **Edit Quick Settings**
   - Primary Phone Number
   - Hero Highlight Text
   - Hero Description
   - Contact Email
   - Contact Phone
   - Footer About Text

3. **Save Changes**
   - Click **Save Changes** button

### 3. Set Homepage (Optional)

If you want a static homepage:

1. Go to **Settings** → **Reading**
2. Select "A static page" for "Your homepage displays"
3. Create a new page and select it as the homepage

### 4. Create Menus (Optional)

1. Go to **Appearance** → **Menus**
2. Create a menu for "Primary Menu"
3. Add pages/links to your menu
4. Assign to "Primary Menu" location

### 5. Customize Site Identity

1. Go to **Appearance** → **Customize**
2. Click **Site Identity**
3. Update:
   - Site Title
   - Tagline
   - Upload Logo (optional)

## 📱 Responsive Design

The theme is fully responsive and optimized for:

- **Mobile Phones**: 320px - 767px
- **Tablets**: 768px - 1024px
- **Desktops**: 1025px and up

No additional configuration needed - it works automatically!

## 🔧 Troubleshooting

### Issue: Theme doesn't appear after activation

**Solution:**
1. Check PHP version (must be 8.3+)
2. Check error logs in WordPress Admin → Tools → Site Health
3. Ensure all theme files uploaded correctly

### Issue: Content doesn't display

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Clear WordPress cache (if using a caching plugin)
3. Check browser console for JavaScript errors (F12 key)

### Issue: Styles look broken

**Solution:**
1. Go to In Step Content and save settings (even without changes)
2. Clear all caches
3. Check that CSS files loaded: View page source → look for .css files

### Issue: PHP version warning

**Solution:**
- Contact your hosting provider to upgrade PHP to 8.3
- Most hosts provide this in cPanel or hosting control panel
- Popular hosts supporting PHP 8.3:
  - Bluehost
  - SiteGround
  - WP Engine
  - Kinsta
  - DreamHost

## 🚀 Performance Tips

1. **Use a Caching Plugin**
   - WP Super Cache
   - W3 Total Cache
   - WP Rocket

2. **Optimize Images**
   - Use WebP format when possible
   - Compress images before upload
   - Install Smush or ShortPixel plugin

3. **Use a CDN**
   - Cloudflare (free option)
   - StackPath
   - KeyCDN

4. **Keep WordPress Updated**
   - Regularly update WordPress core
   - Keep theme updated
   - Update plugins regularly

## 📊 Theme Features

✅ Fully responsive design
✅ Modern React-based frontend
✅ WordPress admin integration
✅ RESTful API
✅ SEO optimized
✅ Accessibility ready (WCAG 2.1 Level AA)
✅ Fast loading times
✅ Touch-friendly interface
✅ Cross-browser compatible

## 🔒 Security Best Practices

1. **Keep Everything Updated**
   - WordPress core
   - This theme
   - All plugins

2. **Use Strong Passwords**
   - For admin accounts
   - For database
   - For FTP/hosting

3. **Install Security Plugin**
   - Wordfence Security
   - Sucuri Security
   - iThemes Security

4. **Enable HTTPS**
   - Get SSL certificate (often free with hosting)
   - Force HTTPS in WordPress settings

## 📞 Support

If you encounter any issues:

1. Check this installation guide first
2. Review the README.md file in the theme
3. Check WordPress error logs
4. Contact In Step Community Connect Team

## 🎉 Success!

Once installed and configured, your site should be fully functional on all devices. Test on:

- Desktop browser
- Mobile phone (iOS and Android)
- Tablet
- Different browsers (Chrome, Firefox, Safari, Edge)

## 📝 Quick Checklist

- [ ] PHP 8.3+ verified
- [ ] Theme uploaded and activated
- [ ] Content editor accessed and configured
- [ ] Phone numbers and emails updated
- [ ] Site tested on mobile device
- [ ] Site tested on desktop
- [ ] Menus configured (if needed)
- [ ] Logo uploaded (optional)
- [ ] Caching plugin installed (recommended)

---

**Version**: 1.0.0
**Last Updated**: 2025

For the latest version and updates, please contact the In Step Community Connect Team.
