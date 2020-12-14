const main = async () => {
  let url = "http://swapi.dev/api/people/";
  const data = await (await fetch(url)).json();
  let result = data.results;

  let numchar = result.length;
  for (let i = 1; i <= numchar; i++) {
    let nextUrl = `${url}${i}`;

    await fetch(nextUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let para = document.createElement("p");
        para.innerHTML = data.name;

        let image = document.createElement("img");

        image.src = `img/starwar_${i}.png`;
        let ele = document.createElement("li");
        ele.className = "info";
        let greett = document.querySelector(".characters");

        ele.appendChild(image);
        ele.appendChild(para);
        greett.appendChild(ele);
        ele.id = i;

        ele.addEventListener("click", (e) => {
          let modal = document.querySelector("#great");
          modal.style.display = "flex";
          document.querySelector(".close").addEventListener("click", () => {
            document.querySelector("#great").style.display = "none";
          });

          window.onclick = (e) => {
            if (e.target == modal) {
              modal.style.display = "none";
            }
          };

          let eleid = e.target.parentElement.id;
          let p = parseInt(e.target.id);
          if (e.target.id > 0) {
            eleid = p;
          }
          fetch(`${url}${eleid}`)
            .then((response) => {
              return response.json();
            })
            .then((newData) => {
              let names = document.querySelector("#name");
              names.innerHTML = `Name: ${newData.name}`;
              let genders = document.querySelector("#gender");
              genders.innerHTML = `Gender: ${newData.gender}`;
              let heights = document.querySelector("#heights");
              heights.innerHTML = `Heights: ${newData.height}`;
              let masss = document.querySelector("#mass");
              masss.innerHTML = `Mass: ${newData.mass}`;
              let skin_colors = document.querySelector("#skin_color");
              skin_colors.innerHTML = `Skin Color: ${newData.skin_color}`;
            });
        });
      });
  };
};

main();
