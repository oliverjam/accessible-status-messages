import h from "./create-element.js";
import { getDogs, deleteDog } from "./api.js";

const dogsGridEl = h("div", { className: "grid" });
const dogsStatusEl = h("div", { "aria-live": "polite" });
dogsGridEl.append(dogsStatusEl);

// render the initial UI to the page
const app = document.querySelector("#app");
app.append(dogsGridEl);

getDogs().then((dogs) => {
  const dogEls = dogs.map(Dog);
  dogsGridEl.append(...dogEls);
});

// takes a dog object as its argument
function Dog({ id, name, image }) {
  return h(
    "div",
    { className: "dog" },
    h("h3", {}, name, DeleteButton({ id, name })),
    h("img", { src: image, alt: "", width: 400, height: 400 })
  );
}

function DeleteButton({ id, name }) {
  return h(
    "button",
    {
      "aria-label": `Delete ${name}`,
      onclick: (event) => {
        const button = event.currentTarget;
        deleteDog(id).then(() => button.parentElement.parentElement.remove());
      },
    },
    h("img", { src: "trash.svg", width: 24, height: 24, alt: "" })
  );
}
