import "./style.css";
import TempList from "./TempList";

const tempList = new TempList();

const dayInput = document.getElementById("dayInput") as HTMLInputElement | null;
const tempInput = document.getElementById("tempInput") as HTMLInputElement | null;
const addForm = document.getElementById("addForm") as HTMLFormElement | null;
const table = document.getElementById("data") as HTMLTableElement | null;

if (dayInput) {
  dayInput.value = new Date().toISOString().slice(0, 10);
}

fetch(
  "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json",
)
  .then((response) => response.json())
  .then((myJson: Record<string, any> | null) => {
    if (!myJson) return;

    Object.values(myJson).forEach((element) => tempList.add(element));
    writeTable();
  });

addForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!dayInput || !tempInput) return;

  const temperature = Number(tempInput.value);
  if (!tempInput.value || Number.isNaN(temperature)) return;

  const dayOfWeek = new Date(dayInput.value).toLocaleDateString("en-US", { weekday: "long" });
  tempList.add({
    day: dayOfWeek,
    temperature,
  });

  writeTable();
  tempInput.value = "";
});



function writeTable() {
  if (!table) return;

  let rows = "";

  tempList.temps.forEach((element) => {
    let className = "";

    if (element.temperature < 10) {
      className = "under10";
    } else if (element.temperature >= 30) {
      className = "over29";
    }

    rows += `
      <tr class="${className}">
        <td>${element.day}</td>
        <td>${element.temperature}</td>
      </tr>
    `;
  });

  table.innerHTML = `
    <tr>
      <th>Nap</th>
      <th>Hőmérséklet</th>
    </tr>
    ${rows}
  `;
}