function AwesomeButton() {
  this.BUTTON_TYPE_LIGHT = 'far fa-lightbulb'
  this.BUTTON_TYPE_LIGHTON = 'fas fa-lightbulb'
  this.BUTTON_TYPE_NIGHT = 'far fa-moon'
  this.BUTTON_TYPE_NIGHTON = 'fas fa-moon'
  this.BUTTON_TYPE_SUN = 'far fa-sun'
  this.BUTTON_TYPE_SUNON = 'fas fa-sun'
  this.BUTTON_TYPE_EYEON = 'fas fa-eye'
  this.BUTTON_TYPE_EYEOFF = 'fas fa-low-vision'
  this.BUTTON_TYPE_SIZE = 'fas fa-ruler-vertical'
  this.BUTTON_TYPE_TEMPERATURE = 'fas fa-thermometer-half'
  this.BUTTON_TYPE_ACIDITY = 'fas fa-vial'
  this.BUTTON_TYPE_HUMIDITY = 'fas fa-tint'
  this.BUTTON_TYPE_CANNA = 'fas fa-cannabis'
  this.BUTTON_TYPE_WATER = 'fas fa-water'
  this.BUTTON_TYPE_OPTIONS = 'fas fa-tools'
  this.BUTTON_TYPE_CALENDAR = 'far fa-calendar-alt'
}
AwesomeButton.prototype.getIcon = function(buttonType){
  let i = document.createElement('i')
  i.className = buttonType + ' fa-3x';
  return i;
}
AwesomeButton.prototype.makeButton = function(buttonType){
  let bt = document.createElement('button')
  bt.className = 'btn btn-primary';
  let i = document.createElement('i')
  i.className = buttonType + ' fa-3x';
  bt.appendChild(i)
  return bt;
}

module.exports = AwesomeButton;
