-- Enable realtime for message_analysis table
ALTER TABLE public.message_analysis REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_analysis;

-- Enable realtime for safety_tips table
ALTER TABLE public.safety_tips REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.safety_tips;

-- Add RLS policies for safety_tips management (admin only)
CREATE POLICY "Admins can insert safety tips"
ON public.safety_tips
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update safety tips"
ON public.safety_tips
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete safety tips"
ON public.safety_tips
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);