class CardCreator {
    constructor() {
        this.canvas = new fabric.Canvas('designCanvas');
        this.init();
    }

    init() {
        this.setupCanvas();
        this.loadTemplates();
        this.loadIcons();
        this.setupEventListeners();
    }

    setupCanvas() {
        this.canvas.setBackgroundColor('#ffffff', this.canvas.renderAll.bind(this.canvas));
        this.canvas.selection = true;
    }

    setupEventListeners() {
        // Add text button
        document.getElementById('addTextBtn').addEventListener('click', () => {
            this.addText();
        });

        // Save design
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveDesign();
        });

        // Export design
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportDesign();
        });

        // Text input changes
        document.getElementById('textInput').addEventListener('input', (e) => {
            this.updateSelectedText(e.target.value);
        });

        // Font changes
        document.getElementById('fontSelect').addEventListener('change', (e) => {
            this.updateSelectedFont(e.target.value);
        });

        // Color changes
        document.getElementById('textColor').addEventListener('change', (e) => {
            this.updateSelectedColor(e.target.value);
        });

        // Delete button
        document.getElementById('deleteBtn').addEventListener('click', () => {
            this.deleteSelected();
        });

        // Keyboard delete (Delete key)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                this.deleteSelected();
            }
        });
    }

    async loadTemplates() {
        try {
            const response = await fetch('api/templates.php');
            const data = await response.json();
            
            if (data.categories) {
                this.renderCategories(data.categories);
            } else if (data.templates) {
                this.renderTemplates(data.templates);
            }
        } catch (error) {
            console.error('Error loading templates:', error);
        }
    }

    async loadTemplatesByCategory(categoryId) {
        try {
            const response = await fetch(`api/templates.php?category=${categoryId}`);
            const data = await response.json();
            
            if (data.templates) {
                this.renderTemplates(data.templates, categoryId);
            }
        } catch (error) {
            console.error('Error loading templates for category:', error);
        }
    }

    async loadIcons() {
        try {
            const response = await fetch('api/icons.php');
            const icons = await response.json();
            this.renderIcons(icons);
        } catch (error) {
            console.error('Error loading icons:', error);
        }
    }

    renderCategories(categories) {
        const container = document.getElementById('templateList');
        container.innerHTML = '<h4 style="margin-bottom: 1rem; color: #333;">Select Category</h4>';
        
        categories.forEach(category => {
            const item = document.createElement('div');
            item.className = 'template-item category-item';
            item.innerHTML = `
                <img src="${category.thumbnail}" alt="${category.name}" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px;">
                <span style="font-size: 12px; margin-top: 4px; font-weight: bold;">${category.name}</span>
            `;
            item.addEventListener('click', () => this.loadTemplatesByCategory(category.id));
            container.appendChild(item);
        });
    }

    renderTemplates(templates, categoryId = null) {
        const container = document.getElementById('templateList');
        container.innerHTML = '';
        
        // Add back button if we're in a category
        if (categoryId) {
            const backBtn = document.createElement('button');
            backBtn.className = 'btn btn-secondary';
            backBtn.style.cssText = 'width: 100%; margin-bottom: 1rem; padding: 0.5rem;';
            backBtn.innerHTML = '← Back to Categories';
            backBtn.addEventListener('click', () => this.loadTemplates());
            container.appendChild(backBtn);
            
            const title = document.createElement('h4');
            title.style.cssText = 'margin-bottom: 1rem; color: #333; text-transform: capitalize;';
            title.textContent = `${categoryId} Templates`;
            container.appendChild(title);
        }
        
        if (templates.length === 0) {
            const noTemplates = document.createElement('div');
            noTemplates.style.cssText = 'text-align: center; color: #666; padding: 2rem;';
            noTemplates.innerHTML = 'No templates found in this category.<br>Admin can add templates here.';
            container.appendChild(noTemplates);
            return;
        }
        
        templates.forEach(template => {
            const item = document.createElement('div');
            item.className = 'template-item';
            item.innerHTML = `
                <img src="${template.thumbnail}" alt="${template.name}" style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px;">
                <span style="font-size: 12px; margin-top: 4px;">${template.name}</span>
            `;
            item.addEventListener('click', () => this.loadTemplate(template));
            container.appendChild(item);
        });
    }

    renderIcons(icons) {
        const container = document.getElementById('iconList');
        container.innerHTML = '';
        
        icons.forEach(icon => {
            const item = document.createElement('div');
            item.className = 'icon-item';
            item.innerHTML = `<img src="${icon.path}" alt="${icon.name}" style="max-width: 100%; max-height: 100%;">`;
            item.addEventListener('click', () => this.addIcon(icon));
            container.appendChild(item);
        });
    }

    loadTemplate(template) {
        this.canvas.clear();
        
        // Load template image as background
        if (template.image) {
            fabric.Image.fromURL(template.image, (img) => {
                // Scale image to fit canvas
                const canvasWidth = this.canvas.getWidth();
                const canvasHeight = this.canvas.getHeight();
                
                img.set({
                    scaleX: canvasWidth / img.width,
                    scaleY: canvasHeight / img.height,
                    selectable: false,
                    evented: false
                });
                
                this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
            });
        } else if (template.background) {
            this.canvas.setBackgroundColor(template.background, this.canvas.renderAll.bind(this.canvas));
        }
        
        // Load template elements if any
        if (template.elements) {
            template.elements.forEach(element => {
                if (element.type === 'text') {
                    const text = new fabric.Text(element.text, {
                        left: element.x,
                        top: element.y,
                        fontSize: element.fontSize,
                        fill: element.color,
                        fontFamily: 'Arial'
                    });
                    this.canvas.add(text);
                }
            });
        }
    }

    addText() {
        const text = new fabric.Text('Your Text Here', {
            left: 100,
            top: 100,
            fontFamily: 'Arial',
            fontSize: 20,
            fill: '#000000'
        });
        this.canvas.add(text);
        this.canvas.setActiveObject(text);
    }

    addIcon(icon) {
        console.log('Attempting to add icon:', icon);
        
        // Create a test image to check if the path is valid
        const testImg = new Image();
        testImg.onload = () => {
            console.log('Image loaded successfully, adding to canvas...');
            
            fabric.Image.fromURL(icon.path, (fabricImg) => {
                if (!fabricImg) {
                    console.error('Fabric.js failed to create image from:', icon.path);
                    return;
                }
                
                console.log('Fabric image created, configuring...');
                
                fabricImg.set({
                    left: Math.random() * 200 + 100, // Random position to see multiple icons
                    top: Math.random() * 200 + 100,
                    scaleX: 0.3,
                    scaleY: 0.3,
                    selectable: true,
                    evented: true,
                    hasControls: true,
                    hasBorders: true
                });
                
                console.log('Adding to canvas...');
                this.canvas.add(fabricImg);
                this.canvas.setActiveObject(fabricImg);
                this.canvas.renderAll();
                console.log('Icon successfully added to canvas!');
                
            }, { crossOrigin: 'anonymous' });
        };
        
        testImg.onerror = (error) => {
            console.error('Failed to load image:', icon.path, error);
        };
        
        testImg.src = icon.path;
    }

    updateSelectedText(value) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.set('text', value);
            this.canvas.renderAll();
        }
    }

    updateSelectedFont(font) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.set('fontFamily', font);
            this.canvas.renderAll();
        }
    }

    updateSelectedColor(color) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.set('fill', color);
            this.canvas.renderAll();
        }
    }

    deleteSelected() {
        const activeObject = this.canvas.getActiveObject();
        
        if (activeObject) {
            // Check if it's a group selection (multiple objects)
            if (activeObject.type === 'activeSelection') {
                // Delete multiple selected objects
                activeObject.forEachObject((obj) => {
                    this.canvas.remove(obj);
                });
                this.canvas.discardActiveObject();
            } else {
                // Delete single selected object
                this.canvas.remove(activeObject);
            }
            
            this.canvas.renderAll();
            console.log('Object(s) deleted successfully');
        } else {
            console.log('No object selected to delete');
        }
    }

    async saveDesign() {
        const designData = {
            canvas: JSON.stringify(this.canvas.toJSON()),
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch('api/save.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(designData)
            });
            
            const result = await response.json();
            if (result.success) {
                alert('Design saved successfully!');
            }
        } catch (error) {
            console.error('Error saving design:', error);
            alert('Error saving design');
        }
    }

    exportDesign() {
        const dataURL = this.canvas.toDataURL({
            format: 'png',
            quality: 1
        });
        
        const link = document.createElement('a');
        link.download = 'card-design.png';
        link.href = dataURL;
        link.click();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new CardCreator();
});