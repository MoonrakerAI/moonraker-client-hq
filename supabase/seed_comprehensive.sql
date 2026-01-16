-- Comprehensive Seed Data with Workflow Tasks
-- This script maps the CSV task columns (NEO, Gmail, Access, etc.) to the workflow_tasks table.

-- 1. Create a temporary function to handle insertion of practice + its tasks
-- This makes the script cleaner and prevents ID mismatches.

DO $$
DECLARE
    p_id UUID;
BEGIN
    -- ALBUQUERQUE FAMILY COUNSELING
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes)
    VALUES ('Albuquerque Family Counseling', 'Done', '7/11/2025', 'Kelly Chisholm', 'kellychis1@gmail.com', 'https://www.albuquerquefamilycounseling.com/', 'https://business.google.com/n/6451376326815819895/profile?fid=9750267116799049422', 'https://docs.google.com/spreadsheets/d/1YdaVY7RcQbFJGPgYw4eaK1UynavzAyqRMBSFkGXAklA/edit?gid=575597049#gid=575597049', '')
    RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES
    (p_id, 'Neo Creative Implementation', 'Doing', 'NEO', 'Execution Phase', 10),
    (p_id, 'System Access & Permissions', 'Open', 'Access', 'Pre-Kickoff', 1);

    -- AMY HAGERSTROM
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes)
    VALUES ('Amy Hagerstrom', 'Doing', '6/20/2025', 'Amy Hagerstrom', 'amy@amyhagerstrom.com', 'https://www.amyhagerstrom.com/', 'https://business.google.com/n/13908733005355393678/profile?fid=11182263645957907346', 'https://docs.google.com/spreadsheets/d/1tFXMb01ioDu-xx0Qk0ovS9xQWEN2NtJhJLsyYx_tlUU/edit?gid=1653538786#gid=1653538786', 'We need to update the Whitespark order for her with the new address she gives us. We need to update her website to match her GBP address. She will be reverifying soon')
    RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES
    (p_id, 'Neo Creative Implementation', 'Doing', 'NEO', 'Execution Phase', 10),
    (p_id, 'System Access & Permissions', 'Open', 'Access', 'Pre-Kickoff', 1);

    -- AUDREY SCHOEN LMFT
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes)
    VALUES ('Audrey Schoen LMFT', 'Done', '8/1/2024', 'Audrey Schoen', 'connect@audreylmft.com', 'https://www.audreylmft.com/', 'https://business.google.com/n/12446916804880561539/profile?fid=16825523167462682805', 'https://docs.google.com/spreadsheets/d/1aYed38rLzRVVHiJ8gxaI9gBx4bdBIO26hJ6j4DBhSoI/edit?usp=drive_link', 'Directories, Create GTM')
    RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES
    (p_id, 'Neo Creative Implementation', 'Doing', 'NEO', 'Execution Phase', 10),
    (p_id, 'System Access & Permissions', 'Open', 'Access', 'Pre-Kickoff', 1);

    -- BELLEVUE COUNSELING
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes)
    VALUES ('Bellevue Counseling', 'Done', '9/16/2025', 'Daniel Arteaga', 'daniel@bellevue-counseling.com', 'https://www.bellevue-counseling.com/', 'https://business.google.com/n/11282642744905966452/profile?fid=16257416500437905960', 'https://docs.google.com/spreadsheets/d/1vLn_kGKhzWpHUKFzHg4UAr-tuF_G2FiiyMWdxV6eWY4/edit?usp=drive_link', 'Directories started. NOTIFY BEFORE UPDATING SPEED!')
    RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES
    (p_id, 'Neo Creative Implementation', 'Doing', 'NEO', 'Execution Phase', 10),
    (p_id, 'System Access & Permissions', 'Open', 'Access', 'Pre-Kickoff', 1);

    -- CAUGHT DREAMIN
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes)
    VALUES ('Caught Dreamin', 'Done', '9/25/2025', 'JoAnne Garrow', 'joanneg@caughtdreamintherapy.com', 'https://www.caughtdreamintherapy.com/', 'https://business.google.com/n/8728330434017745476/profile?fid=8220752229694066155', 'https://docs.google.com/spreadsheets/d/1Bqyh6j17upSQ4EHjozHFhKIubCaPFuUIATSOFxteIVE/edit?usp=sharing', 'Directories started, wait on PR for GBP. Create GA4 and GTM')
    RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES
    (p_id, 'Neo Creative Implementation', 'Doing', 'NEO', 'Execution Phase', 10),
    (p_id, 'System Access & Permissions', 'Open', 'Access', 'Pre-Kickoff', 1);

END $$;
