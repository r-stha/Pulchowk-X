DROP INDEX "clubs_email_idx";--> statement-breakpoint
CREATE INDEX "clubs_email_idx" ON "clubs" USING btree ("email");