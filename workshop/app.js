import h from "./create-element.js";
import { getDogs } from "./api.js";

// render the initial UI to the page
const app = document.querySelector("#app");
app.append(DogsList());

getDogs().then((dogs) => {
  app.innerHTML = "";
  app.append(DogsList(dogs));
});

function DogsList(dogs) {
  if (!dogs) return "";
  // create an array of dog elements using the Dog function below
  const dogEls = dogs.map(Dog);
  return h("ul", { className: "grid" }, ...dogEls);
}

// takes a dog object as its argument
function Dog({ name, image }) {
  return h(
    "li",
    {},
    h("h3", {}, name),
    h("img", { src: image, alt: "", width: 400, height: 400 })
  );
}
