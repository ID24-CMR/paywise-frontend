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