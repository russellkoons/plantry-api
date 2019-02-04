CREATE TYPE times AS ENUM ('Breakfast', 'Lunch', 'Dinner');


CREATE TABLE "meals" (
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"meal" varchar(255) NOT NULL,
	"notes" text,
	"time" times,
	"created_at" DATE NOT NULL,
	"updated_at" DATE NOT NULL,
	CONSTRAINT meals_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" DATE NOT NULL,
	"updated_at" DATE NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ingredients" (
	"id" serial NOT NULL,
	"meal_id" serial NOT NULL,
	"ingredient" serial NOT NULL,
	"created_at" DATE NOT NULL,
	"updated_at" DATE NOT NULL,
	CONSTRAINT ingredients_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"date" serial NOT NULL,
	"user_id" serial NOT NULL,
	"created_at" DATE NOT NULL,
	"updated_at" DATE NOT NULL,
	CONSTRAINT plans_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "meals" ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_fk0" FOREIGN KEY ("meal_id") REFERENCES "meals"("id");

ALTER TABLE "plans" ADD CONSTRAINT "plans_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");