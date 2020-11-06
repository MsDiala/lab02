'use strict';

function Pets(items) {
  this.image_url = items.image_url;
  this.title = items.title;
  this.description = items.description;
  this.keyword = items.keyword;
}

Pets.prototype.render = function () {
  let petClone = $('#section').clone();
  $('main').append(petClone);
  petClone.html(
    `<div class = "${this.keyword}">
      <h1 class = "h1">${this.title}</h1>
      <img src="${this.image_url}" class = "img">
      <p class = "p">${this.description}</p>
      </div>`
  )
};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
  data.forEach(all_pets => {
    let pet = new Pets(all_pets);
    pet.render();
    let selectOptions = $(`<option value = "${all_pets.keyword}">${all_pets.keyword}</option>`);
    $('select').append(selectOptions)
  });
});

$('select').change(show => {
  let showPicture = show.target.value;
  $('div').css({
    'display':'none'
  });
  $(`.${showPicture}`).fadeIn(1000);
})
