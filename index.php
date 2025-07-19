<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Creator</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Card Creator</h1>
            <div class="header-actions">
                <button id="deleteBtn" class="btn btn-danger">Delete Selected</button>
                <button id="saveBtn" class="btn btn-primary">Save Design</button>
                <button id="exportBtn" class="btn btn-secondary">Export</button>
            </div>
        </header>
        
        <div class="main-content">
            <aside class="sidebar">
                <div class="panel">
                    <h3>Templates</h3>
                    <div id="templateList" class="template-grid"></div>
                </div>
                
                <div class="panel">
                    <h3>Icons</h3>
                    <div id="iconList" class="icon-grid"></div>
                </div>
                
                <div class="panel">
                    <h3>Text</h3>
                    <button id="addTextBtn" class="btn btn-block">Add Text</button>
                    <div class="text-controls">
                        <input type="text" id="textInput" placeholder="Enter text">
                        <select id="fontSelect">
                            <option value="Arial">Arial</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Times">Times</option>
                        </select>
                        <input type="color" id="textColor" value="#000000">
                    </div>
                </div>
            </aside>
            
            <main class="canvas-area">
                <canvas id="designCanvas" width="800" height="600"></canvas>
            </main>
        </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js"></script>
    <script src="assets/js/app.js"></script>
</body>
</html>