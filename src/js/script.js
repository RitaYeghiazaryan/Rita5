const output = document.getElementById("output");

for (let i = 1; i < 10; i++) {
  for (let k = 1; k < 10; k++) {
    output.innerHTML += `${i} * ${k} = ${i * k} <br>`;
  }
  output.innerHTML += "<hr>";
}
