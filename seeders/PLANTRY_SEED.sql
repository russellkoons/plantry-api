CREATE TYPE days AS ENUM ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');


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



CREATE TABLE "mealsplans" (
	"id" serial NOT NULL,
	"meal_id" serial NOT NULL,
	"plan_id" serial NOT NULL,
	"day" days,
	"time" times,
	"created_at" DATE NOT NULL,
	"updated_at" DATE NOT NULL,
	CONSTRAINT mealsplans_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "mealstimes" (
	"id" serial NOT NULL,
	"meal_id" serial NOT NULL,
	"time" times,
	"created_at" DATE NOT NULL,
	"updated_at" DATE NOT NULL,
	CONSTRAINT mealstimes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "meals" ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_fk0" FOREIGN KEY ("meal_id") REFERENCES "meals"("id");



ALTER TABLE "plans" ADD CONSTRAINT "plans_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "mealsplans" ADD CONSTRAINT "mealsplans_fk0" FOREIGN KEY ("meal_id") REFERENCES "meals"("id");
ALTER TABLE "mealsplans" ADD CONSTRAINT "mealsplans_fk1" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");

ALTER TABLE "mealstimes" ADD CONSTRAINT "mealstimes_fk0" FOREIGN KEY ("meal_id") REFERENCES "meals"("id");

