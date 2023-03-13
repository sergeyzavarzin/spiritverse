set check_function_bodies = off;

CREATE OR REPLACE FUNCTION auth.test()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  -- Create crystals balance
  -- insert into crystals (user_id, value) values (new.id, 0);
  -- Create profile
  --insert into profiles (user_id) values (new.id);
  return new;
end;
$function$
;


drop trigger if exists "on_profile_created" on "public"."profiles";

alter table "public"."profiles" drop constraint "profiles_user_id_fkey";

alter table "public"."profiles" drop constraint "profiles_pkey";

drop index if exists "public"."profiles_pkey";

drop table "public"."profiles";

create table "public"."accounts" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now()
);


CREATE UNIQUE INDEX accounts_pkey ON public.accounts USING btree (id);

alter table "public"."accounts" add constraint "accounts_pkey" PRIMARY KEY using index "accounts_pkey";

alter table "public"."accounts" add constraint "accounts_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."accounts" validate constraint "accounts_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.deprecated_handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.crystals (user_id, value) values (new.id, 0);
  --update public.characters set user_id = new.id where id in (select id from public.characters where user_id is null limit 1);
  --insert into public.users_tasks (user_id, task_id) SELECT new.id, t.id FROM (SELECT * FROM public.tasks WHERE active is true) t;
  return new;
end;
$function$
;

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
  return new;
end;
$function$
;


