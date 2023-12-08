CREATE TABLE "public"."topics_users_likes_association" ("topics_pk" uuid NOT NULL, "users_pk" text NOT NULL, PRIMARY KEY ("topics_pk","users_pk") , FOREIGN KEY ("topics_pk") REFERENCES "public"."topics"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("users_pk") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."topics_users_likes_association" IS E'Relationship about which users have liked which topics';
