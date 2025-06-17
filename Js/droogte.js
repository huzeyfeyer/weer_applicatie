document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('dagGrafiek').getContext('2d');

    // grafiek data van de dag
    const uren = ["06u", "07u", "08u", "09u", "10u", "11u", "12u", "13u", "14u", "15u"];
    const neerslag = [0.0, 0.0, 0.1, 0.0, 0.0, 0.0, 0.2, 0.1, 0.0, 0.0];
    const droogtegrens = Array(uren.length).fill(0.1);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: uren,
            datasets: [
                {
                    label: "Neerslag (mm)",
                    data: neerslag,
                    borderColor: "blue",
                    backgroundColor: "rgba(0,0,255,0.1)",
                    fill: true
                },
                {
                    label: "Droogtegrens (0.1 mm)",
                    data: droogtegrens,
                    borderColor: "orange",
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
