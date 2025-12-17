import { Migration } from '@mikro-orm/migrations';

export class Migration20251215150940 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "notification";`);
    this.addSql(
      `create table "notification"."device_token" ("id" varchar(255) not null default gen_random_uuid(), "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "user_id" varchar(255) not null, "token" varchar(255) not null, "platform" varchar(255) null, "device_id" varchar(255) null, "is_active" boolean not null default true, constraint "device_token_pkey" primary key ("id"));`,
    );
    this.addSql(
      `create index "device_token_user_id_is_active_index" on "notification"."device_token" ("user_id", "is_active");`,
    );
    this.addSql(
      `alter table "notification"."device_token" add constraint "device_token_token_unique" unique ("token");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "notification"."device_token" drop constraint if exists "device_token_token_unique";`,
    );
    this.addSql(
      `drop index if exists "notification"."device_token_user_id_is_active_index";`,
    );
    this.addSql(`drop table if exists "notification"."device_token";`);
  }
}
