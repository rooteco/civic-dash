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
      description: "<p>Despite being one of the wealthiest cities in the United States <a target='_blank' href='https://www.census.gov/quickfacts/sanfranciscocitycalifornia'>[1]</a>, San Francisco suffers from one of the worst housing crises in the country. Average rent in the city is two and a half times the national average <a target='_blank' href='https://bungalow.com/articles/what-is-the-real-cost-of-living-in-san-francisco-ca'>[2]</a>, and the cost of living is only rising <a target=' blank' href='https://bungalow.com/articles/what-is-the-real-cost-of-living-in-san-francisco-ca'>[3]</a>. The impacts of this crisis manifest in nearly every social issue facing San Francisco, forcing residents onto the streets, stymying urban development, and leaving citizens with less money to pay for education, food, and transport <a target='_blank' href='https://www.vox.com/a/homeless-san-francisco-tech-boom'>[4]</a>.</p><p>The indicators that we’ve chosen for Abundant Housing explore the issue from an economic perspective, for which there is the most reliable data, but the true cost of San Francisco’s housing crisis is the thousands of people it has displaced, and the tens of thousands that it has affected. It’s difficult to segment the theme into specific problems because of how interconnected all of the root causes are, so for Abundant Housing indicators tend to be segmented based on the aspect of the overarching theme that they most relate to.</p><p>We’re working on integrating the stories of some of these people into the dashboard. For now, you can read about some of them in an excellent article by Vox on the subject <a target='_blank' href='https://www.vox.com/a/homeless-san-francisco-tech-boom'>[5]</a>.</p>",
      slug: "abundant-housing"
    },
    {
      id: 2,
      name: "Quality Education",
      description: "<p>San Francisco is home to over a dozen top-rated universities <a target='_blank' href='https://www.universityguru.com/universities-san-francisco'>[1]</a>, and its primary and secondary education system is highly ranked on both the state and national level <a target='_blank' href='https://innovateschools.org/wp-content/uploads/2021/01/2020-Spotlight-on-Schools-within-SFUSD.pdf'>[2]</a> <a target='_blank href='https://www.niche.com/k12/d/san-francisco-unified-school-district-ca/'>[3]</a>. Despite its track record, there are still many issues with education in SF, ranging from increasingly segregated schools, to racial disparities in educational attainment, to a lack of support for homeless and disadvantaged students, to a shortage of qualified teachers. COVID has both exacerbated these issues and made tracking them accurately more difficult as schools shut for months at a time.</p><p>The indicators we’ve chosen for tracking Education in San Francisco are far from comprehensive, but they provide insight into the systemic and generational issues facing the city.</p>",
      slug: "quality-education",
    },
    {
      id: 3,
      name: "Public Safety",
      description: "<p>Public safety in San Francisco is difficult to categorise accurately. The city is a centre for tourism and business that is generally considered very safe to visit <a target='_blank' href='https://www.smartertravel.com/areas-avoid-san-francisco-warnings-dangers/'>[1]</a>, and at the same time, the city has extremely high levels of violent crime and property theft <a target='_blank' href='https://www.hoover.org/research/why-san-francisco-nearly-most-crime-ridden-city-us'>[2]</a>. It’s often challenging to report measures of public safety accurately, because different neighbourhoods can have extremely different levels of crime. We’re working on incorporating geospatial visualisations into the dashboard, and until then we’ve tried to qualify our indicators with context about the ways in which they aggregate many different neighbourhoods.</p>",
      slug: "public-safety"
    },
    {
      id: 4,
      name: "Mental Health",
      description: "<p>Mental health is very rarely discussed at a civic level, partially because of the difficulty of tracking it, and partially because of the stigma that is still often associated with it <a target='_blank' href='https://hcp.hms.harvard.edu/news/mental-illnesses-are-common-care-lacking'>[1]</a> <a target='_blank' href='https://www.mcleanhospital.org/essential/lets-face-it-no-one-wants-talk-about-mental-health'>[2]</a>. Perhaps because of this, it affects Americans more than almost any other affliction. One in four adults in the United State have a mental disorder in any given year <a target='_blank' href='https://www.healthypeople.gov/2020/leading-health-indicators/2020-lhi-topics/Mental-Health'>[3]</a>, and such traumas have extremely strong correlations with the most pressing social issues facing San Francisco, including substance abuse, poverty and homelessness <a target='_blank' href='https://www.nimh.nih.gov/health/topics/substance-use-and-mental-health'>[4]</a> <a target='_blank' href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5374256/'>[5]</a>. Due to the scarcity of data, many of the indicators that we’ve chosen are indirect measures of the state of San Francisco’s mental health, and it’s important to note that many of the people that suffer most probably belong to the city’s homeless population <a target='_blank' href='https://www.bbrfoundation.org/blog/homelessness-and-mental-illness-challenge-our-society'>[6]</a>, for which there are fewer accurate data sources.</p>",
      slug: "mental-health"
    },
    {
      id: 5,
      name: "Environmental Sustainability",
      description: "<p>As the global push towards sustainability become more and more urgent, San Francisco remains a centre of sustainability and ecological awareness <a target='_blank' href='https://aaasolutions.com/blog/san-francisco-the-green-city/'>[1]</a>. Over the last decade, the city has implemented dozens of programs aimed at combating pollution, ranging from extensive recycling <a target='_blank' href='https://www.epa.gov/transforming-waste-tool/zero-waste-case-study-san-francisco'>[2]</a>, to a ban on plastic bags <a target='_blank' href='https://1bagatatime.com/learn/guide-bag-bans/bag-ban-san-francisco/'>[3]</a>, to legislation forcing businesses to lower their greenhouse gas emissions <a target='_blank' href='https://carbonneutralcities.org/cities/san-francisco/#:~:text=San Francisco has already reduced,percent renewable electricity by 2030.'>[4]</a>. More work has to be done to support long-term sustainability, but it’s also worth celebrating the massive amount of work that has been done by the government and other organisations to turn San Francisco into a green city.</p>",
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
      description: "This indicator uses Zillow Research’s open source data <a target='_blank' href='https://www.zillow.com/research/data/'>[1]</a>, and lists the median price at which homes in San Francisco county were sold on a weekly basis. The county only includes central SF (e.g. not Oakland). There might be some bias in the data due to the fact that only a certain subset of houses are sold on Zillow, but it’s useful as a relative measure.",
      slug: "median-sale-price",
      favourite: true,
    },
    {
      id: 2,
      name: "Average Build Price for a Townhouse (per m^2)",
      description: "It’s challenging to find comprehensive, up-to-date measures of the price of construction in San Francisco. The best resource was Turner and Townsend’s 2021 international analysis of housing costs, from which this indicator was derived <a target='_blank' href='https://i.emlfiles4.com/cmpdoc/5/1/7/8/7/files/798439_international-construction-market-survey-2021-web.pdf?utm_source=Turner%20%26%20Townsend&utm_medium=email&utm_campaign=12482091_ICMS%202021&dm_i=1OQJ,7FJ8R,9NTT9E,U6WD2,1'>[1]</a>. It lists San Francisco as the third most expensive city in the world for construction.",
      slug: "housing-construction-costs",
      favourite: false,
    },
    {
      id: 3,
      name: "Annual Sell Price Growth Rate",
      description: "This indicator uses the same Zillow data used to calculate Median Housing Sale Price <a target='_blank' href='https://www.zillow.com/research/data/'>[1]</a>. It groups the data by year and then calculates the year-on-year growth of the data.",
      slug: "median-sale-price-growth",
      favourite: false,
    },
    {
      id: 4,
      name: "Percent Housing Burdened",
      description: "Housing burdened individuals are those that spend more than 30% of their income on their accomodation <a target='_blank' href='https://nationalequityatlas.org/indicators/Housing_burden#/?breakdown=1&geo=07000000000667000'>[1]</a>, and severely cost-burdened individuals are those that spend more than 50% of their income on accomodation. Housing burdens are functions of costs and income, which means that generally high-cost cities like San Francisco can have a relatively lower number of housing-burdened residents compared to lower cost cities (because everything is so expensive that it requires a larger proportion of income). This data was taken from the National Equity Atlas, which is an excellent source of information for social indicators <a target='_blank' href='https://nationalequityatlas.org/indicators/Housing_burden#/?breakdown=1&geo=07000000000667000'>[2]</a>.",
      slug: "housing-burdened",
      favourite: true,
    },
    {
      id: 5,
      name: "Housing Units per Capita",
      description: "This indicator uses two datasets from datacommons.org <a target='_blank' href='https://datacommons.org/place/geoId/0667000?utm_medium=explore&mprop=count&popt=HousingUnit&hl=en'>[1]</a>: population and the number of housing units in San Francisco. These in turn are drawn from United States national census data.</p",
      slug: "houses-per-capita",
      favourite: true
    },
    {
      id: 6,
      name: "Number of Housing Units",
      description: "This indicator uses two datasets from datacommons.org <a target='_blank' href='https://datacommons.org/place/geoId/0667000?utm_medium=explore&mprop=count&popt=HousingUnit&hl=en'>[1]</a>: population and the number of housing units in San Francisco. These in turn are drawn from United States national census data <a target='_blank' href='https://datacommons.org/place/geoId/0667000?utm_medium=explore&mprop=count&popt=HousingUnit&hl=en'>[2]</a>.",
      slug: "housing-units",
      favourite: true,
    },
    {
      id: 7,
      name: "Rental Vacancy Rate",
      description: "The rental vacancy rate measures the percentage of homes available for rent which are not occupied. It’s an important but complicated measure of housing availability: high vacancy rates could result from a lack of demand, an abundance of supply, or prohibitively high prices for accomodation. This data was summarised by the excellent site Department of Numbers <a target='_blank' href='https://www.deptofnumbers.com/rent/california/san-francisco/'>[1]</a>, and was originally taken from the Census ACS survey <a target='_blank' href='https://www.census.gov/programs-surveys/acs/'>[2]</a>.",
      slug: "vacancy-rates",
      favourite: true,
    },
    {
      id: 8,
      name: "Number of New Housing Units",
      description: "This Statista dataset <a target='_blank' href='https://www.statista.com/statistics/1016486/housing-completions-san-francisco/'>[1]</a> tracks the number of new housing units built in San Francisco from 2000 to 2021, and highlights a relatively flat growth, as well as the impact of the global financial crisis of 2009.",
      slug: "new-housing-units",
      favourite: false
    },
    {
      id: 9,
      name: "Reasons for Vacant Housing",
      description: "This indicator is taken from a 2019 report by the San Francisco government <a target='_blank' href='https://sfgov.legistar.com/View.ashx?M=F&ID=10441217&GUID=3331928E-0574-4AEA-90DB-35D04F638EDB'>[1]</a>, and breaks down the total number of vacant houses in the city (40,458) by category. The Other Vacant category includes 'units held vacant for personal or family reasons, units requiring or undergoing repair, corporate housing, units held for use by a caretaker or janitor, units subject to legal proceedings, units being kept vacant for a future sale, etc.'",
      slug: "vacant-units",
      favourite: false
    },
    {
      id: 10,
      name: "Average SAT Score",
      description: "The data for San Francisco was taken from the education tracker Niche <a target='_blank' href='https://www.niche.com/k12/d/san-francisco-unified-school-district-ca/academics/'>[]</a>, while scores for other states came from The College Board <a target='_blank' href='https://reports.collegeboard.org/sat-suite-program-results'>[]</a>, which tracks SAT scores nationally.",
      slug: "average-sat",
      favourite: false
    },
    {
      id: 11,
      name: "% of Students Who Have Met State Standards for English (Breakdown by Race)",
      description: "California standardises its assessment of its students using as a system called the California Assessment of Student Performance and Progress (CAASPP), which involves a set of standardised tests given to K-12 students. Standards are set for four categories: Standard Exceeded, Standard Met, Standard Nearly Met, and Standard Not Met. This indicator tracks the percentage of students who were in either the Standard Exceeded or Standard Met categories for the standardised English test <a target='_blank' href='http://caaspp.edsource.org/sbac/san-francisco-unified-38684780000000'>[1]</a>. All scores are for 2019 due to a lapse in educational reporting due to the COVID-19 pandemic. ",
      slug: "met-tests-english",
      favourite: false
    },
    {
      id: 12,
      name: "% of Students Who Have Met State Standards for Math (Breakdown by Race)",
      description: "California standardises its assessment of its students using as a system called the California Assessment of Student Performance and Progress (CAASPP), which involves a set of standardised tests given to K-12 students. Standards are set for four categories: Standard Exceeded, Standard Met, Standard Nearly Met, and Standard Not Met. This indicator tracks the percentage of students who were in either the Standard Exceeded or Standard Met categories for the standardised English test <a target='_blank' href='http://caaspp.edsource.org/sbac/san-francisco-unified-38684780000000'>[1]</a>. All scores are for 2019 due to a lapse in educational reporting due to the COVID-19 pandemic. ",
      slug: "met-tests-math",
      favourite: false
    },
    {
      id: 13,
      name: "School Enrolment (Broken Down by Socioeconomic Demographic)",
      description: "This indicator provides useful context for many other datasets in this topic, and was taken from the California School Dashboard <a target='_blank' href='https://www.caschooldashboard.org/reports/38684780000000/2021'>[1]</a>. Unlike other educational datasets that we’ve used, this data is from 2021, because enrolment continued to be reported on during the pandemic. It was impossible to maintain readability and include all racial demographics in the bar chart, so those with fewer than 500 enrolled students were folded into Other (American Indian [123] and Pacific Islander [393]), as well as students from two or more races.",
      slug: "socio-economic-enrollment",
      favourite: false
    },
    {
      id: 14,
      name: "School Enrolment (Broken Down by Racial Demographic)",
      description: "This indicator provides useful context for many other datasets in this topic, and was taken from the California School Dashboard <a target='_blank' href='https://www.caschooldashboard.org/reports/38684780000000/2021'>[1]</a>. Unlike other educational datasets that we’ve used, this data is from 2021, because enrolment continued to be reported on during the pandemic. It was impossible to maintain readability and include all racial demographics in the bar chart, so those with fewer than 500 enrolled students were folded into Other (American Indian [123] and Pacific Islander [393]), as well as students from two or more races.",
      slug: "racial-enrollment",
      favourite: false
    },
    {
      id: 15,
      name: "Rates of Student Absenteeism (Breakdown by Socioeconomic Demographic)",
      description: "This indicator was drawn from the California School Dashboard by the San Francisco United School District <a target='_blank' href='https://www.caschooldashboard.org/reports/38684780000000/2019/academic-engagement'>[1]</a>, which is an excellent resource for many different measures of academic performance and behaviour. Absenteeism is measured for students from kindergarten through grade 8, and being “chronically absent” involves being absent 10 percent or more of all enrolled school days. These statistics are for 2019, because data reporting stopped by government mandate during the COVID-19 pandemic.",
      slug: "student-absenteeism",
      favourite: false
    },
    {
      id: 16,
      name: "High School Graduation Rate (Breakdown by Socioeconomic Demographic)",
      description: "This indicator was taken from the California School Dashboard by the San Francisco United School District <a target='_blank' href='https://www.caschooldashboard.org/reports/38684780000000/2019/academic-engagement'>[1]</a>. Students are counted as ‘graduated’ when they receive a standard high school diploma, or when they complete their requirements at an alternative school. These statistics are for 2019, because data reporting stopped by government mandate during the COVID-19 pandemic.",
      slug: "high-school-graduation",
      favourite: false
    },
    {
      id: 17,
      name: "Average Daily Number of Emergency Calls per Month",
      description: "This indicator tracks the average daily number of calls to 911 in San Francisco county, drawing from data collected by the San Francisco local government <a target='_blank' link='https://sfgov.org/scorecards/public-safety/911-call-volume-and-response'>[1]</a>. The average daily number is calculated by summing the number of calls received over a month and dividing by the number of days in that month.",
      slug: "emergency-calls",
      favourite: false,
    },
    {
      id: 18,
      name: "CO2 Emissions",
      description: "San Francisco’s carbon footprint has been steadily shrinking, as this data from the city government <a target='_blank' link = 'https://sfenvironment.org/carbonfootprint'>[1]</a> <a target='_blank' link = 'https://data.sfgov.org/Energy-and-Environment/San-Francisco-Communitywide-Greenhouse-Gas-Invento/btm4-e4ak'>[2]</a> demonstrates. Over this same time period (1990 - 2019), the city’s population grew by 22% <a target='_blank' link = 'https://datacommons.org/place/geoId/0667000?utm_medium=explore&mprop=count&popt=Person&hl=en'>[3]</a>.",
      slug: "co2-emissions",
      favourite: false,
    },
    {
        id: 19,
        name: "Sources of Current CO2 Emissions",
        description: "This indicator breaks down 2019 carbon emissions into their sources, drawing from studies conducted by the city government <a target='_blank' link='https://sfenvironment.org/carbonfootprint'>[1]</a>",
        slug: "co2-emissions-sources",
        favourite: false,
    },
    {
      id: 20,
      name: "Days Per Year with Good Air Quality",
      description: "Each day, the Environmental Protection Agency calculates and publishes an Air Quality Index, which monitors five main air pollutants: ground-level ozone, particle pollution, carbon monoxide, sulfur dioxide and nitrogen dioxide. This indicator aggregates the number of days each year where this rating was at its best level of “Good”, and was drawn from the San Francisco Scorecards <a target='_blank' link = 'https://sfgov.org/scorecards/environment/days-epa-air-quality-index-rating-good'>[1]</a>.",
      slug: "daily-air-quality",
      favourite: false,
    },
    {
        id: 21,
        name: "Per Capita Water Consumption",
        description: "This indicator tracks the average amount of water used by a single residential customer in San Francisco each day, including water served by public utility companies. It uses data collected by the San Francisco government through its Scorecard program <a target='_blank' link='https://sfgov.org/scorecards/environment/water-sold-san-francisco-residential-customers'>[1]</a>.",
        slug: "per-capita-water-consumption",
        favourite: false,
    },
    {
        id: 22,
        name: "Recycling and Composting Rate",
        description: "This indicator tracks the percentage of trash generated by citizens and small businesses that is either recycled or composed, and therefore saved from being sent to a landfill. It uses data collected by the San Francisco government through its scorecard program <a target='_blank' link='https://sfgov.org/scorecards/environment/residential-and-small-business-landfill-diversion'>[1]</a>.",
        slug: "recycling-rate",
        favourite: false,
    },
    {
        id: 23,
        name: "Percentage of Sustainable Transportation",
        description: "The San Francisco government measures the distribution of transportation methods, and classifies some (walking, taking public transit, cycling) as sustainable <a target='_blank' link = 'https://sfgov.org/scorecards/transportation/non-private-auto-mode-share'>[1]</a>. This indicator tracks the percentage of all such trips that take place on sustainable transportation modes. It doesn’t include any data about the length of these trips, which might play a significant role in the sustainability of the city (for example, if all long trips are taken in a car, and all short trips are on buses).",
        slug: "sustainable-transportation",
        favourite: false,
    },
    {
      id: 24,
      name: "Number of Mental Health Clients",
      description: "This indicator tracks the total number of people in treatment for mental health issues with services run through the San Francisco Department of Public Health. Totals are calculated for each month, and each individual is only counted once, regardless of the number of services that they received. This indicator uses data collected by the San Francisco government through its scorecard program <a target='_blank' link='https://sfgov.org/scorecards/public-health/substance-abuse-and-mental-health-treatment'>[1]</a>.",
      slug: "mental-health-clients",
      favourite: false,
    },
    {
      id: 25,
      name: "Chronic Absenteeism (Breakdown by Racial Demographic)",
      description: "This indicator was drawn from the California School Dashboard by the San Francisco United School District <a target='_blank' link='https://www.caschooldashboard.org/reports/38684780000000/2019/academic-engagement'>[1]</a>, which is an excellent resource for many different measures of academic performance and behavior. Absenteeism is measured for students from kindergarten through grade 8, and being “chronically absent” involves being absent 10 percent or more of all enrolled school days. These statistics are for 2019, because data reporting stopped by government mandate during the COVID-19 pandemic.",
      slug: "student-absenteeism-race",
      favourite: false,
    },
    {
      id: 26,
      name: "Graduation Rate, Broken Down by Race",
      description: "This indicator was taken from the California School Dashboard by the San Francisco United School District <a target='_blank' link='https://www.caschooldashboard.org/reports/38684780000000/2019/academic-engagement'>[1]</a>. High school students are counted as ‘graduated’ when they receive a standard high school diploma, or when they complete their requirements at an alternative school. These statistics are for 2019, because data reporting stopped by government mandate during the COVID-19 pandemic.",
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
      yName: "Median Sale Price (USD, Weekly)",
      yType: "linear",
      yFormat: 'usd',
      chartType: 'line'
    },
    {
      indicatorId: 2,
      layout: "DOUBLE",
      xName: "City",
      xType: "band",
      yName: "Average Cost of m2 of Townhouse Construction (USD)",
      yFormat: "usd",
      chartType: "bar"
    },
    {
      indicatorId: 3,
      layout: "SINGLE",
      xName: "Date",
      xType: "time",
      yName: "Average Growth Rate of Sale Price",
      yFormat: "percentage",
      chartType: "line"
    },
    {
      indicatorId: 4,
      layout: "SINGLE",
      xName: "Socioeconomic Demographic",
      xType: "band",
      yName: "Percent of Housing Burdened Citizens",
      yType: "linear",
      yFormat: 'percentage',
      chartType: 'bar',
    },
    {
      indicatorId: 5,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Housing Units Per Capita",
      yType: "linear",
      yFormat: "fraction",
      chartType: 'line'
    },
    {
      indicatorId: 6,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Number of Housing Units",
      yType: "linear",
      yFormat: "wholeNumber",
      chartType: 'line'
    },
    {
      indicatorId: 7,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Rental Vacancy Rate (%)",
      yType: "linear",
      yFormat: "percentage",
      chartType: 'line'
    },
    {
      indicatorId: 8,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Number of New Housing Units",
      yType: "linear",
      yFormat: "wholeNumber",
      chartType: 'line'
    },
    {
      indicatorId: 9,
      layout: "SINGLE",
      xName: "Reason",
      xType: "band",
      yName: "Reasons for Vacant Housing",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 10,
      layout: "SINGLE",
      xName: "City",
      xType: "band",
      yName: "Average SAT Score",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 11,
      layout: "SINGLE",
      xName: "Racial Demographic",
      xType: "band",
      yName: "Students Meeting Standards (%)",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 12,
      layout: "SINGLE",
      xName: "Racial Demographic",
      xType: "band",
      yName: "Students Meeting Standards (%)",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 13,
      layout: "SINGLE",
      xName: "Socioeconomic Demographic",
      xType: "band",
      yName: "Number of Students Enrolled",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 14,
      layout: "SINGLE",
      xName: "Racial Demographic",
      xType: "band",
      yName: "Number of Students Enrolled",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 15,
      layout: "SINGLE",
      xName: "Socioeconomic Demographic",
      xType: "band",
      yName: "Percentage of Students Chronically Absent",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 16,
      layout: "SINGLE",
      xName: "Socioeconomic Demographic",
      xType: "band",
      yName: "Graduation Rate (%)",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 17,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Average Emergency Calls",
      yType: "linear",
      chartType: 'line'
    },
    {
      indicatorId: 18,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "CO2 Emissions (metric tons)",
      yType: "linear",
      yFormat: "wholeNumber",
      chartType: 'line'
    },
    {
      indicatorId: 19,
      layout: "SINGLE",
      xName: "CO2 Source",
      xType: "band",
      yName: "Contribution to Emissions (%)",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 20,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Days Per Year with Good Air Quality",
      yType: "linear",
      chartType: 'line'
    },
    {
      indicatorId: 21,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Per Capita Water Consumption",
      yType: "linear",
      chartType: 'line'
    },
    {
      indicatorId: 22,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Recycling and Composting Rate",
      yType: "linear",
      chartType: 'line'
    },
    {
      indicatorId: 23,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Percent of Rides That Are Sustainable",
      yType: "linear",
      yFormat: "percentage",
      chartType: 'line'
    },
    {
      indicatorId: 24,
      layout: "SINGLE",
      xName: "Date",
      xType: 'time',
      yName: "Number of Mental Health Clients",
      yType: "linear",
      yFormat: 'wholeNumber',
      chartType: 'line'
    },
    {
      indicatorId: 25,
      layout: "SINGLE",
      xName: "Racial Demographic",
      xType: "band",
      yName: "Chronic Absenteeism Rate (%)",
      yType: "linear",
      chartType: 'bar'
    },
    {
      indicatorId: 26,
      layout: "SINGLE",
      xName: "Racial Demographic",
      xType: "band",
      yName: "Graduation Rate (%)",
      yType: "linear",
      chartType: 'bar'
    }
  ]
}

