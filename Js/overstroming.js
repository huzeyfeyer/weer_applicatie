document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('dagGrafiek').getContext('2d');

    const uren = ["06u", "07u", "08u", "09u", "10u", "11u", "12u", "13u", "14u", "15u"];
    const neerslag = [0.0, 0.2, 0.5, 1.0, 2.3, 4.1, 5.8, 3.2, 2.0, 1.1]; // voorbeelddata
    const overstromingsgrens = Array(uren.length).fill(5.0); // grens bij 5mm/uur

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: uren,
            datasets: [
                {
                    label: "Neerslag (mm)",
                    data: neerslag,
                    borderColor: "blue",
                    fill: true,
                    backgroundColor: "rgba(0,0,255,0.1)"
                },
                {
                    label: "Overstromingsgrens (5 mm)",
                    data: overstromingsgrens,
                    borderColor: "red",
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Neerslag in mm" }
                },
                x: {
                    title: { display: true, text: "Uur van de dag" }
                }
            },
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Neerslagverloop per uur (voorbeeld)'
                }
            }
        }
    });
});
