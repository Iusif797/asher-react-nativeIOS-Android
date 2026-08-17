do $$
declare r record;
begin
  for r in
    select tc.table_schema, tc.table_name, tc.constraint_name, kcu.column_name
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
    join information_schema.constraint_column_usage ccu
      on tc.constraint_name = ccu.constraint_name and tc.table_schema = ccu.table_schema
    where tc.constraint_type = 'FOREIGN KEY'
      and ccu.table_schema = 'public' and ccu.table_name = 'profiles' and ccu.column_name = 'id'
  loop
    execute format('alter table %I.%I drop constraint %I', r.table_schema, r.table_name, r.constraint_name);
    if r.table_name = 'specialists' then
      execute format(
        'alter table %I.%I add constraint %I foreign key (%I) references public.profiles(id) on delete set null',
        r.table_schema, r.table_name, r.constraint_name, r.column_name
      );
    else
      execute format(
        'alter table %I.%I add constraint %I foreign key (%I) references public.profiles(id) on delete cascade',
        r.table_schema, r.table_name, r.constraint_name, r.column_name
      );
    end if;
  end loop;
end $$;

create or replace function public.delete_my_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
