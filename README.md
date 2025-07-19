# Card Creator App

A web-based card creation application that allows users to create custom greeting cards using templates, icons, and text. Built with PHP backend and HTML/CSS/JavaScript frontend using Fabric.js for canvas manipulation.

## 🎯 Features

### Core Functionality
- **Category-based Template System** - Organized templates by Birthday, Wedding, Invitation categories
- **Interactive Canvas Editor** - Drag, resize, and manipulate objects on canvas
- **Icon Library** - Click-to-add icons with PNG/SVG support
- **Text Editing** - Add custom text with font and color controls
- **Design Management** - Save designs as JSON and export as PNG
- **Object Deletion** - Remove selected objects with Delete key or button

### User Workflow
1. **Select Category** - Choose from Birthday, Wedding, or Invitation
2. **Browse Templates** - View all available templates in selected category
3. **Load Template** - Click template to load as canvas background
4. **Customize Design** - Add icons, text, and modify properties
5. **Save/Export** - Save design to server or export as PNG image

## 🏗️ Architecture

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Fabric.js 5.3.0
- **Backend**: PHP 8+
- **Canvas**: Fabric.js for interactive design editing
- **File Storage**: JSON for designs, PNG/SVG/JPG for templates/icons

### File Structure
```
/
├── index.php                 # Main application page
├── api/
│   ├── templates.php         # Template and category API
│   ├── icons.php            # Icon library API
│   └── save.php             # Design saving API
├── assets/
│   ├── css/
│   │   └── style.css        # Application styles
│   ├── js/
│   │   └── app.js           # Main application logic
│   ├── templates/           # Template images organized by category
│   │   ├── birthday/        # Birthday card templates
│   │   ├── wedding/         # Wedding card templates
│   │   ├── invitation/      # Invitation card templates
│   │   └── *.svg           # Fallback category thumbnails
│   └── icons/
│       ├── birthday/        # Birthday-specific icons (PNG)
│       └── *.svg           # General purpose icons
└── uploads/                 # User-generated design files
```

## 🔧 API Endpoints

### Templates API (`api/templates.php`)
- **GET `/api/templates.php`** - Returns list of categories
- **GET `/api/templates.php?category={id}`** - Returns templates for specific category

**Response Format:**
```json
{
  "categories": [
    {
      "id": "birthday",
      "name": "Birthday", 
      "description": "Birthday card templates",
      "thumbnail": "assets/templates/birthday.svg"
    }
  ]
}
```

### Icons API (`api/icons.php`)
- **GET `/api/icons.php`** - Returns available icons

**Response Format:**
```json
[
  {
    "id": "unique_id",
    "name": "Birthday Cake",
    "path": "assets/icons/birthday/birthday-cake.png",
    "category": "birthday"
  }
]
```

### Save API (`api/save.php`)
- **POST `/api/save.php`** - Saves design data

**Request Format:**
```json
{
  "canvas": "{fabric.js canvas JSON}",
  "timestamp": "2025-07-19T14:30:00.000Z"
}
```

## 🎨 Frontend Components

### CardCreator Class (`assets/js/app.js`)
Main application class handling:
- Canvas initialization and management
- Template/category loading and rendering
- Icon management and addition
- Text manipulation and styling
- Object deletion and selection
- Design saving and exporting

### Key Methods
- `loadTemplates()` - Loads categories or templates based on context
- `loadTemplatesByCategory(categoryId)` - Loads templates for specific category
- `renderCategories(categories)` - Displays category selection grid
- `renderTemplates(templates, categoryId)` - Displays template grid with back navigation
- `addIcon(icon)` - Adds icon to canvas with proper scaling and positioning
- `addText()` - Adds editable text object to canvas
- `deleteSelected()` - Removes selected objects from canvas
- `saveDesign()` - Saves current design to server
- `exportDesign()` - Exports canvas as PNG download

## 🎛️ User Interface

### Header Controls
- **Delete Selected** - Red button to remove selected objects
- **Save Design** - Blue button to save current design
- **Export** - Gray button to download design as PNG

