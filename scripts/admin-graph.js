const bar = document.getElementById("bar-chart");
new Chart(bar, {
  type: "bar",
  data: {
    labels: [
      "Jakarta",
      "Bogor",
      "Bandung",
      "Surabaya",
      "Jogjakarta",
      "Semarang",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [20, 15, 18, 11, 9, 4],
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const donat = document.getElementById("doughnut-chart");
new Chart(donat, {
  type: "doughnut",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const line = document.getElementById("line-chart");
new Chart(line, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const select = document.getElementById("chart-selector");
select.addEventListener("change", function (e) {
  const selected = e.target.value;

  ["bar", "doughnut", "line"].forEach((type) => {
    const wrapper = document.getElementById(`${type}-div`);
    wrapper.classList.toggle("hidden", type !== selected);
  });
});
