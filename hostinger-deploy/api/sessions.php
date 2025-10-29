<?php
/**
 * API Endpoint: Create Tracking Session
 * POST /api/sessions.php
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';

setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

try {
    $pdo = getDBConnection();
    $sessionId = generateUUID();
    $now = date('Y-m-d H:i:s');
    
    $stmt = $pdo->prepare("
        INSERT INTO sessions (id, started_at, last_activity_at, completed_quiz, clicked_buy)
        VALUES (?, ?, ?, 0, 0)
    ");
    
    $stmt->execute([$sessionId, $now, $now]);
    
    sendJSON(['sessionId' => $sessionId], 201);
    
} catch (PDOException $e) {
    error_log("Session creation error: " . $e->getMessage());
    sendJSON(['error' => 'Failed to create session'], 500);
}
