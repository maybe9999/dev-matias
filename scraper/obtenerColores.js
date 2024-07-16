const puppeteer = require("puppeteer");

const scrape = async url => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultTimeout(120000);
    page.setDefaultNavigationTimeout(120000);
    await page.goto(url);

    const elements = await page.evaluate(() => {
        const query = (selector, root = document) =>
            Array.from(root.querySelectorAll(selector));

        const scrapePalette = palette =>
            query('.place span', palette).map(colorElement => colorElement.innerText);

        const isNotBlank = string => string.trim().length > 0;
        const doesNotHaveBlankElements = elements => elements.every(isNotBlank);

        return query('.palette')
            .map(scrapePalette)
            .filter(doesNotHaveBlankElements);
    });

    await browser.close();

    return elements;
}

const obtenerColores = async (pagina) => {
    try {
        const palette = await scrape(pagina);
        return {
            newPalette: palette
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    obtenerColores
};
