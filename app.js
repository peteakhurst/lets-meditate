const app = () => {

  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  //Sounds
  const sounds = document.querySelectorAll('.sound-picker button');

  // Time Display
  const timeDisplay = document.querySelector('h3');
  const timeSelect = document.querySelectorAll('.time-select button');

  //get length of outline
  const outlineLength = outline.getTotalLength();

  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;



  sounds.forEach(sound => {
    sound.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  })

  // Play Sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  // Select Sound

  timeSelect.forEach(option => {
    option.addEventListener('click', function() {
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60 )} : ${Math.floor(fakeDuration % 60)} `
    });
  });

  // stop and play sound

  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  // animate circle and time

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);


    // animte the circle

    let progess = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progess;

    // animate text

    timeDisplay.textContent = `${minutes} : ${seconds} `;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      vide.pause();

    }

  }

}
app();