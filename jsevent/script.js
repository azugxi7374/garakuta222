document.addEventListener('DOMContentLoaded', () => {
    const [d1, d2, d3] = "div1 div2 div3".split(" ").map(id => document.getElementById(id));
    const mes = document.querySelector('.message');

    [d1, d2, d3].forEach(d => {
        d.addEventListener('click', (e) => {
            if (d.id === d2.id) {
                e.stopPropagation();
            }
            mes.innerHTML += `<p>${d.id} is clicked!</p>`
        });
    });
});