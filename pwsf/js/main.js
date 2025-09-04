async function loadData() {
	try{
		// Fetch JSON files 
		const incomeResponse = await fetch("income.json");
		const expensesResponse = await fetch("expenses.json");

		const income = await incomeResponse.json();
		const expenses = await expensesResponse.json();

		//Build summary 
		let summary = {};

		//insert salaries
		income.forEach(entry => {
			if(!summary[entry.month]) {
				summary[entry.month] = { salary: 0, rent: 0, debt: 0, sport: 0, dresses: 0};
			}
			summary[entry.month].salary += entry.salary;
		});

		//Insert expenses
		expenses.forEach(entry => {
			if(!summary[entry.month]) {
				summary[entry.month] = { salary: 0, rent: 0, debt: 0, sport: 0, dresses: 0};
			}
			summary[entry.month][entry.category] += entry.amount;
		});

		//display in table 
		const table = document.getElementById("summary-table");
		for (let month in summary) {
			const row = document.createElement("tr");
			row.innerHTML = 
			`<td>${month}</td>
			<td>${summary[month].salary}</td>
			<td>${summary[month].rent}</td>
			<td>${summary[month].debt}</td>
			<td>${summary[month].sport}</td>
			<td>${summary[month].dresses}</td>
			<td>${summary[month].netFlix}</td>
		`;
		table.appendChild(row);
		}
		catch(error) {
			console.error("Error laoding JSON", error);
		}
	}
}

// run when the page loads
document.getElementById("DOMContentLoaded", loadData);


function validateForm() {
	const month = document.forms["income"]["month"].value;
	const month = document.forms["income"]["salary"].value;
	const month = document.forms["income"]["year"].value;
	const errorMsg = document.getElementById("error-msg");

	if (!month || !salary || !year) {
		errorMsg.textContent = "All fiels are required.";
		return false;
	}

	if (isNaN(salary) || isNaN(year)) {
		errorMsg.textContent = "Salary and Year must be numbers.";
		return false;
	}

	if (year < 1900 || year > 2100) {
		errorMsg.textContent = "Year must be between 1900 and 2100";
		return false
	}

	errorMsg.textContent = "";

	windows.location.href = "dashboard.html";
	return false;
}