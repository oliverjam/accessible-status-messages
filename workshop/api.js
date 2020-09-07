export function getDogs() {
  return wait(3000).then(() => fakeDogs);
}

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

const fakeDogs = [
  {
    id: 1,
    name: "Luna",
    breed: "Cocker Spaniel",
    image: "https://i.imgur.com/BO6Q2rs.jpg",
    owner: 1,
  },
  {
    id: 3,
    name: "Puggles",
    breed: "pug",
    image: "https://media.giphy.com/media/FbyqoWvEHmV9K/giphy.gif",
    owner: 32,
  },
  {
    id: 4,
    name: "Mary",
    breed: "basset hound",
    image: "https://media.giphy.com/media/d147bQ1DOu2L6/giphy.gif",
    owner: 37,
  },
  {
    id: 5,
    name: "Gary",
    breed: "Toilet Dog",
    image: "https://i.ytimg.com/vi/YEU_FIly708/maxresdefault.jpg",
    owner: 40,
  },
  {
    id: 19,
    name: "Ako",
    breed: "no idea",
    image:
      "https://thumbs-prod.si-cdn.com/4BwT4OsM5fay_fhZ9WDp_vfO-Po=/fit-in/1600x0/https://public-media.si-cdn.com/filer/2b/98/2b98ec47-682d-4844-b3b3-9410263a4f94/gj3m9r.jpg",
    owner: 91,
  },
  {
    id: 20,
    name: "SQL Injection",
    breed: "' OR 1=1",
    image:
      "https://www.insidedogsworld.com/wp-content/uploads/2016/04/maxresdefault-1.jpg",
    owner: 101,
  },
  {
    id: 25,
    name: "Mog",
    breed: "Dog",
    image: "https://media.giphy.com/media/V4iVlA2tScmjK/giphy.gif",
    owner: 114,
  },
  {
    id: 26,
    name: "Koko",
    breed: "Dunno",
    image: "https://media.giphy.com/media/RQSuZfuylVNAY/giphy.gif",
    owner: 113,
  },
  {
    id: 27,
    name: "Boris",
    breed: "Golden lab",
    image: "https://media.giphy.com/media/X6iHMtWzRHVew/giphy.gif",
    owner: 116,
  },
  {
    id: 28,
    name: "Millicent",
    breed: "poodle",
    image: "https://media.giphy.com/media/10Q4wOpmaMVIT6/giphy.gif",
    owner: 116,
  },
  {
    id: 29,
    name: "Borf",
    breed: "french bulldog",
    image: "https://media.giphy.com/media/5bb4l1IGsappuT8MlR/giphy.gif",
    owner: 116,
  },
  {
    id: 39,
    name: "Russell",
    breed: "Jack Russell",
    image: "https://i.ytimg.com/vi/cjtLgiUQqgY/hqdefault.jpg",
    owner: 118,
  },
  {
    id: 40,
    name: "Sun",
    breed: "Yorkshire terrier",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjwaqQUR1yQLLzHKVVVu6zCKum7cZQ88fYohJrlrVonMqrvAhx0d1CMieMLQ&s",
    owner: 122,
  },
  {
    id: 43,
    name: "bobby",
    breed: "dog",
    image: "https://media.giphy.com/media/QvBoMEcQ7DQXK/giphy.gif",
    owner: 126,
  },
  {
    id: 44,
    name: "esjcgv",
    breed: "ehkef",
    image: "https://mytindog.netlify.app/img/doggo.png",
    owner: 127,
  },
];
