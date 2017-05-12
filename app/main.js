import "./styles/main.scss";

console.log("HELLO WORLD!!!");

document.getElementById("test").innerHTML = "HELLO WORLD";

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
  if (module.hot) {
    module.hot.accept();
  }
}