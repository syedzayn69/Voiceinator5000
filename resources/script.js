const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value

function populateVoices(){
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
  .filter(voice => voice.lang.includes('en'))
  .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
  )
  .join('')
}

function toggle(){
  speechSynthesis.cancel(msg)
  speechSynthesis.speak(msg)
}
function stop(){
  speechSynthesis.cancel(msg)
}

function setVoice(){
  msg.voice = voices.find(elem => this.value === elem.name)
  toggle()
}

function sliderChange(){
  msg[this.name] = this.value
  toggle()
}

speechSynthesis.addEventListener('voiceschanged',populateVoices)
voicesDropdown.addEventListener('change', setVoice)
speakButton.addEventListener('click',toggle)
stopButton.addEventListener('click',stop)
msg.addEventListener('change',null)

options.forEach(elem => {
  elem.addEventListener('change', sliderChange)
})