function getPredictionMarkets(){
  return[
    {
      id: 1,
      question: "Which of these solutions is the most important for improving the state of abundant housing in San Francisco?",
      slug: "which-of-these-solutions-is-the-mos",
      favourite: true
    },
    {
      id: 2,
      question: "Will anyone outbid Elon musk to buy twitter and get approved by twitter's board before the poison pill expires?",
      slug: "will-anyone-outbid-elon-musk-to-buy",
      favourite: true,
    },
    {
      id: 3,
      question: "What will Manifold Markets' new Mana currency sign be in a month?",
      slug: "manifold-mana",
      favourite: true,
    },
    {
      id: 4,
      question: "What will the price of the $XBI biotech index be as of market close on December 30th, 2022?",
      slug: "xbi-biotech",
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
      indicatorId: 1,
      themeId: 1,
    },
    {
      indicatorId: 2,
      themeId: 1,
    },
    {
      indicatorId: 3,
      themeId: 1,
    },
    {
      indicatorId: 4,
      themeId: 1,
    },
    {
      indicatorId: 5,
      themeId: 1,
    },
    {
      indicatorId: 6,
      themeId: 1,
    },
    {
      indicatorId: 7,
      themeId: 1,
    },
    {
      indicatorId: 8,
      themeId: 1,
    },
    {
      indicatorId: 9,
      themeId: 1,
    },
    {
      indicatorId: 10,
      themeId: 2,
    },
    {
      indicatorId: 11,
      themeId: 2,
    },
    {
      indicatorId: 12,
      themeId: 2,
    },
    {
      indicatorId: 13,
      themeId: 2,
    },
    {
      indicatorId: 14,
      themeId: 2,
    },
    {
      indicatorId: 15,
      themeId: 2,
    },
    {
      indicatorId: 16,
      themeId: 2,
    },
    {
      indicatorId: 17,
      themeId: 3,
    },
    {
      indicatorId: 18,
      themeId: 5,
    },
    {
      indicatorId: 19,
      themeId: 5,
    },
    {
      indicatorId: 20,
      themeId: 5,
    },
    {
      indicatorId: 21,
      themeId: 5,
    },
    {
      indicatorId: 22,
      themeId: 5,
    },
    {
      indicatorId: 23,
      themeId: 5,
    },
    {
      indicatorId: 24,
      themeId: 4,
    },
    {
      indicatorId: 25,
      themeId: 2,
    },
    {
      indicatorId: 26,
      themeId: 2,
    },
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
