import * as React from 'react'

export const ScuffedInfo = () => {
  React.useEffect(() => {
    let loadInterval: any;

    loadInterval = setInterval(() => {

      let text = "Mint soon!!!";
      let delay = 200;
      let h1 = document.getElementById("scuffedInfoText");

      if(h1) {
        if (loadInterval) {
          clearInterval(loadInterval);
        }

        h1.innerHTML = text
        .split("")
        .map(letter => {
          console.log(letter);
          return `<span>` + letter + `</span>`;
        })
        .join("");

        Array.from(h1.children as HTMLCollectionOf<HTMLElement>).forEach((span, index) => {
          span.classList.add("wavy");
          span.style.animationDelay = -0 + 30*index + "ms";
        });
      }
      
    }, 2000);

    return function cleanup() {
      if (loadInterval) {
        clearInterval(loadInterval);
      }
    };
  }, []);


  return <div>
    <div className="gen-container center-insides lightly-padded">
      <h1 className="wavy" id="scuffedInfoText">
      </h1>
    </div>
  </div>
}