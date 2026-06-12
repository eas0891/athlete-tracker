-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'PRE_WORKOUT', 'POST_WORKOUT');

-- CreateTable
CREATE TABLE "Athlete" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weightLbs" DOUBLE PRECISION,
    "heightIn" DOUBLE PRECISION,
    "inseamIn" DOUBLE PRECISION,
    "wingspanIn" DOUBLE PRECISION,
    "handSpanIn" DOUBLE PRECISION,
    "handLengthIn" DOUBLE PRECISION,
    "forearmLengthIn" DOUBLE PRECISION,
    "shoeSize" DOUBLE PRECISION,
    "pubertyStage" INTEGER,
    "notes" TEXT,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepLog" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bedtime" TIMESTAMP(3) NOT NULL,
    "wakeTime" TIMESTAMP(3) NOT NULL,
    "qualityRating" INTEGER,
    "notes" TEXT,
    "noScreens90Min" BOOLEAN NOT NULL DEFAULT false,
    "noMealsBeforeBed" BOOLEAN NOT NULL DEFAULT false,
    "asleepBy10pm" BOOLEAN NOT NULL DEFAULT false,
    "magnesiumTaken" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SleepLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrainingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingLog" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "trainingTypeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activity" TEXT,
    "durationMins" INTEGER,
    "intensity" INTEGER,
    "notes" TEXT,

    CONSTRAINT "TrainingLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsdaFood" (
    "id" TEXT NOT NULL,
    "fdcId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "brand" TEXT,
    "calories" DOUBLE PRECISION,
    "proteinG" DOUBLE PRECISION,
    "carbsG" DOUBLE PRECISION,
    "fatG" DOUBLE PRECISION,
    "fiberG" DOUBLE PRECISION,
    "sugarG" DOUBLE PRECISION,
    "vitaminDMcg" DOUBLE PRECISION,
    "zincMg" DOUBLE PRECISION,
    "magnesiumMg" DOUBLE PRECISION,
    "vitaminK2Mcg" DOUBLE PRECISION,
    "b1Mg" DOUBLE PRECISION,
    "b2Mg" DOUBLE PRECISION,
    "b3Mg" DOUBLE PRECISION,
    "b6Mg" DOUBLE PRECISION,
    "b12Mcg" DOUBLE PRECISION,
    "folateMcg" DOUBLE PRECISION,
    "omega3Mg" DOUBLE PRECISION,
    "epaMg" DOUBLE PRECISION,
    "dhaMg" DOUBLE PRECISION,
    "alaMg" DOUBLE PRECISION,
    "calciumMg" DOUBLE PRECISION,
    "collagenMg" DOUBLE PRECISION,
    "ironMg" DOUBLE PRECISION,

    CONSTRAINT "UsdaFood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "notes" TEXT,
    "servingSize" TEXT,
    "calories" DOUBLE PRECISION,
    "proteinG" DOUBLE PRECISION,
    "carbsG" DOUBLE PRECISION,
    "fatG" DOUBLE PRECISION,
    "fiberG" DOUBLE PRECISION,
    "sugarG" DOUBLE PRECISION,
    "vitaminDMcg" DOUBLE PRECISION,
    "zincMg" DOUBLE PRECISION,
    "magnesiumMg" DOUBLE PRECISION,
    "vitaminK2Mcg" DOUBLE PRECISION,
    "b1Mg" DOUBLE PRECISION,
    "b2Mg" DOUBLE PRECISION,
    "b3Mg" DOUBLE PRECISION,
    "b6Mg" DOUBLE PRECISION,
    "b12Mcg" DOUBLE PRECISION,
    "folateMcg" DOUBLE PRECISION,
    "omega3Mg" DOUBLE PRECISION,
    "epaMg" DOUBLE PRECISION,
    "dhaMg" DOUBLE PRECISION,
    "alaMg" DOUBLE PRECISION,
    "calciumMg" DOUBLE PRECISION,
    "collagenMg" DOUBLE PRECISION,
    "ironMg" DOUBLE PRECISION,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "servings" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "usdaFoodId" TEXT,
    "brandId" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionLog" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "waterOz" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "NutritionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionLogItem" (
    "id" TEXT NOT NULL,
    "nutritionLogId" TEXT NOT NULL,
    "mealType" "MealType" NOT NULL,
    "timeEaten" TIMESTAMP(3),
    "usdaFoodId" TEXT,
    "brandId" TEXT,
    "recipeId" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "isAntiInflammatory" BOOLEAN NOT NULL DEFAULT false,
    "isProbiotic" BOOLEAN NOT NULL DEFAULT false,
    "probioticStrain" TEXT,

    CONSTRAINT "NutritionLogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplementLog" (
    "id" TEXT NOT NULL,
    "nutritionLogId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT,
    "timing" TEXT,
    "notes" TEXT,

    CONSTRAINT "SupplementLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrainingType_name_key" ON "TrainingType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UsdaFood_fdcId_key" ON "UsdaFood"("fdcId");

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepLog" ADD CONSTRAINT "SleepLog_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingLog" ADD CONSTRAINT "TrainingLog_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingLog" ADD CONSTRAINT "TrainingLog_trainingTypeId_fkey" FOREIGN KEY ("trainingTypeId") REFERENCES "TrainingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_usdaFoodId_fkey" FOREIGN KEY ("usdaFoodId") REFERENCES "UsdaFood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionLog" ADD CONSTRAINT "NutritionLog_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionLogItem" ADD CONSTRAINT "NutritionLogItem_nutritionLogId_fkey" FOREIGN KEY ("nutritionLogId") REFERENCES "NutritionLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionLogItem" ADD CONSTRAINT "NutritionLogItem_usdaFoodId_fkey" FOREIGN KEY ("usdaFoodId") REFERENCES "UsdaFood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionLogItem" ADD CONSTRAINT "NutritionLogItem_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionLogItem" ADD CONSTRAINT "NutritionLogItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementLog" ADD CONSTRAINT "SupplementLog_nutritionLogId_fkey" FOREIGN KEY ("nutritionLogId") REFERENCES "NutritionLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
