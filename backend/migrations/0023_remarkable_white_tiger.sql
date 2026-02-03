CREATE TYPE "event_status_new" AS ENUM ('draft', 'cancelled');
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "status" DROP DEFAULT;
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "status" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "events"
  ALTER COLUMN "status" TYPE "event_status_new"
  USING (
    CASE
      WHEN "status" IN ('draft', 'cancelled') THEN "status"::text::"event_status_new"
      ELSE NULL
    END
  );
--> statement-breakpoint
DROP TYPE "event_status";
--> statement-breakpoint
ALTER TYPE "event_status_new" RENAME TO "event_status";
