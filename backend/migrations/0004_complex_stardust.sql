ALTER TABLE "clubs" DROP CONSTRAINT "clubs_auth_club_id_unique";--> statement-breakpoint
DROP INDEX "clubs_auth_club_id_idx";--> statement-breakpoint
CREATE INDEX "clubs_auth_club_id_idx" ON "clubs" USING btree ("auth_club_id");