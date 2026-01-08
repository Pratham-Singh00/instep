#!/bin/bash

# In Step Community Connect - WordPress Theme Build Script
# This script builds the React app and packages everything for WordPress theme distribution

set -e

echo "🚀 Starting In Step Community Connect Theme Build..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR"

# Define paths
THEME_DIR="$PROJECT_ROOT/wordpress-theme/instep-community-connect"
BUILD_OUTPUT="$PROJECT_ROOT/wordpress/wp-plugin/instep-community-connect/assets/build"

echo -e "${BLUE}📦 Building React application...${NC}"
npm run build:wordpress

echo -e "${BLUE}📋 Copying build assets to theme...${NC}"
rm -rf "$THEME_DIR/assets/build"
cp -r "$BUILD_OUTPUT" "$THEME_DIR/assets/"

echo -e "${BLUE}📋 Copying admin assets and data...${NC}"
cp "$PROJECT_ROOT/wordpress/wp-plugin/instep-community-connect/assets/admin.css" "$THEME_DIR/assets/"
cp "$PROJECT_ROOT/wordpress/wp-plugin/instep-community-connect/data/default-content.json" "$THEME_DIR/data/"

echo -e "${BLUE}🗜️  Creating theme ZIP file...${NC}"
cd "$PROJECT_ROOT/wordpress-theme"
THEME_NAME="instep-community-connect"
ZIP_NAME="${THEME_NAME}.zip"

# Remove old ZIP if it exists
rm -f "$ZIP_NAME"

# Create new ZIP
zip -r "$ZIP_NAME" "$THEME_NAME" -x "*.DS_Store" "*/node_modules/*" "*/.git/*" "*/.gitignore"

echo -e "${GREEN}✅ Build complete!${NC}"
echo -e "${GREEN}📦 Theme package created: wordpress-theme/${ZIP_NAME}${NC}"
echo ""
echo -e "${BLUE}📝 Next steps:${NC}"
echo "   1. Upload ${ZIP_NAME} to WordPress"
echo "   2. Go to Appearance → Themes → Add New → Upload Theme"
echo "   3. Install and activate the theme"
echo ""
echo -e "${GREEN}🎉 Ready to deploy!${NC}"
