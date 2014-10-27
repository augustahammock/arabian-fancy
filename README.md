Arabian Fancy Tack
=========

"Beautiful Tack for the world's most Beautiful Horses"

---

This project is an in-progress app built for Gina Dupree of Arabian Fancy Tack that employs the following (awesome) technologies, among others:

  - NodeJS
  - Express
  - Jade
  - Stylus

Dynamic data is contained in JSON files and is rendered via Jade templates. (No AJAX calls in the JavaScript files!)

This project also makes use of client-side sessionStorage for light data carraige throughout the app.

---

Run this project locally
----

Simply `git clone` this project locally, `cd` into the `arabian-fancy` folder.

Then, run the following:

```sh
npm install
gulp
```

Believe it or not, that's all! You should be able to access the project at `localhost:3000` if everything is running appropriately.

---

To-Dos
----

  - Finish refactoring contact form logic (I'd like to make this more robust on both client-side and server-side)
  - Implement responsive styles