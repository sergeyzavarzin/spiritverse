drop function if exists "public"."deprecated_handle_new_user"();

drop view if exists "public"."random_characters";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_user_created()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  -- Create crystals balance
  insert into public.crystals (user_id, value) values (new.id, 0);
  -- Create profile
  insert into public.accounts (id) values (new.id);
  -- Add task tracking records
  insert into public.users_tasks (user_id, task_id) select new.id, t.id from (select * from public.tasks where active is true) t;
  return new;
end;
$function$
;