### Sidebar Panels
1. **Templates Panel**
   - Category selection grid
   - Template browsing with thumbnails
   - Back navigation button
   
2. **Icons Panel**
   - Icon grid with click-to-add functionality
   - Supports PNG and SVG formats
   
3. **Text Panel**
   - "Add Text" button
   - Text input field for editing selected text
   - Font family dropdown
   - Color picker for text color

### Canvas Area
- 800x600 pixel design canvas
- Template images as non-selectable backgrounds
- Interactive objects (icons/text) with selection handles
- Drag and drop functionality
- Multi-select support

## 🔑 Key Features Implementation

### Template System
- **Category-based organization** with dynamic directory scanning
- **Fallback templates** for empty categories
- **Multiple format support** (JPG, PNG, SVG)
- **Automatic thumbnail generation** from template files

### Icon Management
- **PNG format optimization** for better Fabric.js compatibility
- **Random positioning** to prevent icon stacking
- **Proper scaling** (0.3x) for appropriate canvas size
- **Selection controls** with borders and handles

### Text Editing
- **Real-time updates** when typing in text input
- **Font family selection** (Arial, Georgia, Times)
- **Color customization** with color picker
- **Proper canvas integration** with Fabric.js text objects

### Object Deletion
- **Multiple deletion methods**: Delete key, Backspace key, Delete button
- **Multi-select support** for batch deletion
- **Safe deletion** that preserves template backgrounds
- **Visual feedback** with console logging

## 🚀 Getting Started

### Prerequisites
- PHP 8+ with web server (Apache/Nginx)
- Modern web browser with JavaScript enabled

### Installation
1. Clone/download the project files
2. Place in web server directory
3. Ensure PHP has write permissions to `uploads/` directory
4. Access `index.php` in web browser

### Adding Content
**Templates**: Add JPG/PNG/SVG files to category directories:
- `assets/templates/birthday/`
- `assets/templates/wedding/`
- `assets/templates/invitation/`

**Icons**: Add PNG files to:
- `assets/icons/birthday/` (category-specific)
- `assets/icons/` (general purpose, SVG format)

## 🔧 Configuration

### Canvas Settings
- **Size**: 800x600 pixels (configurable in `setupCanvas()`)
- **Background**: White default, replaced by template images
- **Selection**: Enabled for all objects except template backgrounds

### File Formats
- **Templates**: JPG, JPEG, PNG, SVG
- **Icons**: PNG (recommended), SVG (with special handling)
- **Export**: PNG format, quality: 1.0

## 🐛 Troubleshooting

### Common Issues
1. **Icons not loading**: Check file paths and permissions
2. **Templates not appearing**: Verify directory structure and file formats
3. **Save functionality failing**: Check PHP write permissions on uploads directory
4. **Canvas not responding**: Ensure Fabric.js CDN is accessible

### Browser Console
Enable browser developer tools to see detailed logging:
- Template loading progress
- Icon addition steps
- Error messages and debugging info

## 🔮 Future Enhancements

### Potential Features
- **Drag and drop** icon addition from sidebar
- **Image upload** functionality for custom images
- **More text formatting** options (bold, italic, size)
- **Shape tools** (rectangles, circles, lines)
- **Layer management** with z-index controls
- **Template preview** modal before loading
- **User accounts** and design galleries
- **Collaborative editing** features
- **Print optimization** and PDF export

### Technical Improvements
- **Database integration** for better template/design management
- **Image optimization** and thumbnail generation
- **Responsive design** for mobile devices
- **Progressive Web App** capabilities
- **Real-time collaboration** with WebSockets

## 📝 Development Notes

### Code Organization
- **Modular structure** with separate API endpoints
- **Class-based JavaScript** for maintainability
- **Consistent error handling** throughout application
- **Comprehensive logging** for debugging

### Performance Considerations
- **Lazy loading** of templates and icons
- **Efficient canvas rendering** with Fabric.js
- **Minimal DOM manipulation** for smooth interactions
- **Optimized image formats** for faster loading

---

**Last Updated**: July 19, 2025
**Version**: 1.0.0
**Author**: Card Creator Development Team