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
    getConfigs().map((config) => {
      return db.config.create({ data: config });
    })
  );
}
seed();

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
      name: "Median House Prices",
      description: "",
      slug: "median-house-prices",
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
      layout: "SINGLE"
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
