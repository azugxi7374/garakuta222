import fetch from 'node-fetch'
import jsdom from 'jsdom'

async function main() {
    // TODO
    const user = 'azugxi7374'

    const url = `https://github.com/${user}`;
    const f = fetch(url);

    const res = await f;
    const text = await res.text();

    const dom = new jsdom.JSDOM(text);

    const a = Array.from(dom.window.document.querySelectorAll('rect.ContributionCalendar-day'))

    const commitCounts = a.map(e => e.dataset.count)

    let current = 0;

    while (current < commitCounts.length) {
        if (commitCounts[commitCounts.length - 1 - current] == 0) {
            break;
        } else {
            current++;
        }
    }
    console.log({ current });
    // const longest = 0;
    // const current = 0;



    // console.log(text);
}
main();