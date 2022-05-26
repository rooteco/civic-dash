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
    },
    {
      id: 4,
      name: "Mental Health",
      description: "",
      slug: "mental-health"
    },
    {
      id: 5,
      name: "Environmental Sustainability",
      description: "",
      slug: "sustainability"
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
      name: "Median Housing Sale Price",
      description: "<p>This indicator uses Zillow Research’s open source data <a href='https://www.zillow.com/research/data/'>[1]</a>, and lists the median price at which homes in San Francisco county were sold on a weekly basis. The county only includes central SF (e.g. not Oakland). There might be some bias in the data due to the fact that only a certain subset of houses are sold on Zillow, but it’s useful as a relative measure.</p>",
      slug: "median-sale-price",
      favourite: true,
    },
    {
      id: 2,
      name: "Average Build Price",
      description: "<p>It’s challenging to find comprehensive, up-to-date measures of the price of construction in San Francisco. The best resource was Turner and Townsend’s 2021 international analysis of housing costs, from which this indicator was derived <a href='https://i.emlfiles4.com/cmpdoc/5/1/7/8/7/files/798439_international-construction-market-survey-2021-web.pdf?utm_source=Turner%20%26%20Townsend&utm_medium=email&utm_campaign=12482091_ICMS%202021&dm_i=1OQJ,7FJ8R,9NTT9E,U6WD2,1'>[1]</a>. It lists San Francisco as the third most expensive city in the world for construction.</p>",
      slug: "housing-construction-costs",
      favourite: false,
    },
    {
      id: 3,
      name: "Annual Sell Price Growth Rate",
      description: "<p>This indicator uses the same Zillow data used to calculate Median Housing Sale Price <a href='https://www.zillow.com/research/data/'>[1]</a>. It groups the data by year and then calculates the year-on-year growth of the data.</p>",
      slug: "median-sale-price-growth",
      favourite: false,
    },
    {
      id: 4,
      name: "Percent Housing Burdened",
      description: "<p>Housing burdened individuals are those that spend more than 30% of their income on their accomodation <a href='https://nationalequityatlas.org/indicators/Housing_burden#/?breakdown=1&geo=07000000000667000'>[1]</a>, and severely cost-burdened individuals are those that spend more than 50% of their income on accomodation. Housing burdens are functions of costs and income, which means that generally high-cost cities like San Francisco can have a relatively lower number of housing-burdened residents compared to lower cost cities (because everything is so expensive that it requires a larger proportion of income). This data was taken from the National Equity Atlas, which is an excellent source of information for social indicators <a href='https://nationalequityatlas.org/indicators/Housing_burden#/?breakdown=1&geo=07000000000667000'>[2]</a>.</p>",
      slug: "housing-burdened",
      favourite: true,
    },
    {
      id: 5,
      name: "Housing Units per Capita",
      description: "<p>This indicator uses two datasets from datacommons.org <a href='https://datacommons.org/place/geoId/0667000?utm_medium=explore&mprop=count&popt=HousingUnit&hl=en'>[1]</a>: population and the number of housing units in San Francisco. These in turn are drawn from United States national census data.</p",
      slug: "houses-per-capita",
      favourite: true
    },
    {
      id: 6,
      name: "Number of Housing Units",
      description: "<p>This indicator uses two datasets from datacommons.org <a href='https://datacommons.org/place/geoId/0667000?utm_medium=explore&mprop=count&popt=HousingUnit&hl=en'>[1]</a>: population and the number of housing units in San Francisco. These in turn are drawn from United States national census data <a href='https://datacommons.org/place/geoId/0667000?utm_medium=explore&mprop=count&popt=HousingUnit&hl=en'>[1]</a>.</p>",
      slug: "housing-units",
      favourite: true,
    },
    {
      id: 7,
      name: "Rental Vacancy Rate",
      description: "<p>The rental vacancy rate measures the percentage of homes available for rent which are not occupied. It’s an important but complicated measure of housing availability: high vacancy rates could result from a lack of demand, an abundance of supply, or prohibitively high prices for accomodation. This data was summarised by the excellent site Department of Numbers <a href='https://www.deptofnumbers.com/rent/california/san-francisco/'>[1]</a>, and was originally taken from the Census ACS survey <a href='https://www.census.gov/programs-surveys/acs/'>[2]</a>.</p>",
      slug: "vacancy-rates",
      favourite: true,
    },
    {
      id: 8,
      name: "Number of New Housing Units",
      description: "<p>This Statista dataset <a href='https://www.statista.com/statistics/1016486/housing-completions-san-francisco/'>[1]</a> tracks the number of new housing units built in San Francisco from 2000 to 2021, and highlights a relatively flat growth, as well as the impact of the global financial crisis of 2009.</p>",
      slug: "new-housing-units",
      favourite: false
    },
    {
      id: 9,
      name: "Reasons for Vacant Housing",
      description: "<p>This indicator is taken from a 2019 report by the San Francisco government <a href='https://sfgov.legistar.com/View.ashx?M=F&ID=10441217&GUID=3331928E-0574-4AEA-90DB-35D04F638EDB'>[1]</a>, and breaks down the total number of vacant houses in the city (40,458) by category. The Other Vacant category includes 'units held vacant for personal or family reasons, units requiring or undergoing repair, corporate housing, units held for use by a caretaker or janitor, units subject to legal proceedings, units being kept vacant for a future sale, etc.'</p>",
      slug: "vacant-units",
      favourite: false
    },
    {
      id: 10,
      name: "Average SAT Score",
      description: "<p>The data for San Francisco was taken from the education tracker Niche <a href='https://www.niche.com/k12/d/san-francisco-unified-school-district-ca/academics/'>[]</a>, while scores for other states came from The College Board <a href='https://reports.collegeboard.org/sat-suite-program-results'>[]</a>, which tracks SAT scores nationally.</p>",
      slug: "average-sat",
      favourite: false
    },
    {
      id: 11,
      name: "% of Students Who Have Met State Standards for English",
      description: "<p>California standardises its assessment of its students using as a system called the California Assessment of Student Performance and Progress (CAASPP), which involves a set of standardised tests given to K-12 students. Standards are set for four categories: Standard Exceeded, Standard Met, Standard Nearly Met, and Standard Not Met. This indicator tracks the percentage of students who were in either the Standard Exceeded or Standard Met categories for the standardised English test <a href='http://caaspp.edsource.org/sbac/san-francisco-unified-38684780000000'>[1]</a>. All scores are for 2019 due to a lapse in educational reporting due to the COVID-19 pandemic. </p>",
      slug: "met-tests-english",
      favourite: false
    },
    {
      id: 12,
      name: "% of Students Who Have Met State Standards for Math",
      description: "<p>California standardises its assessment of its students using as a system called the California Assessment of Student Performance and Progress (CAASPP), which involves a set of standardised tests given to K-12 students. Standards are set for four categories: Standard Exceeded, Standard Met, Standard Nearly Met, and Standard Not Met. This indicator tracks the percentage of students who were in either the Standard Exceeded or Standard Met categories for the standardised English test <a href='http://caaspp.edsource.org/sbac/san-francisco-unified-38684780000000'>[1]</a>. All scores are for 2019 due to a lapse in educational reporting due to the COVID-19 pandemic. </p>",
      slug: "met-tests-math",
      favourite: false
    },
    {
      id: 13,
      name: "School Enrolment (Broken Down by Socioeconomic Demographic)",
      description: "<p>This indicator provides useful context for many other datasets in this topic, and was taken from the California School Dashboard <a href='https://www.caschooldashboard.org/reports/38684780000000/2021'>[1]</a>. Unlike other educational datasets that we’ve used, this data is from 2021, because enrolment continued to be reported on during the pandemic. It was impossible to maintain readability and include all racial demographics in the bar chart, so those with fewer than 500 enrolled students were folded into Other (American Indian [123] and Pacific Islander [393]), as well as students from two or more races.</p>",
      slug: "socio-economic-enrollment",
      favourite: false
    },
    {
      id: 14,
      name: "School Enrolment (Broken Down by Racial Demographic)",
      description: "<p>This indicator provides useful context for many other datasets in this topic, and was taken from the California School Dashboard <a href='https://www.caschooldashboard.org/reports/38684780000000/2021'>[1]</a>. Unlike other educational datasets that we’ve used, this data is from 2021, because enrolment continued to be reported on during the pandemic. It was impossible to maintain readability and include all racial demographics in the bar chart, so those with fewer than 500 enrolled students were folded into Other (American Indian [123] and Pacific Islander [393]), as well as students from two or more races.</p>",
      slug: "racial-enrollment",
      favourite: false
    },
    {
      id: 15,
      name: "Rates of Student Absenteeism",
      description: "<p>This indicator was drawn from the California School Dashboard by the San Francisco United School District <a href='https://www.caschooldashboard.org/reports/38684780000000/2019/academic-engagement'>[1]</a>, which is an excellent resource for many different measures of academic performance and behaviour. Absenteeism is measured for students from kindergarten through grade 8, and being “chronically absent” involves being absent 10 percent or more of all enrolled school days. These statistics are for 2019, because data reporting stopped by government mandate during the COVID-19 pandemic.</p>",
      slug: "student-absenteeism",
      favourite: false
    },
    {
      id: 16,
      name: "High School Graduation Rate",
      description: "<p>This indicator was taken from the California School Dashboard by the San Francisco United School District <a href='https://www.caschooldashboard.org/reports/38684780000000/2019/academic-engagement'>[1]</a>. Students are counted as ‘graduated’ when they receive a standard high school diploma, or when they complete their requirements at an alternative school. These statistics are for 2019, because data reporting stopped by government mandate during the COVID-19 pandemic.</p>",
      slug: "high-school-graduation",
      favourite: false
    },
    {
      id: 17,
      name: "Average Daily Number of Emergency Calls per Month",
      description: "<p>This indicator tracks the average daily number of calls to 911 in San Francisco county, drawing from data collected by the San Francisco local government <a link='https://sfgov.org/scorecards/public-safety/911-call-volume-and-response'>[1]</a>. The average daily number is calculated by summing the number of calls received over a month and dividing by the number of days in that month.</p>",
      slug: "emergency-calls",
      favourite: false,
    },
    {
      id: 18,
      name: "CO2 Emissions",
      description: "<p>San Francisco’s carbon footprint has been steadily shrinking, as this data from the city government <a link = 'https://sfenvironment.org/carbonfootprint'>[1]</a> <a link = 'https://data.sfgov.org/Energy-and-Environment/San-Francisco-Communitywide-Greenhouse-Gas-Invento/btm4-e4ak'>[2]</a> demonstrates. Over this same time period (1990 - 2019), the city’s population grew by 22% <a link = 'https://datacommons.org/place/geoId/0667000?utm_medium=explore&mprop=count&popt=Person&hl=en'>[3]</a>.</p>",
      slug: "co2-emissions",
      favourite: false,
    },
    {
        id: 19,
        name: "Sources of Current CO2 Emissions",
        description: "<p>This indicator breaks down 2019 carbon emissions into their sources, drawing from studies conducted by the city government <a link='https://sfenvironment.org/carbonfootprint'>[1]</a>",
        slug: "co2-emissions-sources",
        favourite: false,
    },
    {
        id: 20,
        name: "Days Per Year with Good Air Quality",
        description: "<p>Each day, the Environmental Protection Agency calculates and publishes an Air Quality Index, which monitors five main air pollutants: ground-level ozone, particle pollution, carbon monoxide, sulfur dioxide and nitrogen dioxide. This indicator aggregates the number of days each year where this rating was at its best level of “Good”, and was drawn from the San Francisco Scorecards <a link = 'https://sfgov.org/scorecards/environment/days-epa-air-quality-index-rating-good'>[1]</a>.</p>",
        slug: "daily-air-quality",
        favourite: false,
    },
    {
        id: 21,
        name: "Per Capita Water Consumption",
        description: "<p>This indicator tracks the average amount of water used by a single residential customer in San Francisco each day, including water served by public utility companies. It uses data collected by the San Francisco government through its Scorecard program <a link='https://sfgov.org/scorecards/environment/water-sold-san-francisco-residential-customers'>[1]</a>.</p>",
        slug: "per-capita-water-consumption",
        favourite: false,
    },
    {
        id: 22,
        name: "Recycling and Composting Rate",
        description: "<p>This indicator tracks the percentage of trash generated by citizens and small businesses that is either recycled or composed, and therefore saved from being sent to a landfill. It uses data collected by the San Francisco government through its scorecard program <a link='https://sfgov.org/scorecards/environment/residential-and-small-business-landfill-diversion'>[1]</a>.</p>",
        slug: "recycling-rate",
        favourite: false,
    },
    {
        id: 23,
        name: "Percentage of Sustainable Transportation",
        description: "<p>The San Francisco government measures the distribution of transportation methods, and classifies some (walking, taking public transit, cycling) as sustainable <a link = 'https://sfgov.org/scorecards/transportation/non-private-auto-mode-share'>[1]</a>. This indicator tracks the percentage of all such trips that take place on sustainable transportation modes. It doesn’t include any data about the length of these trips, which might play a significant role in the sustainability of the city (for example, if all long trips are taken in a car, and all short trips are on buses).</p>",
        slug: "sustainable-transportation",
        favourite: false,
    },
    {
      id: 24,
      name: "Number of Mental Health Clients",
      description: "<p>This indicator tracks the total number of people in treatment for mental health issues with services run through the San Francisco Department of Public Health. Totals are calculated for each month, and each individual is only counted once, regardless of the number of services that they received. This indicator uses data collected by the San Francisco government through its scorecard program <a link='https://sfgov.org/scorecards/public-health/substance-abuse-and-mental-health-treatment'>[1]</a>.</p>",
      slug: "mental-health-clients",
      favourite: false,
    },
    {
      id: 25,
      name: "Chronic Absenteeism, Broken Down by Race",
      description: "<p>This indicator was drawn from the California School Dashboard by the San Francisco United School District <a link='https://www.caschooldashboard.org/reports/38684780000000/2019/academic-engagement'>[1]</a>, which is an excellent resource for many different measures of academic performance and behavior. Absenteeism is measured for students from kindergarten through grade 8, and being “chronically absent” involves being absent 10 percent or more of all enrolled school days. These statistics are for 2019, because data reporting stopped by government mandate during the COVID-19 pandemic.</p>",
      slug: "student-absenteeism-race",
      favourite: false,
    },
    {
      id: 26,
      name: "Graduation Rate, Broken Down by Race",
      description: "<p>This indicator was taken from the California School Dashboard by the San Francisco United School District <a link='https://www.caschooldashboard.org/reports/38684780000000/2019/academic-engagement'>[1]</a>. High school students are counted as ‘graduated’ when they receive a standard high school diploma, or when they complete their requirements at an alternative school. These statistics are for 2019, because data reporting stopped by government mandate during the COVID-19 pandemic.</p>",
      slug: "high-school-graduation-race",
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
      yName: "Median Sale Price (Weekly)",
      yType: "linear",
      yFormat: 'usd',
      chartType: 'line'
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
      layout: "SINGLE",
      xName: "Date",
      xType: "time",
      yName: "Median Listing Price (Weekly)",
      yType: "linear",
      yFormat: 'usd',
      chartType: 'scatter',
    },
    {
      indicatorId: 5,
      layout: "SINGLE",
      xName: "Date",
      yName: "Median Listing Price (Weekly)",
      yType: "linear",
      chartType: 'bar'
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
