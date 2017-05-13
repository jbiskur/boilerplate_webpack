import "./styles/main.scss";
import $ from "jquery";

import ko from "knockout";
import Rx from "rxjs";

import Handlebars from "handlebars";

import template from "./templates/test_template";

console.log(Rx);

console.log(ko);

console.log("HELLO WORLD!!");

$("#test").html("HELLO WORLD");

$("#button").click(function(event) {
  console.log("I was clicked!");
});
const context = { name: "this is a test name!"};
$("#hb").html(template(context));

/* if we are in production link external css file */
if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === "production")
{
  console.log("production mode");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "assets/main.css";
  document.head.appendChild(link);
}
else
{
  console.log("development mode");

  /* enables hot reloading of modules */
  if (module.hot) {
    module.hot.accept();
  }
}