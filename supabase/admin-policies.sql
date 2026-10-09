-- Run in Supabase Dashboard → SQL Editor
-- Grants the admin operations needed by the dashboard

-- Inquiries: allow admin to read all
create policy "Admin read inquiries"
  on inquiries for select
  using (true);

-- Designers: allow insert, update, delete (auth handled by Next.js middleware)
create policy "Admin insert designers"
  on designers for insert
  with check (true);

create policy "Admin update designers"
  on designers for update
  using (true);

create policy "Admin delete designers"
  on designers for delete
  using (true);
