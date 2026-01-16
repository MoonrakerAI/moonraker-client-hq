-- FULL HQ SEED SCRIPT
-- This script populates ALL 50+ clients with their current task states.

DO $$
DECLARE
    p_id UUID;
BEGIN
    -- Albuquerque Family Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Albuquerque Family Counseling', 'Done', '7/11/2025', 'Kelly Chisholm', 'kellychis1@gmail.com', 'https://www.albuquerquefamilycounseling.com/', 'https://business.google.com/n/6451376326815819895/profile?fid=9750267116799049422', 'https://docs.google.com/spreadsheets/d/1YdaVY7RcQbFJGPgYw4eaK1UynavzAyqRMBSFkGXAklA/edit?gid=575597049#gid=575597049', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Amy Hagerstrom
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Amy Hagerstrom', 'Doing', '6/20/2025', 'Amy Hagerstrom', 'amy@amyhagerstrom.com', 'https://www.amyhagerstrom.com/', 'https://business.google.com/n/13908733005355393678/profile?fid=11182263645957907346', 'https://docs.google.com/spreadsheets/d/1tFXMb01ioDu-xx0Qk0ovS9xQWEN2NtJhJLsyYx_tlUU/edit?gid=1653538786#gid=1653538786', 'We need to update the Whitespark order for her with the new address she gives us. We need to update her website to match her GBP address. She will be reverifying soon') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- An Affair of the Heart
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('An Affair of the Heart', 'Done', '2020', 'Ross Hackerson', 'n/a', 'https://www.anaffairoftheheart.us/', 'https://business.google.com/n/1834792608770663888/profile?fid=16961108294114525086', 'https://docs.google.com/spreadsheets/d/11M99pUeAaweZW_2cW78A51W0qYUX6UThD6PpdcKR4lo/edit?usp=drive_link', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Audrey Schoen LMFT
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Audrey Schoen LMFT', 'Done', '8/1/2024', 'Audrey Schoen', 'connect@audreylmft.com', 'https://www.audreylmft.com/', 'https://business.google.com/n/12446916804880561539/profile?fid=16825523167462682805', 'https://docs.google.com/spreadsheets/d/1aYed38rLzRVVHiJ8gxaI9gBx4bdBIO26hJ6j4DBhSoI/edit?usp=drive_link', 'Directories, Create GTM') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Bay Area Therapy For Wellness
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Bay Area Therapy For Wellness', 'Waiting on Client', '3/8/2025', 'Stephanie Crouch', 'Stephanie@bayareatherapyforwellness.com', 'https://www.bayareatherapyforwellness.com/', 'https://business.google.com/n/7055862785149981506/profile?fid=4171688106429219558', 'https://docs.google.com/spreadsheets/d/17lDirkwT3t69X8QKEgMe_kITNeMQPjW492wlX6GnVP0/edit?usp=drive_link', 'Technical , still waiting on Dublin and Pleasanton, CA pages') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Bellevue Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Bellevue Counseling', 'Done', '9/16/2025', 'Daniel Arteaga', 'daniel@bellevue-counseling.com', 'https://www.bellevue-counseling.com/', 'https://business.google.com/n/11282642744905966452/profile?fid=16257416500437905960', 'https://docs.google.com/spreadsheets/d/1vLn_kGKhzWpHUKFzHg4UAr-tuF_G2FiiyMWdxV6eWY4/edit?usp=drive_link', 'Directories started. NOTIFY BEFORE UPDATING SPEED!') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Brain Based EMDR
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Brain Based EMDR', 'Done', '1/23/2025', 'Libby Murdoch', 'libbymurdoch@brainbasedcounseling.com', 'https://www.brainbasedemdr.com/', 'n/a', 'Not included', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Bridges of The Mind
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Bridges of The Mind', 'Done', '3/12/2025', 'Erika Frieze', 'erika@bridgesofthemind.com', 'https://bridgesofthemind.com/', 'Multiple', 'https://docs.google.com/spreadsheets/d/1mMbMdr_NIPxqlqhaLgdjcf-EcofJnTPpP8sbF15n2NA/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Calm Blue Waters Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Calm Blue Waters Counseling', 'Done', '10/9/2025', 'Amy Castongia', 'calmbluewaterscounseling@outlook.com', 'https://www.calmbluewaterscounseling.com/', 'https://business.google.com/n/16988883448963660952/profile?fid=16709786345177411914', 'https://docs.google.com/spreadsheets/d/1kesw8ISLwVEOcqY6bx1lp8Fn3qJy35PhyGrbtIF5qHA/edit?gid=575597049#gid=575597049', 'Create GTM') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Canyon Passages
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Canyon Passages', 'Done', '7/11/2025', 'Kelly Chisholm', 'kellychis1@gmail.com', 'https://www.canyonpassages.com/', 'https://business.google.com/n/8276629340484939254/profile?fid=13259579632914419774', 'https://docs.google.com/spreadsheets/d/1BxKrLLoP1i1p_BFYxdMCLtBn7LxfMBH7hugwJZC0GjY/edit?usp=sharing', 'PR, Directories, GBP posts, Create GA4 and GTM') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Caught Dreamin
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Caught Dreamin', 'Done', '9/25/2025', 'JoAnne Garrow', 'joanneg@caughtdreamintherapy.com', 'https://www.caughtdreamintherapy.com/', 'https://business.google.com/n/8728330434017745476/profile?fid=8220752229694066155', 'https://docs.google.com/spreadsheets/d/1Bqyh6j17upSQ4EHjozHFhKIubCaPFuUIATSOFxteIVE/edit?usp=sharing', 'Directories started, wait on PR for GBP. Create GA4 and GTM') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Clarity EMDR Therapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Clarity EMDR Therapy', 'Waiting on Client', '', 'Brian Powell', '', '', '', 'https://docs.google.com/spreadsheets/d/1N67IupI11-od6upJPionYasqILBL1S1xNr1sv5xmdC4/edit?usp=sharing', 'Technicals, Verify Ownership, Create GTM') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Cope & Calm Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Cope & Calm Counseling', 'Done', '7/31/2025', 'Amber Young', 'amberyoung@copecalm.com', 'https://www.copeandcalm.com/', 'https://business.google.com/n/12307590044492017227/profile?fid=2950509435805860725', 'https://docs.google.com/spreadsheets/d/1aZimbFgRZjz3nUBPTlVwo3ji7QO0F4OJ7426kn7oZLE/edit?gid=575597049#gid=575597049', 'Create GTM') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Couples Awaken
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Couples Awaken', 'Done', '6/2/2025', 'Lucy Orton', 'lucy@lucyorton.com', 'https://www.couplesawaken.com/', 'n/a', 'https://docs.google.com/spreadsheets/d/1UVZvMebcAKXCJqa61A67j6Dkb_R_S_K2GcQ83FWszkY/edit?usp=sharing', 'Send 3-Month Content Strategy') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Creating an Integrated Self
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Creating an Integrated Self', 'Done', '8/11/2025', 'Cassie Weeden', 'cassieweedenpsychotherapy@gmail.com', 'https://www.creatinganintegratedself.com/', 'https://business.google.com/n/3148330635755092729/profile?fid=6958998290682526447', 'https://docs.google.com/spreadsheets/d/1yDfdO9nmNR0ojGqx77WfV3Hg2h44KS4KfQB3NnxYGTg/edit?usp=sharing', 'Directories, waiting for GBP reverification') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Creating Change LA
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Creating Change LA', 'Waiting on Client', '12/13/2025', 'Natalie Goldberg', 'natalie@creatingchangela.com', 'https://www.creatingchangela.com/', 'https://business.google.com/n/6269354070611897784/profile?fid=8803460001683738491', 'https://docs.google.com/spreadsheets/d/1r1WTzQ279Z_iP5beHzkDJ42JA3s9DkW-2Zj2PYha1F8/edit?usp=sharing', 'Waiting on Intro Call, Create GTM') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Dr Erica Aten
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Dr Erica Aten', 'Done', '8/28/2025', 'Erica Aten', 'atenerica@gmail.com', 'https://www.drericaaten.com/', 'https://business.google.com/n/6464988035892183720/profile?fid=14154188668904649957', 'https://docs.google.com/spreadsheets/d/1hjI-PjFCRuqteEhtU9ybTkowfztNPOC_EBm_2Ti2cxE/edit?gid=1653538786#gid=1653538786', 'Directories') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- DT Exotics
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('DT Exotics', 'Waiting on Client', '8/1/2025', 'Matt Riccio', 'n/a', 'https://dtexoticslv.com/', 'https://business.google.com/n/12990006475571674050/profile?fid=483336667524271475', 'https://docs.google.com/spreadsheets/d/1RUB5swM1GSawV3BgYHlxf7KdNXxWx03WfrxUUYIsuTs/edit?gid=575597049#gid=575597049', 'Verify GBP') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Waiting on Client', 'Content', 'Execution Phase', 5);

    -- Ebb & Flow Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Ebb & Flow Counseling', 'Done', '5/14/2025', 'Brooke Brandeberry', 'brooke@ebbandflowseattle.com', 'https://ebbandflowseattle.com/', 'https://business.google.com/n/16615396248644985996/profile?fid=12046917634886176529', 'https://docs.google.com/spreadsheets/d/1AL5O1z3p_WG8Cf-CXZSjZr2GGxxyzzPEH_-DA9_NcFs/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Empower U EMDR
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Empower U EMDR', 'Done', '4/14/2025', 'Cristina Deneve', 'cristina@empoweruemdr.com', 'https://empoweruemdr.com/', 'https://business.google.com/n/3075278709924426721/profile?fid=3325321298490112706', 'https://docs.google.com/spreadsheets/d/1VCu5tfQGAtxxFs0errly_AYvAyrN2Wd2ECEzUxzbX1s/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Entrepreneurial Therapist
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Entrepreneurial Therapist', 'Open', '4/26/2025', 'Danielle Swimm', 'danielle@ambitiouspractice.com', 'https://www.theentrepreneurialtherapist.com/', 'n/a', '', 'Wants to focus on the Practice Accelerator program moving forward. Discuss national strategy with Super Intelligent') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Every Heart Dreams
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Every Heart Dreams', 'Done', '3/1/2025', 'Erinn Everhart', 'erinneverhartlmft@everyheartdreams.com', 'https://www.everyheartdreamscounseling.com/', 'https://business.google.com/n/7227455136059229702/profile?fid=13262858248785554017', 'https://docs.google.com/spreadsheets/d/1Z3tkTtjb-ykc73XoNvKh8cJT8uKCOp2YR9GQKpRF2Y8/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Freedom Counseling Group
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Freedom Counseling Group', 'Waiting on Client', '11/11/2025', 'Kevin Anderson', 'k.anderson.wilson@gmail.com', 'https://www.freedomcounseling.group/', 'Multiple', 'https://docs.google.com/spreadsheets/d/1QDO1XMYUN1eEUgpay8eVIZdMBdEVoqL1DWXp4vYRt8Y/edit?gid=575597049#gid=575597049', 'GBP Posts for approval, PR, Directories. Refund the $700 CC fee as they paid with ACH') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Full Tilt Auto Body & Collision
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Full Tilt Auto Body & Collision', 'Done', '2022', 'Matt Ciaschini', 'n/a', 'https://fulltiltautobody.com/', 'https://business.google.com/n/11375734122691361894/profile?fid=17455445014388251345', 'https://docs.google.com/spreadsheets/d/1q0LeZ-SwQE8n-cPNRPvgrJYRPeSZmjZfwOYnK4dtdo0/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Full Vida Therapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Full Vida Therapy', 'Done', '3/20/2025', 'Viviana McGovern', 'info@fullvidatherapy.com', 'https://www.fullvidatherapy.com/', 'https://business.google.com/n/561374313560301433/profile?fid=12899178325111376525', 'https://docs.google.com/spreadsheets/d/1KrS4NPrH5CuSe5eK2oQ5P8y5M_ZQzUTfMm2p3eT7cNo/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Fuzzy Socks Therapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Fuzzy Socks Therapy', 'Done', '11/11/2025', 'Lianna Purjes', 'lianna@fuzzysockstherapy.com', 'https://www.fuzzysockstherapy.com/', 'https://business.google.com/n/15132524899565236887/profile?fid=16022301576098810168', 'https://docs.google.com/spreadsheets/d/14s22g17_JoU-625gxOq3URhMWI5yPBuE_X67OWcIdWI/edit?gid=575597049#gid=575597049', 'PR started, Directories started, GBP Posts for approval') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Gaia Somasca Holistic Psychotherapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Gaia Somasca Holistic Psychotherapy', 'Waiting on Client', '12/9/2025', 'Gaia Somasca', 'gaiasomascalmft@gmail.com', 'https://gaiasomascatherapy.com', 'https://business.google.com/n/3759832922518084000/searchprofile', 'https://docs.google.com/spreadsheets/d/14G1Qg-44orMddlPKVSMS8LWCF8z6jbJvLTco3h2X1HE/edit?usp=drivesdk', 'Awaiting GBP verification when she''s back in CA from Italy, Directories, PR, Technicals for approval') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- GLOW Boudoir Photography Studio
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('GLOW Boudoir Photography Studio', 'Done', '9/22/2025', 'Laura Biron', 'theglowboudoirstudio@gmail.com', 'https://www.theglowboudoir.com/', 'https://business.google.com/n/1422179591988288629/profile?fid=12313250809091292238', 'https://docs.google.com/spreadsheets/d/14JsJZZRk7V06gMxuCZFvBmoAO8Ra1LTyFWylp0bAvqo/edit?gid=575597049#gid=575597049', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Heart & Mind Therapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Heart & Mind Therapy', 'Waiting on Client', '8/29/2025', 'Lydia Zygeta', 'thezigetas@gmail.com', 'https://heartnmind.ca/', 'https://business.google.com/n/10904613226471046135/profile?fid=8906899602498439993', 'https://docs.google.com/spreadsheets/d/1_qA7bv3n24FSMbN_e_WGLva3mruNNMGmSuFgWP8W2s4/edit?gid=575597049#gid=575597049', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Intensive Therapy Retreats
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Intensive Therapy Retreats', 'Open', '2020', 'Bambi Rattner', 'n/a', 'https://www.intensivetherapyretreat.com/', 'Multiple', '', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Jennie Hardman
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Jennie Hardman', 'Waiting on Client', '9/12/2025', 'Jennie Hardman', 'jennie@jenniehardman.com', 'https://www.jenniehardman.com/', 'https://business.google.com/n/18360609231823771144/profile?fid=12478890539438366535', 'https://docs.google.com/spreadsheets/d/1j4csGpYoZHH8ohDhM6IOOi-EsCD9ZVLbekPca2FjThs/edit?usp=sharing', 'Waiting on page approvals') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Jessica Foley
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Jessica Foley', 'Done', '10/26/2025', 'Jessica Foley', 'jfoley@jessicafoley.com', 'https://www.jessicafoley.com/', 'https://business.google.com/n/9819841271271276278/profile?fid=4453906181958717456', 'https://docs.google.com/spreadsheets/d/1c9yhsv3m3baiSDhmS0zBXOtcV1-KBOcP_Go8KYGqDiE/edit?usp=sharing', 'Need to add a new Tiktok and X, need to undo the duplicate Gmail lol, directories started') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Jon Abelack
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Jon Abelack', 'Done', '10/14/2025', 'Jon Abelack', 'jonabelack@gmail.com', 'https://www.jon-abelack-psychotherapist.com/', 'https://business.google.com/n/15417566535971642166/profile?fid=2449530031882132273', 'https://docs.google.com/spreadsheets/d/1HDYbcRokE0PLVIu3H0yNlkMMwlYPpqvH7ZBP35iiv9o/edit?usp=sharing', 'Directories started') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Katrina Kwan
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Katrina Kwan', 'Done', '4/26/2025', 'Katrina Kwan', 'drkwan@drkatrinakwan.com', 'https://www.drkatrinakwan.com/', 'https://business.google.com/n/15755733773321893738/profile?fid=1757638385907198873', 'https://docs.google.com/spreadsheets/d/1IXOpKbWbXXRO-23WGSZKuZzI97r93hayRfUmSbwnIVk/edit?gid=1662698126#gid=1662698126', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Laura Bai
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Laura Bai', 'Waiting on Client', '6/24/2025', 'Laura Bai', 'connect@laurabai.com', 'https://www.laurabai.com/', 'https://business.google.com/n/16544057077254137358/profile?fid=10866538254495149273', 'https://docs.google.com/spreadsheets/d/1X-L8zmBML6mDIMI2ERO--iwTy2zwTy3OYhw5kETnlI0/edit?usp=sharing', 'Local Schema for optimized homepage') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Light Within Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Light Within Counseling', 'Done', '1/24/2025', 'Kelsey Thompson', 'kelsey@lightwithinlmft.org', 'https://lightwithinlmft.org/', 'https://business.google.com/n/14066709570411618917/profile?fid=364755541058977254', 'https://docs.google.com/spreadsheets/d/1fI8rOJrRZIuL6OdAObVhUv9AYTuMuSGFHbZ-lbdD0zw/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Linda Kocieniewski
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Linda Kocieniewski', 'Done', '10/1/2024', 'Linda Kocieniewski', 'lkocieniewski@aol.com', 'https://lindakocieniewski.com/', 'https://business.google.com/n/21250398911131856/profile?fid=6876741135973537597', 'https://docs.google.com/spreadsheets/d/1O2CJogiAD9moHo33yOF4GdcNVyMjeMmhxY5iuOwUiZM/edit?usp=sharing', 'Directories started') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Live Mindfully Psychotherapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Live Mindfully Psychotherapy', 'Done', '4/18/2025', 'Kelsey Fyffe', 'info@livemindfullypsychotherapy.com', 'https://www.livemindfullypsychotherapy.com/', 'https://business.google.com/n/14535344131487793364/profile?fid=11844592869441759944', 'https://docs.google.com/spreadsheets/d/1UX4EdUkH83Sp37_enzRlDb20zwQpwlvCJgLsE4wefGk/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Lucere Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Lucere Counseling', 'Done', '11/4/2025', 'Amanda Bumgarner', 'amanda@lucerecounseling.com', 'https://lucerecounseling.com/', 'https://business.google.com/n/17019363815726739414/profile?fid=15988897929098277259', 'https://docs.google.com/spreadsheets/d/1XS5Squ9fYPOn8fVjP9qMB0YWW8OjY0Cu60zzkOgfhkg/edit?gid=575597049#gid=575597049', 'Directories started') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Mind, Body, Soulmates
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Mind, Body, Soulmates', 'Done', '6/23/2025', 'Isable Smith', 'isable7@mindbodysoulmates.com', 'https://www.mindbodysoulmates.com/', 'https://business.google.com/n/119905369188588037/profile?fid=11290494911642974383', 'https://docs.google.com/spreadsheets/d/1GbkD2d_jCxEWfBZkAVy7o1-Ia5SYU7-IXqpzJa29NTg/edit?gid=0#gid=0', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Mindful Mental Health Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Mindful Mental Health Counseling', 'Done', '8/22/2025', 'Gianna LaLota', 'gianna@nycmindfulmentalhealthcounseling.com', 'https://nycmindfulmentalhealthcounseling.com/', 'https://business.google.com/n/4979057210411507234/profile?fid=10717231218941400515', 'https://docs.google.com/spreadsheets/d/1hCq4qxTlhQb5FC2GWQRq3uQr8kNcWmp9jm61eu-1tTU/edit?usp=sharing', 'Directories started, GBP Posts for Approval') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- NK Psych
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('NK Psych', 'Done', '8/26/2025', 'Emily Newman', 'emily@nkpsych.com', 'https://www.nkpsych.com/', 'https://business.google.com/n/11646037479902340047/searchprofile', 'https://docs.google.com/spreadsheets/d/1L9E9esfkBzYz3aAcKAEVWp-Od1Ixw6vXxfvAgtz6R8s/edit?usp=sharing', 'Directories started, GBP Posts for approval') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Optimize and Thrive Therapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Optimize and Thrive Therapy', 'Doing', '10/16/2025', 'Allison Shotwell', 'alishotwell@gmail.com', 'https://www.optimizeandthrivetherapy.com/', 'https://business.google.com/n/16518942004527479557/profile?fid=12032812702530581218', 'https://docs.google.com/spreadsheets/d/1R3Hhg6iefSqo6xqBxqTuSeEqIaRbH5ATtT4H0xNr0Fg/edit?usp=sharing', 'New location pages ready and optimizing service pages. Waiting for website access') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Pittsburgh Center for Integrative Therapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Pittsburgh Center for Integrative Therapy', 'Done', '8/1/2024', 'Lauren Hogsett Steele', 'laurenhsteele@pittsburghcit.com', 'https://www.pittsburghcit.com/', 'https://business.google.com/n/17253683510351795955/profile?fid=15701550178557903521', 'https://docs.google.com/spreadsheets/d/1tBSspNeoPn-yLGTV0DhB97iKiUztQe5ofX9WNMV6PJw/edit?usp=sharing', 'Directories started') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Resilience Counselling and Consulting
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Resilience Counselling and Consulting', 'Done', '4/29/2025', 'Vivienne Livingstone', 'viviennelivingstone@gmail.com', 'https://www.resilience-now.com/', 'https://business.google.com/n/16512899846944992341/profile?fid=11455338547136989881', 'https://docs.google.com/spreadsheets/d/1UJ_CHSfHU7hs3R6JdE3YD6BGTU8N0SEgqj9MBeAe1R4/edit?gid=575597049#gid=575597049', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Restorative Counseling Center
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Restorative Counseling Center', 'Done', '11/6/2025', 'Robyn Sheiniuk', 'restorativecounselingcenter@gmail.com', 'https://www.restorativecounselingcenter.org/', '', 'https://docs.google.com/spreadsheets/d/1FRpT6Cupep5GcCoO-iNee04qiH7lsadc2K65btBWGm0/edit?gid=575597049#gid=575597049', 'PR started, Directories started. Create GTM once squarespace is fine!!!') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Revive Intimacy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Revive Intimacy', 'Done', '2/27/2025', 'Utkala Maringanti', 'utkalac@gmail.com', 'https://reviveintimacy.com/', 'https://business.google.com/n/12396340302269290237/profile?fid=8851532473878314474', 'https://docs.google.com/spreadsheets/d/1AL-n7Z9Jo1ylWlfY3swzYdVENd7f6l2Nojfzv1_aWn8/edit?gid=575597049#gid=575597049', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Robyn Sevigny, LMFT
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Robyn Sevigny, LMFT', 'Done', '7/22/2025', 'Robyn Sevigny', 'robyn.mft@gmail.com', 'https://www.robynsevigny.com/', 'https://business.google.com/n/8795558797113923135/profile?fid=16878475790203610415', 'https://docs.google.com/spreadsheets/d/1u2ICLV-Q5R3s_fLU0TKxJKIcip0xmbRq_xtfE3kkoh8/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Ruberti Counseling Services
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Ruberti Counseling Services', 'Done', '8/15/2025', 'Christine Ruberti-Bruning', 'info@ruberticounseling.com', 'https://www.ruberticounseling.com/', 'https://business.google.com/n/7899287090035477020/profile?fid=13197261101030271847', 'https://docs.google.com/spreadsheets/d/1SVI3bJzGCcwSArJuj75sYYqFd5nfRhvdaBhqRMoHdVk/edit?usp=sharing', 'Directories started') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Schuster Counseling Group
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Schuster Counseling Group', 'Waiting on Client', '11/17/2025', 'Melinda Schuster', 'hello@schustercounseling.com', 'https://www.schustercounseling.com/', 'Multiple', 'https://docs.google.com/spreadsheets/d/1T7yehvG_sRnGzvj4_0MOmK_IprTO3nvtRFg7Hs5_-ZI/edit?gid=575597049#gid=575597049', 'PR, Directories, GBP Posts for approval') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Sit With Shabs
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Sit With Shabs', 'Waiting on Client', '7/16/2025', 'Shabnam Lee', 'shabnam@sitwithshabs.com', 'https://www.sitwithshabs.com/', 'n/a', 'https://docs.google.com/spreadsheets/d/1i8x8WsyYzfmFUE8pM7l4Gf72RsVrmMcB6FqMx0OeLns/edit?usp=sharing', 'PR, Directories, New Pages ready, Update a couple of things') RETURNING id INTO p_id;


    -- Spirals & Heartspace
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Spirals & Heartspace', 'Done', '11/7/2025', 'Ande Welling', 'ande@spiralsheartspace.com', 'https://spiralsandheartspacehealing.com/', '', 'https://docs.google.com/spreadsheets/d/1AFaeL2aWW9JSLwI-_eYnNpxghOHpvToLLyo1Sy7iSpU/edit?usp=sharing', 'Directories started') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Think Happy Live Healthy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Think Happy Live Healthy', 'Done', '7/8/2025', 'Christine Willing', 'christine@thinkhappylivehealthy.com', 'https://www.thinkhappylivehealthy.com/', 'Multiple', 'https://docs.google.com/spreadsheets/d/1A5sqDg8UqbZYCQB0fUJFgimUrxNoZbSFYMOsmjYHvgs/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Thriving CA
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Thriving CA', 'Done', '2/25/2025', 'Maya Weir', 'drmayaweir@gmail.com', 'https://www.thrivingca.com/', 'https://business.google.com/n/17407961708045175454/profile?fid=10811358618925640150', 'https://docs.google.com/spreadsheets/d/1q-h01KIOMGFKnxSiQ3GzMzwZnrpS3xvV6iajpkFuwqY/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Tides Mental Health
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Tides Mental Health', 'Done', '6/17/2025', 'Rutul Shah', 'rshah@tidesmentalhealth.com', 'https://tidesmentalhealth.com/', 'https://business.google.com/n/1799869852864952650/profile?fid=6217498973041783957', 'https://docs.google.com/spreadsheets/d/1haV-wxhiR8QaUCsgCdlFtOlAkPGw5EfdHL8_k-pso2g/edit?usp=sharing', '') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Traveling Therapist
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Traveling Therapist', 'Doing', '5/1/2024', 'Kym Tolson', 'info@kymtolson.com', 'https://thetravelingtherapist.com/', 'n/a', '', 'Send new National Strategy') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- White Orchid Psychiatry PLLC
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('White Orchid Psychiatry PLLC', 'Done', '11/5/2025', 'Austin Casey', 'caustincaseymd@gmail.com', 'https://www.whiteorchidpsychiatry.com/', 'https://business.google.com/n/8615843722564426428/profile?fid=7523191200259885043', 'https://docs.google.com/spreadsheets/d/1S_Ja8JPuLHFQ6nJxpmc2WKHhU-jQ8Ciqejxueglq7C8/edit?gid=575597049#gid=575597049', 'Directories started') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Open', 'Content', 'Execution Phase', 5);

    -- Wilde Counseling
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Wilde Counseling', 'Doing', '9/16/2025', 'Kristen Albritton', 'kristen@wildecounseling.com', 'https://www.wildecounseling.com/', 'https://business.google.com/n/18146677859358830861/profile?fid=11032249857211842184', 'https://docs.google.com/spreadsheets/d/1_YXsNOm3uvLPUlPG5H838KHKdFDYIFMlEkliAuk4kDs/edit?gid=575597049#gid=575597049', 'Build out FAQ silo for Addiction Therapy and EMDR Therapy. DKIM record.') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'Rising Tide Integration', 'Doing', 'Content', 'Execution Phase', 5);

    -- Annia Raja PhD Therapy
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Annia Raja PhD Therapy', 'Doing', '1/3/2026', 'Annia Raja', 'annia.raja@gmail.com', 'http://anniarajaphdtherapy.com/', 'https://business.google.com/n/1531786713918516125/profile?hl=en&fid=5460831009472587305', 'https://docs.google.com/spreadsheets/d/1ZEP1Ya416tST4YZ6ROq5lMuFDjtw7baGBz6zKnIKd-U/edit?usp=sharing', 'Waiting for Intro Call') RETURNING id INTO p_id;

    INSERT INTO workflow_tasks (practice_id, name, status, category, stage, display_order) VALUES (p_id, 'System Access & Permissions', 'Done', 'Access', 'Pre-Kickoff', 1);

    -- Vivid Psychology Group
    INSERT INTO practices (name, status, start_date, contact_name, email, website, gbp_link, campaign_link, notes) VALUES ('Vivid Psychology Group', 'Waiting on Client', '', 'Alex Littleton', 'alex.littleton@vividpsychologygroup.com', 'https://vividpsychologygroup.com/', '', 'https://docs.google.com/spreadsheets/d/1haV-wxhiR8QaUCsgCdlFtOlAkPGw5EfdHL8_k-pso2g/edit?usp=sharing', 'Waiting for Intro Call') RETURNING id INTO p_id;


END $$;
