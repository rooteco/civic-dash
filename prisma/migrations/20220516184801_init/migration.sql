-- CreateTable
CREATE TABLE "Theme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Indicator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "favourite" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "indicatorId" INTEGER NOT NULL,
    "layout" TEXT NOT NULL DEFAULT 'SINGLE',
    CONSTRAINT "Config_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PredictionMarket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "marketVolume" INTEGER NOT NULL DEFAULT 0,
    "author" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "favourite" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "ThemesToPredictionMarkets" (
    "themeId" INTEGER NOT NULL,
    "predictionMarketId" INTEGER NOT NULL,

    PRIMARY KEY ("themeId", "predictionMarketId"),
    CONSTRAINT "ThemesToPredictionMarkets_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ThemesToPredictionMarkets_predictionMarketId_fkey" FOREIGN KEY ("predictionMarketId") REFERENCES "PredictionMarket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProblemsToPredictionMarkets" (
    "problemId" INTEGER NOT NULL,
    "predictionMarketId" INTEGER NOT NULL,

    PRIMARY KEY ("problemId", "predictionMarketId"),
    CONSTRAINT "ProblemsToPredictionMarkets_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProblemsToPredictionMarkets_predictionMarketId_fkey" FOREIGN KEY ("predictionMarketId") REFERENCES "PredictionMarket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IndicatorsToPredictionMarkets" (
    "indicatorId" INTEGER NOT NULL,
    "predictionMarketId" INTEGER NOT NULL,

    PRIMARY KEY ("indicatorId", "predictionMarketId"),
    CONSTRAINT "IndicatorsToPredictionMarkets_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IndicatorsToPredictionMarkets_predictionMarketId_fkey" FOREIGN KEY ("predictionMarketId") REFERENCES "PredictionMarket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SupportingIndicatorsOnConfigs" (
    "indicatorId" INTEGER NOT NULL,
    "configId" INTEGER NOT NULL,

    PRIMARY KEY ("indicatorId", "configId"),
    CONSTRAINT "SupportingIndicatorsOnConfigs_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SupportingIndicatorsOnConfigs_configId_fkey" FOREIGN KEY ("configId") REFERENCES "Config" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProblemsOnThemes" (
    "themeId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,

    PRIMARY KEY ("themeId", "problemId"),
    CONSTRAINT "ProblemsOnThemes_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProblemsOnThemes_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IndicatorsOnThemes" (
    "themeId" INTEGER NOT NULL,
    "indicatorId" INTEGER NOT NULL,

    PRIMARY KEY ("themeId", "indicatorId"),
    CONSTRAINT "IndicatorsOnThemes_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IndicatorsOnThemes_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IndicatorsOnProblems" (
    "problemId" INTEGER NOT NULL,
    "indicatorId" INTEGER NOT NULL,

    PRIMARY KEY ("problemId", "indicatorId"),
    CONSTRAINT "IndicatorsOnProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IndicatorsOnProblems_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Theme_slug_key" ON "Theme"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Indicator_slug_key" ON "Indicator"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Config_indicatorId_key" ON "Config"("indicatorId");

-- CreateIndex
CREATE UNIQUE INDEX "PredictionMarket_slug_key" ON "PredictionMarket"("slug");
