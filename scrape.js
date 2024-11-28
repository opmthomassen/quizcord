import puppeteer from "puppeteer";

const scrapeMossKulturhus = async () => {
  // Start Puppeteer og åpne en ny side
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Gå til programmet for Moss Kulturhus
    await page.goto("https://www.mosskulturhus.no/program/", {
      waitUntil: "domcontentloaded",
    });

    // Vent til arrangementene er lastet inn
    const eventSelector = ".grid a"; // Juster hvis nødvendig
    await page.waitForSelector(eventSelector);

    // Hent ut alle lenker
    const links = await page.$$eval(eventSelector, (anchors) =>
      anchors.map((anchor) => ({
        text: anchor.textContent.trim(),
        href: anchor.href,
      }))
    );

    console.log("Arrangement-lenker:");
    links.forEach((link) => console.log(`${link.text}: ${link.href}`));
  } catch (error) {
    console.error("Noe gikk galt:", error);
  } finally {
    // Lukk nettleseren
    await browser.close();
  }
};

// Kjør skriptet
scrapeMossKulturhus();
