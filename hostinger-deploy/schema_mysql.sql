-- ============================================
-- Naiper's Club - MySQL Database Schema
-- For Hostinger Deployment
-- ============================================

-- Create sessions table
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` CHAR(36) PRIMARY KEY,
  `started_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `completed_quiz` TINYINT(1) NOT NULL DEFAULT 0,
  `clicked_buy` TINYINT(1) NOT NULL DEFAULT 0,
  INDEX `idx_sessions_started_at` (`started_at`),
  INDEX `idx_sessions_completed_quiz` (`completed_quiz`),
  INDEX `idx_sessions_clicked_buy` (`clicked_buy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create tracking_events table
CREATE TABLE IF NOT EXISTS `tracking_events` (
  `id` CHAR(36) PRIMARY KEY,
  `session_id` CHAR(36) NOT NULL,
  `event_type` VARCHAR(50) NOT NULL,
  `step_number` INT NULL,
  `answer_id` VARCHAR(100) NULL,
  `metadata` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_tracking_session_id` (`session_id`),
  INDEX `idx_tracking_event_type` (`event_type`),
  INDEX `idx_tracking_created_at` (`created_at`),
  CONSTRAINT `fk_tracking_session` 
    FOREIGN KEY (`session_id`) 
    REFERENCES `sessions`(`id`) 
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create quiz_responses table
CREATE TABLE IF NOT EXISTS `quiz_responses` (
  `id` CHAR(36) PRIMARY KEY,
  `session_id` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `answer1` VARCHAR(255) NOT NULL,
  `answer2` VARCHAR(255) NOT NULL,
  `answer3` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_quiz_session_id` (`session_id`),
  INDEX `idx_quiz_email` (`email`),
  INDEX `idx_quiz_created_at` (`created_at`),
  CONSTRAINT `fk_quiz_session` 
    FOREIGN KEY (`session_id`) 
    REFERENCES `sessions`(`id`) 
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Sample Data for Testing (Optional)
-- ============================================

-- Uncomment below to insert sample data for testing

/*
-- Insert a test session
INSERT INTO sessions (id, started_at, last_activity_at, completed_quiz, clicked_buy) 
VALUES ('test-session-123', NOW(), NOW(), 1, 0);

-- Insert a test tracking event
INSERT INTO tracking_events (id, session_id, event_type, step_number, answer_id, created_at)
VALUES ('test-event-123', 'test-session-123', 'page_view', 0, NULL, NOW());

-- Insert a test quiz response
INSERT INTO quiz_responses (id, session_id, name, email, phone, answer1, answer2, answer3, created_at)
VALUES (
  'test-response-123', 
  'test-session-123', 
  'Test User', 
  'test@example.com', 
  '+5511999999999',
  'sites-lojas-brasil',
  'economizar',
  'parece-bom',
  NOW()
);
*/
