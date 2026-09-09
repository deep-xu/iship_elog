-- NS5 schema. Every table is created only when missing, so running the
-- migration repeatedly is safe.

-- ---------------------------------------------------------------- accounts
CREATE TABLE IF NOT EXISTS users (
  user_id       VARCHAR(64)  NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(64)  NOT NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------ equipment structure
-- The equipment tree, one row per node. `parent_id` is NULL for the Fleet
-- root. `seeded` marks nodes that came from the PMS import, so user additions
-- survive a re-seed.
CREATE TABLE IF NOT EXISTS equipment_nodes (
  id         VARCHAR(191) NOT NULL,
  parent_id  VARCHAR(191) NULL,
  label      VARCHAR(255) NOT NULL,
  category   VARCHAR(64)  NULL,
  part_no    VARCHAR(128) NULL,
  maker      VARCHAR(191) NULL,
  depth      INT          NOT NULL DEFAULT 0,
  sort_order INT          NOT NULL DEFAULT 0,
  seeded     TINYINT(1)   NOT NULL DEFAULT 0,
  -- NULL means the node is part of the shared hierarchy every account sees.
  -- A user id restricts the node (and its whole branch) to that account.
  owner_user_id VARCHAR(64) NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_equipment_parent (parent_id),
  KEY idx_equipment_label (label),
  KEY idx_equipment_owner (owner_user_id),
  CONSTRAINT fk_equipment_parent FOREIGN KEY (parent_id)
    REFERENCES equipment_nodes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Per-account renames of a shared equipment node. The node itself stays
-- shared; only the label this account sees changes.
CREATE TABLE IF NOT EXISTS equipment_node_labels (
  node_id    VARCHAR(191) NOT NULL,
  user_id    VARCHAR(64)  NOT NULL,
  label      VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (node_id, user_id),
  KEY idx_node_label_user (user_id),
  CONSTRAINT fk_node_label_node FOREIGN KEY (node_id)
    REFERENCES equipment_nodes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- "Allow Counter" / "Not Allow" per equipment, keyed by normalized name.
CREATE TABLE IF NOT EXISTS counter_allowed (
  equipment_key VARCHAR(191) NOT NULL,
  allowed       TINYINT(1)   NOT NULL,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (equipment_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------- maintenance plan
CREATE TABLE IF NOT EXISTS maintenance_plan_jobs (
  job_no        VARCHAR(64)  NOT NULL,
  major_system  VARCHAR(255) NULL,
  sub_system    VARCHAR(255) NULL,
  component     VARCHAR(255) NULL,
  job_title     VARCHAR(512) NULL,
  job_type      VARCHAR(64)  NULL,
  priority      VARCHAR(64)  NULL,
  basis         VARCHAR(64)  NULL,
  interval_text VARCHAR(64)  NULL,
  last_done     VARCHAR(64)  NULL,
  next_due      VARCHAR(64)  NULL,
  status        VARCHAR(64)  NULL,
  critical      CHAR(1)      NULL,
  class_related CHAR(1)      NULL,
  department    VARCHAR(128) NULL,
  responsible   VARCHAR(128) NULL,
  linked_part_no VARCHAR(128) NULL,
  stock_qty     VARCHAR(32)  NULL,
  stock_status  VARCHAR(64)  NULL,
  remarks       TEXT         NULL,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (job_no),
  KEY idx_plan_major (major_system),
  KEY idx_plan_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------- standard jobs
-- `origin` = 'seed' for the base PMS list, 'user' for jobs created or edited
-- in the Standard Job window (a user row with the same job_no wins).
CREATE TABLE IF NOT EXISTS standard_jobs (
  job_no        VARCHAR(64)  NOT NULL,
  ship          VARCHAR(128) NULL,
  job_title     VARCHAR(512) NULL,
  major_system  VARCHAR(255) NULL,
  sub_system    VARCHAR(255) NULL,
  component     VARCHAR(255) NULL,
  basis         VARCHAR(64)  NULL,
  interval_text VARCHAR(64)  NULL,
  last_done     VARCHAR(64)  NULL,
  next_due      VARCHAR(64)  NULL,
  completion_date VARCHAR(64) NULL,
  reading_at_completion VARCHAR(64) NULL,
  status        VARCHAR(64)  NULL,
  critical      CHAR(1)      NULL,
  class_related CHAR(1)      NULL,
  department    VARCHAR(128) NULL,
  performed_by  VARCHAR(128) NULL,
  responsible   VARCHAR(128) NULL,
  linked_part_no VARCHAR(128) NULL,
  stock_qty     VARCHAR(32)  NULL,
  stock_status  VARCHAR(64)  NULL,
  remarks       TEXT         NULL,
  origin        ENUM('seed','user') NOT NULL DEFAULT 'seed',
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (job_no),
  KEY idx_std_origin (origin),
  KEY idx_std_major (major_system)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Jobs added on a Standard Job form's "Related Jobs" tab. `source_key` is the
-- Standard Job record they were entered from; saving that record replaces the
-- whole set for that source.
CREATE TABLE IF NOT EXISTS related_jobs (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  source_key   VARCHAR(191) NOT NULL,
  major_system VARCHAR(255) NULL,
  sub_system   VARCHAR(255) NULL,
  component    VARCHAR(255) NULL,
  data         JSON         NOT NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_related_source (source_key),
  KEY idx_related_component (component),
  KEY idx_related_major (major_system),
  KEY idx_related_sub (sub_system)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------- work orders
CREATE TABLE IF NOT EXISTS work_orders (
  wo_no           VARCHAR(64)  NOT NULL,
  standard_job_no VARCHAR(64)  NULL,
  job_no          VARCHAR(64)  NULL,
  ship            VARCHAR(128) NULL,
  job_title       VARCHAR(512) NULL,
  workflow_status VARCHAR(64)  NOT NULL DEFAULT 'active',
  data            JSON         NOT NULL,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (wo_no),
  KEY idx_wo_standard_job (standard_job_no),
  KEY idx_wo_job (job_no),
  KEY idx_wo_status (workflow_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Completed-job history backing the Work Order Search grid.
CREATE TABLE IF NOT EXISTS work_order_history (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ship            VARCHAR(128) NULL,
  job_no          VARCHAR(64)  NULL,
  job_title       VARCHAR(512) NULL,
  major_system    VARCHAR(255) NULL,
  component       VARCHAR(255) NULL,
  completion_date VARCHAR(64)  NULL,
  reading_at_completion VARCHAR(64) NULL,
  department      VARCHAR(128) NULL,
  performed_by    VARCHAR(128) NULL,
  remarks         TEXT         NULL,
  PRIMARY KEY (id),
  KEY idx_woh_job (job_no),
  KEY idx_woh_completion (completion_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------ simple tasks
CREATE TABLE IF NOT EXISTS simple_tasks (
  id         VARCHAR(191) NOT NULL,
  title      VARCHAR(512) NULL,
  status     VARCHAR(64)  NULL,
  ship       VARCHAR(128) NULL,
  data       JSON         NOT NULL,
  position   INT          NOT NULL DEFAULT 0,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_task_position (position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------- running hours
-- Current counter value per machine (the "edits" map in the old store).
CREATE TABLE IF NOT EXISTS running_hours_counters (
  machine_key VARCHAR(191) NOT NULL,
  data        JSON         NOT NULL,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (machine_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Every counter reading ever committed, newest first per machine.
CREATE TABLE IF NOT EXISTS running_hours_history (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  machine_key VARCHAR(191) NOT NULL,
  position    INT          NOT NULL DEFAULT 0,
  data        JSON         NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_rhh_machine (machine_key, position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------ certificates
CREATE TABLE IF NOT EXISTS vessel_certificates (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ship          VARCHAR(128) NULL,
  cert_type     VARCHAR(128) NULL,
  code          VARCHAR(64)  NULL,
  cert_no       VARCHAR(128) NULL,
  cert_name     VARCHAR(255) NULL,
  issue_date    VARCHAR(64)  NULL,
  expiry_date   VARCHAR(64)  NULL,
  last_survey   VARCHAR(64)  NULL,
  next_survey   VARCHAR(64)  NULL,
  due_days      VARCHAR(32)  NULL,
  due_tone      VARCHAR(32)  NULL,
  intermediate1 VARCHAR(128) NULL,
  intermediate2 VARCHAR(128) NULL,
  next_action   VARCHAR(128) NULL,
  origin        ENUM('seed','user') NOT NULL DEFAULT 'seed',
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_vc_ship (ship),
  KEY idx_vc_expiry (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Survey certificate rows plus the full Standard Job detail behind each one.
CREATE TABLE IF NOT EXISTS survey_certificates (
  id         VARCHAR(191) NOT NULL,
  row_type   VARCHAR(32)  NOT NULL DEFAULT 'job',
  name       VARCHAR(255) NULL,
  title      VARCHAR(255) NULL,
  last_iss   VARCHAR(64)  NULL,
  last_due   VARCHAR(64)  NULL,
  interval_text VARCHAR(64) NULL,
  next_due   VARCHAR(64)  NULL,
  ext        VARCHAR(64)  NULL,
  position   INT          NOT NULL DEFAULT 0,
  row_data   JSON         NOT NULL,
  detail     JSON         NULL,
  origin     ENUM('seed','user') NOT NULL DEFAULT 'seed',
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sc_position (position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------- spare parts
CREATE TABLE IF NOT EXISTS spare_parts (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ship         VARCHAR(128) NULL,
  part_no      VARCHAR(128) NULL,
  description  VARCHAR(512) NULL,
  category     VARCHAR(128) NULL,
  maker        VARCHAR(191) NULL,
  major_system VARCHAR(255) NULL,
  sub_system   VARCHAR(255) NULL,
  component    VARCHAR(255) NULL,
  unit         VARCHAR(32)  NULL,
  stock_qty    DECIMAL(14,2) NULL,
  min_stock    DECIMAL(14,2) NULL,
  reorder_qty  DECIMAL(14,2) NULL,
  unit_cost    DECIMAL(14,2) NULL,
  total_value  DECIMAL(14,2) NULL,
  location     VARCHAR(255) NULL,
  status       VARCHAR(64)  NULL,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sp_part_no (part_no),
  KEY idx_sp_component (component),
  KEY idx_sp_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------- documents
-- Free-form saved state for the detail windows (Equipment, Part, Standard Job
-- forms, explorer layout, dashboard filters and bookmarks). Each window owns
-- one key; the shape of `data` is the window's own, so it stays JSON.
CREATE TABLE IF NOT EXISTS documents (
  doc_key    VARCHAR(191) NOT NULL,
  doc_type   VARCHAR(64)  NOT NULL DEFAULT 'generic',
  data       JSON         NOT NULL,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (doc_key),
  KEY idx_doc_type (doc_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
