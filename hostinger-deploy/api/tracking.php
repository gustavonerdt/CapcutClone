<?php
/**
 * API Endpoint: Tracking Events
 * POST /api/tracking.php - Create tracking event
 * GET /api/tracking.php - Get all events (admin only)
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';

setCORSHeaders();

$pdo = getDBConnection();

// GET - Get all tracking events (admin only)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    requireAdmin();
    
    try {
        $stmt = $pdo->query("
            SELECT * FROM tracking_events 
            ORDER BY created_at DESC
        ");
        
        $events = $stmt->fetchAll();
        sendJSON($events);
        
    } catch (PDOException $e) {
        error_log("Get tracking events error: " . $e->getMessage());
        sendJSON(['error' => 'Failed to fetch events'], 500);
    }
}

// POST - Create tracking event
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getJSONInput();
    
    // Validate required fields
    if (empty($data['sessionId']) || empty($data['eventType'])) {
        sendJSON(['error' => 'Missing required fields'], 400);
    }
    
    try {
        $eventId = generateUUID();
        $now = date('Y-m-d H:i:s');
        
        $stmt = $pdo->prepare("
            INSERT INTO tracking_events 
            (id, session_id, event_type, step_number, answer_id, metadata, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $eventId,
            $data['sessionId'],
            $data['eventType'],
            $data['stepNumber'] ?? null,
            $data['answerId'] ?? null,
            isset($data['metadata']) ? json_encode($data['metadata']) : null,
            $now
        ]);
        
        // Update session last_activity_at
        $updateStmt = $pdo->prepare("
            UPDATE sessions 
            SET last_activity_at = ? 
            WHERE id = ?
        ");
        $updateStmt->execute([$now, $data['sessionId']]);
        
        sendJSON(['id' => $eventId], 201);
        
    } catch (PDOException $e) {
        error_log("Tracking event error: " . $e->getMessage());
        sendJSON(['error' => 'Failed to create tracking event'], 500);
    }
}

sendJSON(['error' => 'Method not allowed'], 405);
