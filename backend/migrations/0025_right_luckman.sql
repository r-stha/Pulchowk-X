CREATE TABLE "notice" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"content" text NOT NULL,
	"section" varchar(50) NOT NULL,
	"subsection" varchar(50) NOT NULL,
	"attachment_url" text,
	"attachment_type" varchar(20),
	"attachment_name" varchar(255),
	"author_id" text NOT NULL,
	"is_new" boolean DEFAULT true NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "buyer_deleted" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "seller_deleted" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "is_read" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "notice" ADD CONSTRAINT "notice_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;