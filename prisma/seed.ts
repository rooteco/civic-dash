import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getThemes().map((theme) => {
      return db.theme.create({ data: theme });
    })
  );

  await Promise.all(
    getProblems().map((problem) => {
      return db.problem.create({ data: problem });
    })
    );

  await Promise.all(
    getIndicators().map((indicator) => {
      return db.indicator.create({ data: indicator });
    })
    );

    await Promise.all(
      getConfigs().map((config) => {
        return db.config.create({ data: config });
      })
      );

  await Promise.all(
    getProblemsOnThemes().map((problemThemeMap) => {
      return db.problemsOnThemes.create({ data: problemThemeMap });
    })
    );

  await Promise.all(
    getIndicatorsOnThemes().map((indicatorThemeMap) => {
      return db.indicatorsOnThemes.create({ data: indicatorThemeMap });
    })
  );

  await Promise.all(
    getIndicatorsOnProblems().map((indicatorProblemMap) => {
      return db.indicatorsOnProblems.create({ data: indicatorProblemMap });
    })
  );

  // TODO: Fix Type issue here
  await Promise.all(
    getPredictionMarkets().map((predictionMarket) => {
      return db.predictionMarket.create({ data: predictionMarket });
    })
  );

  await Promise.all(
    getThemesToPredictionMarkets().map((themePredictionMarketMap) => {
      return db.themesToPredictionMarkets.create({ data: themePredictionMarketMap});
    })
  );

  await Promise.all(
    getProblemsToPredictionMarkets().map((problemPredictionMarketMap) => {
      return db.problemsToPredictionMarkets.create({ data: problemPredictionMarketMap});
    })
  );

  await Promise.all(
    getIndicatorsToPredictionMarkets().map((indicatorPredictionMarketMap) => {
      return db.indicatorsToPredictionMarkets.create({ data: indicatorPredictionMarketMap});
    })
  );
}
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
;

function getThemes() {
  return [
    {
      id: 1,
      name: "Abundant Housing",
      description: "",
      slug: "abundant-housing"
    },
    {
      id: 2,
      name: "Quality Education",
      description: "",
      slug: "quality-education",
    },
    {
      id: 3,
      name: "Public Safety",
      description: "",
      slug: "public-safety"
    }
  ];
}

function getProblems(){
  return [
    {
      id: 1,
      name: "Academic Achievement",
      description: "",
      slug: "academic-achievement",
    },
    {
      id: 2,
      name: "Segregated Schools",
      description: "",
      slug: "segregated-schools",
    },
    {
      id: 3,
      name: "Homeless Students",
      description: "",
      slug: "homeless-students",
    }
  ];
}

function getIndicators(){
  return [
    {
      id: 1,
      name: "Median Sale Price",
      description: "",
      slug: "median-sale-price",
      favourite: true,
    },
    {
      id: 2,
      name: "Number of Available Houses",
      description: "",
      slug: "available-houses",
      favourite: false,
    },
    {
      id: 3,
      name: "Inflation Rate",
      description: "",
      slug: "inflation",
      favourite: true,
    },
    {
      id: 4,
      name: "Mean House Prices",
      description: "",
      slug: "mean-house-prices",
      favourite: false,
    }
  ]
}

function getConfigs(){
  return [
    {
      indicatorId: 1,
      layout: "SINGLE",
      xName: "Date",
      xType: "time",
      yName: "Mean Sale Price (Weekly)",
      yType: "",
    },
    {
      indicatorId: 2,
      layout: "DOUBLE"
    },
    {
      indicatorId: 3,
      layout: "SINGLE"
    },
    {
      indicatorId: 4,
      layout: "SINGLE"
    }
  ]
}

function getPredictionMarkets(){
  return[
    {
      id: 1,
      question: "Will anyone outbid Elon musk to buy twitter and get approved by twitter's board before the poison pill expires?",
      slug: "will-anyone-outbid-elon-musk-to-buy",
      description: "",
      marketVolume: 2696,
      author: "J",
      dateCreated: new Date("April 14, 2022 03:24:00"),
      favourite: true,
    },
    {
      id: 2,
      question: "What will Manifold Markets' new Mana currency sign be in a month?",
      slug: "manifold-mana",
      description: "",
      marketVolume: 773,
      author: "Manifold Markets",
      dateCreated: new Date("June 5, 2022 03:24:00"),
      favourite: true,
    },
    {
      id: 3,
      question: "What will the price of the $XBI biotech index be as of market close on December 30th, 2022?",
      description: "",
      slug: "xbi-biotech",
      marketVolume: 126,
      author: "Stephen Malina",
      dateCreated: new Date("November, 2022 03:24:00"),
      favourite: false,
    },
  ]
}

function getThemesToPredictionMarkets(){
  return([
    {
      themeId: 1,
      predictionMarketId: 1
    },
    {
      themeId: 1,
      predictionMarketId: 2
    },
    {
      themeId: 1,
      predictionMarketId: 3
    },
    {
      themeId: 2,
      predictionMarketId: 2
    },
    {
      themeId: 3,
      predictionMarketId: 3
    }
  ])
}

function getProblemsToPredictionMarkets(){
  return([
    {
      predictionMarketId: 1,
      problemId: 1
    },
    {
      predictionMarketId: 1,
      problemId: 2
    },
    {
      predictionMarketId: 1,
      problemId: 3
    },
    {
      predictionMarketId: 2,
      problemId: 2
    },
    {
      predictionMarketId: 3,
      problemId: 3
    }
  ])
}

function getIndicatorsToPredictionMarkets(){
  return([
    {
      predictionMarketId: 1,
      indicatorId: 1
    },
    {
      predictionMarketId: 1,
      indicatorId: 2
    },
    {
      predictionMarketId: 1,
      indicatorId: 3
    },
    {
      predictionMarketId: 2,
      indicatorId: 2
    },
    {
      predictionMarketId: 3,
      indicatorId: 3
    }
  ])
}


function getProblemsOnThemes(){
  return [
  {
    themeId: 1,
    problemId: 1
  },
  {
    themeId: 2,
    problemId: 2
  },
  {
    themeId: 3,
    problemId: 3
  },
  {
    themeId: 2,
    problemId: 1
  },
  {
    themeId: 3,
    problemId: 1
  }
  ]
};

function getIndicatorsOnThemes(){
  return [
    {
      themeId: 1,
      indicatorId: 1
    },
    {
      themeId: 1,
      indicatorId: 2
    },
    {
      themeId: 1,
      indicatorId: 3
    },
    {
      themeId: 2,
      indicatorId: 2
    },
    {
      themeId: 3,
      indicatorId: 3
    },
    {
      themeId: 2,
      indicatorId: 1
    },
    {
      themeId: 3,
      indicatorId: 1
    }
  ]
};

function getIndicatorsOnProblems(){
  return [
    {
      problemId: 1,
      indicatorId: 1
    },
    {
      problemId: 1,
      indicatorId: 2,
    },
    {
      problemId: 2,
      indicatorId: 2
    },
    {
      problemId: 3,
      indicatorId: 3
    },
    {
      problemId: 2,
      indicatorId: 1
    },
    {
      problemId: 3,
      indicatorId: 1
    }
  ]
}
