# Accessible status messages

Single-page apps can be very dynamic. They often make lots of small requests that update different parts of the page. It's important to keep the user updated with what's happening—for example that some data is loading, or that a submission failed.

## Updating all users

It's important that all our users can access all the information in our app. Dynamic updates (where a part of the page has its content changed with JavaScript) may be visually obvious, but not to someone who can't see the page.

To ensure that users of assistive technology (like screenreaders) have access to status messages we can use [live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

Setting the `aria-live` attribute exposes any content changes to assistive technology. This means a screenreader will read out the new content whenever the element is updated. You can use `aria-live="polite"` for most messages, and `aria-live="assertive"` for important alerts that should interrupt the user immediately.

**Note**: live regions only work if they are already on the page before their content is updated. If you create one dynamically with content already inside there's no guarantee it'll be read out.

## Setup

1. Clone this repo
1. `npm install`
1. `npm run dev`

Open http://localhost:8080 in your browser. You should see a grid of dogs load.

## Part 1: Loading messages

Our API request to get the dogs takes a few seconds to complete. While its loading the user has no idea what's happening—they just see a blank screen.

We should render a loading message so the user knows what's happening.

### Challenge 1

1. Render a live region inside the `dogsGridEl`
1. Append a loading message to the live region when you start fetching the dogs
1. Remove the live region when the fetch completes successfully

<details>
<summary>Solution</summary>

```js
const dogsGridEl = h("div", { className: "grid" });
const dogsStatusEl = h("div", { "aria-live": "polite" });
dogsGridEl.append(dogsStatusEl);

// ...

dogsStatusEl.append("Loading dogs...");
getDogs().then((dogs) => {
  dogsStatusEl.remove();
  const dogEls = dogs.map(Dog);
  dogsGridEl.append(...dogEls);
});
```

</details>

Now you should see a loading message appear while the dogs are being fetched, then disappear when the dog grid renders.

## Part 2: error messages

Each dog has a delete button to remove it from the page. Unfortunately this request fails 50% of the time. When it does the user receives no feedback—the dog just doesn't disappear.

We should catch this error and show a relevant error message to the user. Error messages are usually important and should probably be "assertive" live regions.

This message shouldn't be permanent, since the user may want to try again. We can use [`window.setTimeout`](https://www.w3schools.com/jsref/met_win_settimeout.asp) to remove the message after a few seconds.

### Challenge 2

1. Add an empty live region after the delete button
1. Add a catch to the `deleteDog` call
1. Update the live region with a message telling the user what went wrong
1. Use a timeout to remove the message after 5 seconds

<details>
<summary>Solution</summary>

```js
function Dog({ id, name, image }) {
  const status = h("div", { "aria-live": "assertive" });
  return h(
    // ...
    h("h3", {}, name, DeleteButton({ id, name }), status)
    // ...
  );
}

// ...
function DeleteButton({ id, name }) {
  // ...
  onclick: (event) => {
    // ...
    deleteDog(id)
      .then(() => button.parentElement.parentElement.remove())
      .catch((error) => {
        console.log(error);
        // update the next element (the live region)
        button.nextElementSibling.textContent = `Something went wrong deleting ${name}`;
        window.setTimeout(() => {
          button.nextElementSibling.textContent = "";
        }, 5000);
      });
  };
  // ...
}
```

</details>

Now when deleting a dog fails you should see an error message appear next to the button, then disappear after 5 seconds.

## Part 3: global notifications

It's often useful to have a way to notify the user about things that happen as they're using the app. A common pattern for this is a "toast" or "snackbar". This is a message box that pops up from the bottom of the screen, waits for a few seconds, then disappears again.

We could use this pattern to tell the user when deleting a dog failed, so we don't have message popping in all over the place in our UI.

First we need to create a container for our notifications, then use CSS to position it at the bottom of the viewport so it's always visible on top of the other elements.

### Challenge 3

1. Render a live region at the bottom of the page
   - Put some text inside for now so you can see it
1. Add a className so you can style it
1. Open `styles.css` and position the element at the bottom of the viewport

<details>
<summary>Solution</summary>

```js
// app.js

const notificationsEl = h(
  "div",
  { "aria-live": "assertive", className: "notify" },
  "Some fake error message"
);

// ...

app.append(dogsGridEl, notificationsEl);
```

```css
/* styles.css */

.notify {
  /* position relative to the viewport */
  position: fixed;
  /* as wide as its content requires */
  width: max-content;
  /* 2rem from the bottom of the viewport */
  bottom: 2rem;
  left: 0;
  right: 0;
  /* centered */
  margin: 0 auto;

  /* make it pretty, not required */
  padding: 1rem 2rem;
  box-shadow: 0 2px 2px hsla(200, 10%, 20%, 0.4), 0 6px 16px -2px hsla(200, 10%, 20%, 0.4);
  border-radius: 0.125rem;
  background-color: var(--bg);
}
```

</details>

Now we need to only show this message when an error occurs. It's going to pop up from the bottom, which means it needs to start off [translated](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY) off screen.

To show the message we should update the notifications element's text content, then toggle an `active` class so we can use CSS to translate the element back to its original position.

### Challenge 4

1. Remove the test message from the notification element
1. Write a `notify` function that takes a message as its argument
1. It should:
   - update the text content of the notification element
   - set a class of `active` on the notification element
   - use `setTimeout` to remove the `active` class after 5 seconds
1. Update your CSS so the notification element starts translated off the bottom of the viewport
1. When the `active` class is applied it should be translated back to its original position
1. Bonus: use [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) to make the translation animate
1. Use `notify` in your delete button `.catch` instead of the existing error handling

<details>
<summary>Solution</summary>

```js
function notify(message) {
  // show message on page
  // .active class makes element slide up from bottom
  notificationsEl.classList.add("active");
  notificationsEl.textContent = message;
  // after 5s hide message again
  window.setTimeout(() => {
    notificationsEl.classList.remove("active");
  }, 5000);
}

// ...
function DeleteButton({ id, name }) {
  // ...
  onclick: (event) => {
    // ...
    deleteDog(id)
      .then(() => button.parentElement.parentElement.remove())
      .catch((error) => {
        console.log(error);
        notify(`Something went wrong deleting ${name}`);
      });
  };
  // ...
}
```

```css
/* styles.css */

.notify {
  /* ... */

  /* initially slide it down off screen by its height + 2rem (the distance from the bottom) */
  transform: translateY(calc(100% + 2rem));
  /* this animates any changes to the translate */
  transition: transform 0.3s;
}

.notify.active {
  transform: translateY(0);
}
```

</details>

Now when a delete error occurs you should see a message pop up from the bottom of the screen, then slide back down after 5 seconds.
