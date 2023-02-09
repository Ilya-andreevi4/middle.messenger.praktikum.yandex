import friendsData from "../../../../data/friends-data";
import Handlebars from "handlebars";

function setup_helper() {
  Handlebars.registerHelper("print_person", function() {
    return this.name + " " + this.lastName;
  });
}
function render() {
  setup_helper();
  const template = Handlebars.compile(
    document.querySelector("#friends-container")?.innerHTML
  );

  const filled = template({ friends: friendsData.people });
  console.log(filled);
  console.log(friendsData);

  const container = document.querySelector("#friends-container");
  if (container) {

    container.innerHTML = filled;
  }

}

render();
