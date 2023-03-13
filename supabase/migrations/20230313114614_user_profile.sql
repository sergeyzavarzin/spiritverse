drop trigger if exists "on_auth_user_created" on "public"."tasks";

alter table "public"."tokens" drop constraint "tokens_user_id_fkey";

drop function if exists "public"."fight_battle"(uid uuid, character_id uuid, win numeric);

drop function if exists "public"."handle_new_task"();

drop function if exists "public"."handle_new_user"();

drop function if exists "public"."reduce_character_energy"(character_id uuid);

alter table "public"."tokens" drop constraint "balances_pkey";

drop index if exists "public"."balances_pkey";

drop table "public"."tokens";

create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "user_id" uuid
);


CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.deprecated_handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.crystals (user_id, value)
  values (new.id, 0);
  update public.characters set user_id = new.id where id in (select id from public.characters where user_id is null limit 1);
  insert into public.users_tasks (user_id, task_id)
  SELECT new.id, t.id FROM (SELECT * FROM public.tasks WHERE active is true) t;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_profile_created()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  insert into public.users_tasks (user_id, task_id)
    select new.id, t.id from (select * from public.tasks where active is true) t;
end;$function$
;

CREATE OR REPLACE FUNCTION public.handle_task_created()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users_tasks (user_id, task_id, value, done) select id, new.id, 0, false from public.profiles;
  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.handle_user_created()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  -- Create profile
  insert into public.profiles (user_id)
  values (new.id);
  -- Create crystals balance
  insert into public.crystals (user_id, value)
  values (new.id, 0);
  return new;
end;
$function$
;

CREATE TRIGGER on_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_user_created();

CREATE TRIGGER on_task_created AFTER INSERT ON public.tasks FOR EACH ROW EXECUTE FUNCTION handle_task_created();

CREATE TRIGGER on_profile_created AFTER INSERT ON public.profiles FOR EACH STATEMENT EXECUTE FUNCTION handle_profile_created();
