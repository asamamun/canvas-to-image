<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Load actual icons from assets/icons directory
$icons = [];

// Birthday icons
$birthdayIcons = [
    ['name' => 'Birthday', 'file' => 'birthday.png'],
    ['name' => 'Birthday Cake', 'file' => 'birthday-cake.png'],
    ['name' => 'Cupcake', 'file' => 'cupcake.png']
];

foreach ($birthdayIcons as $icon) {
    $iconPath = '../assets/icons/birthday/' . $icon['file'];
    if (file_exists($iconPath)) {
        $icons[] = [
            'id' => uniqid(),
            'name' => $icon['name'],
            'path' => 'assets/icons/birthday/' . $icon['file'],
            'category' => 'birthday'
        ];
    }
}

// Add some fallback SVG icons if they exist
$fallbackIcons = [
    ['name' => 'Heart', 'file' => 'heart.svg'],
    ['name' => 'Star', 'file' => 'star.svg'],
    ['name' => 'Gift', 'file' => 'gift.svg']
];

foreach ($fallbackIcons as $icon) {
    $iconPath = '../assets/icons/' . $icon['file'];
    if (file_exists($iconPath)) {
        $icons[] = [
            'id' => uniqid(),
            'name' => $icon['name'],
            'path' => 'assets/icons/' . $icon['file'],
            'category' => 'general'
        ];
    }
}

echo json_encode($icons);
?>