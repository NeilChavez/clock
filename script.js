function clock() {
  const d = document,
    $hours = d.querySelector(".hours"),
    $minutes = d.querySelector(".minutes"),
    $seconds = d.querySelector(".seconds"),
    $clockNumbers = d.querySelector(".clock-numbers"),
    $dayMonth = d.querySelector(".day-month"),
    monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    
  startClock();

  function startClock() {
    const now = new Date(),
      hour = now.getHours(),
      minutes = now.getMinutes(),
      seconds = now.getSeconds();

    const ratioSeconds = seconds / 60,
      ratioMinutes = (minutes + ratioSeconds) / 60,
      ratioHour = (hour + ratioMinutes) / 12;

    $seconds.style.setProperty("--rotation", ratioSeconds * 360);
    $minutes.style.setProperty("--rotation", ratioMinutes * 360);
    $hours.style.setProperty("--rotation", ratioHour * 360);

    writeHours();
    writeMonth();

    function writeHours() {
      let meridian = hour > 12 ? "PM" : "AM";

      $clockNumbers.textContent = `
         ${hour > 12 ? hour - 12 : hour}:
          ${minutes < 10 ? "0" + minutes : minutes} ${meridian}`;
    }
    function writeMonth() {
      const indexMonth = now.getMonth(),
        indexDay = now.getDay(),
        date = now.getDate();
      $dayMonth.innerHTML = ` ${dayNames[indexDay]}, ${monthNames[indexMonth]} <span class="date">${date}</span>`;
    }
  }

  setTimeout(() => {
    startClock();
    clock();
  }, 1000);
}

function darkTheme(btn, classDark) {
  const d = document,
    $themeBtn = d.querySelector(btn),
    $selectors = d.querySelectorAll("[data-dark]");

  d.addEventListener("click", (e) => {
    if (e.target === $themeBtn) {
      $selectors.forEach((el) => {
        if (el.classList.contains(classDark)) {
          el.classList.remove(classDark);
          $themeBtn.textContent = `Dark Mode`;
          localStorage.setItem("dark-mode", "false");
        } else {
          el.classList.add(classDark);
          $themeBtn.textContent = `Light Mode`;
          localStorage.setItem("dark-mode", "true");
        }
      });
    }
  });

  if (localStorage.getItem("dark-mode") === "true") {
    $selectors.forEach((el) => {
      el.classList.add(classDark);
    });
  }
  if (localStorage.getItem("dark-mode") === "false") {
    $selectors.forEach((el) => {
      el.classList.remove(classDark);
    });
  }
}

clock();
darkTheme(".btn-dark-mode", "dark-mode");
