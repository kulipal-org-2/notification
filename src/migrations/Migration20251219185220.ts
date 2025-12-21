import { Migration } from '@mikro-orm/migrations';

export class Migration20251219185220 extends Migration {
  override async up(): Promise<void> {
    // Drop the unique constraint on token alone (allows multiple users with same token)
    this.addSql(`
      DO $$ 
      BEGIN
        IF EXISTS (
          SELECT 1 
          FROM information_schema.table_constraints 
          WHERE constraint_schema = 'notification' 
          AND table_name = 'device_token' 
          AND constraint_name = 'device_token_token_unique'
        ) THEN
          ALTER TABLE "notification"."device_token" DROP CONSTRAINT "device_token_token_unique";
        END IF;
      END $$;
    `);

    // Add unique constraint on (userId, token) to prevent duplicate registrations for same user
    this.addSql(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 
          FROM information_schema.table_constraints 
          WHERE constraint_schema = 'notification' 
          AND table_name = 'device_token' 
          AND constraint_name = 'device_token_user_id_token_unique'
        ) THEN
          ALTER TABLE "notification"."device_token" ADD CONSTRAINT "device_token_user_id_token_unique" UNIQUE ("user_id", "token");
        END IF;
      END $$;
    `);

    // Drop device_id column from device_token table
    this.addSql(`
      DO $$ 
      BEGIN
        IF EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_schema = 'notification' 
          AND table_name = 'device_token' 
          AND column_name = 'device_id'
        ) THEN
          ALTER TABLE "notification"."device_token" DROP COLUMN "device_id";
        END IF;
      END $$;
    `);
  }

  override async down(): Promise<void> {
    // Add device_id column back if it doesn't exist
    this.addSql(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_schema = 'notification' 
          AND table_name = 'device_token' 
          AND column_name = 'device_id'
        ) THEN
          ALTER TABLE "notification"."device_token" ADD COLUMN "device_id" varchar(255) NULL;
        END IF;
      END $$;
    `);

    // Drop the unique constraint on (userId, token)
    this.addSql(`
      DO $$ 
      BEGIN
        IF EXISTS (
          SELECT 1 
          FROM information_schema.table_constraints 
          WHERE constraint_schema = 'notification' 
          AND table_name = 'device_token' 
          AND constraint_name = 'device_token_user_id_token_unique'
        ) THEN
          ALTER TABLE "notification"."device_token" DROP CONSTRAINT "device_token_user_id_token_unique";
        END IF;
      END $$;
    `);

    // Restore unique constraint on token alone
    this.addSql(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 
          FROM information_schema.table_constraints 
          WHERE constraint_schema = 'notification' 
          AND table_name = 'device_token' 
          AND constraint_name = 'device_token_token_unique'
        ) THEN
          ALTER TABLE "notification"."device_token" ADD CONSTRAINT "device_token_token_unique" UNIQUE ("token");
        END IF;
      END $$;
    `);
  }
}
