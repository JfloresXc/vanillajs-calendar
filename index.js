const calendar = document.querySelector(".calendar");

const renderYear = ({ year, language }) => {
	// GET NAME MONTHS
	const intlMonths = new Intl.DateTimeFormat(language, { month: "long" });
	const monthsKey = [...Array(12).keys()];

	// GET DAYS OF WEEK
	const intlDaysOfWeek = new Intl.DateTimeFormat(language, {
		weekday: "long",
	});
	const daysOfWeeks = [...Array(7).keys()];

	const getDaysName = daysOfWeeks.map((nameKey) => {
		const dayName = intlDaysOfWeek.format(
			new Date(2021, 10, nameKey + 1)
		);
		return dayName;
	});

	// GET DAYS OF MONTH
	const renderDaysOfMonth = ({ numberOfDays, startDay, findedDateNow }) => {
		const daysKey = [...Array(numberOfDays).keys()];
		const dayNow = new Intl.DateTimeFormat(language, {
			day: "numeric",
		}).format(new Date());

		return daysKey
			.map((dayKey) => {
				const nextDayKey = dayKey + 1;
				const fistDayAtributtes = `style="--startDay : ${startDay}" class="month__firstDay" `;

				return `<li 
                    ${nextDayKey === 1 ? fistDayAtributtes : ""}
                    class = ${
					findedDateNow &&
					nextDayKey == dayNow &&
					"month__dayNow"
				}
				}">${nextDayKey}</li>`;
			})
			.join("");
	};

	// GET MONTHS
	const getMonth = ({ monthKey }) => {
		const nextMonthKey = monthKey + 1;
		const monthName = intlMonths.format(new Date(year, monthKey));
		const numberOfDays = new Date(year, nextMonthKey, 0).getDate();
		const startDay = new Date(year, monthKey, 1).getDay();

		return {
			monthName,
			numberOfDays,
			startDay,
		};
	};

	// GET DAY NOW
	const validateDateNow = ({ monthKey }) => {
		const nextMonthKey = monthKey + 1;
		const yearNow = new Intl.DateTimeFormat(language, {
			year: "numeric",
		}).format(new Date());
		if (!(yearNow == year)) return false;

		const monthNow = new Intl.DateTimeFormat(language, {
			month: "numeric",
		}).format(new Date());
		if (!(monthNow == nextMonthKey)) return false;

		return true;
	};

	// RENDER ON HTML
	const renderDaysName = getDaysName
		.map((dayName) => {
			return `<li class="month__dayOfWeek ">${dayName.slice(
				0,
				3
			)}</li>`;
		})
		.join("");

	const renderMonths = monthsKey
		.map((monthKey) => {
			const { monthName, numberOfDays, startDay } = getMonth({
				monthKey,
			});
			const findedDateNow = validateDateNow({ monthKey });

			return `<div class="month">
                <h1 class="month__name">${monthName} - ${year}</h1>
                <ol class="month__list">
                    ${renderDaysName}
                    ${renderDaysOfMonth({
					numberOfDays,
					startDay,
					findedDateNow,
				})}
                </ol>
            </div>`;
		})
		.join("");

	calendar.innerHTML = renderMonths;
};

const scrollMonths = ({ idElement, direction }) => {
	document.getElementById(idElement).addEventListener("click", () => {
		calendar.scrollTo({
			top:
				direction == "down"
					? calendar.scrollTop + window.innerHeight
					: calendar.scrollTop - window.innerHeight,
			behavior: "smooth",
		});
	});
};

scrollMonths({ idElement: "calendar__down", direction: "down" });
scrollMonths({ idElement: "calendar__up", direction: "up" });

renderYear({ year: "2021", language: "es" });
