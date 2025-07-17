-- Create table for placement opportunities extracted from emails
CREATE TABLE public.placement_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  min_cgpa DECIMAL(3,2),
  location TEXT,
  salary_range TEXT,
  deadline DATE,
  requirements TEXT[],
  email_subject TEXT,
  email_date TIMESTAMP WITH TIME ZONE,
  email_snippet TEXT,
  extracted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source_email TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Create table for email analysis logs
CREATE TABLE public.email_analysis_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_id TEXT NOT NULL,
  analysis_status TEXT CHECK (analysis_status IN ('pending', 'processed', 'failed')) DEFAULT 'pending',
  extracted_data JSONB,
  error_message TEXT,
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.placement_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_analysis_logs ENABLE ROW LEVEL SECURITY;

-- Create policies (public read access for placement opportunities)
CREATE POLICY "Anyone can view placement opportunities" 
ON public.placement_opportunities 
FOR SELECT 
USING (true);

-- Admin only policies for email logs (you can modify this based on your needs)
CREATE POLICY "Service role can manage email logs" 
ON public.email_analysis_logs 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create indexes for better performance
CREATE INDEX idx_placement_opportunities_company ON public.placement_opportunities(company_name);
CREATE INDEX idx_placement_opportunities_deadline ON public.placement_opportunities(deadline);
CREATE INDEX idx_placement_opportunities_cgpa ON public.placement_opportunities(min_cgpa);
CREATE INDEX idx_email_analysis_logs_status ON public.email_analysis_logs(analysis_status);