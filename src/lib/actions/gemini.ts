'use server';

import { generateJSONInsight } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function analyzePracticePerformance(practiceId: string) {
  // 1. Fetch holistic practice data
  const [
    { data: practice },
    { data: onboarding },
    { data: tasks },
    { data: checklists },
    { data: prs }
  ] = await Promise.all([
    supabase.from('practices').select('*').eq('id', practiceId).single(),
    supabase.from('onboarding_state').select('*').eq('practice_id', practiceId).single(),
    supabase.from('workflow_tasks').select('*').eq('practice_id', practiceId),
    supabase.from('optimization_checklists').select('*').eq('practice_id', practiceId),
    supabase.from('press_releases').select('*').eq('practice_id', practiceId)
  ]);

  // 2. Prepare holistic prompt for Gemini
  const campaignData = {
    practice,
    onboarding,
    tasks,
    checklists,
    prs
  };

  const prompt = `
    Analyze the full SEO campaign status for practice "${practice?.name}".
    
    CAMPAIGN CONTEXT:
    ${JSON.stringify(campaignData, null, 2)}
    
    Based on the Moonraker CORE system (Credibility, Optimization, Reputation, Engagement), 
    identify the top 3 most urgent tasks to improve visibility.
    Provide a priority score (1-100) and a brief summary of the campaign status.
    
    Respond in JSON format:
    {
      "summary": "...",
      "priority_score": 85,
      "urgent_tasks": [
        { "task": "...", "reason": "...", "impact": "High" }
      ]
    }
  `;

  // 3. Generate insight via Gemini
  const insight = await generateJSONInsight(prompt);

  // 4. Store insight in DB
  const { error } = await supabase
    .from('gemini_insights')
    .upsert({
      practice_id: practiceId,
      summary: insight.summary,
      priority_score: insight.priority_score,
      urgent_tasks: insight.urgent_tasks,
      last_analyzed: new Date().toISOString()
    }, { onConflict: 'practice_id' });

  if (error) throw error;

  return insight;
}

export async function generateContentStrategy(practiceId: string, services: string[]) {
  const prompt = `
    Generate a 3-month GBP content and PR syndication strategy for a health/wellness practice.
    Core services: ${services.join(', ')}.
    
    Focus on local SEO and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).
    Provide 3 PR headlines and 5 GBP post ideas.
    
    Respond in JSON format:
    {
      "pr_headlines": ["...", "...", "..."],
      "gbp_posts": [
        { "headline": "...", "topic": "...", "cta": "..." }
      ]
    }
  `;

  return await generateJSONInsight(prompt);
}
