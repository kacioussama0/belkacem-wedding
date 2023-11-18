let countDownDate = new Date("Novomber 30, 2023 16:00:00").getTime();
// console.log(countDownDate);

let counter = setInterval(() => {
    // Get Date Now
    let dateNow = new Date().getTime();

    // Find The Date Difference Between Now And Countdown Date
    let dateDiff = countDownDate - dateNow;

    // Get Time Units
    // let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
    let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

    document.querySelector("#day").innerHTML = days < 10 ? `0${days}` : days;
    document.querySelector("#hour").innerHTML = hours < 10 ? `0${hours}` : hours;
    document.querySelector("#minute").innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector("#second").innerHTML = seconds < 10 ? `0${seconds}` : seconds;

    if (dateDiff < 0) {
        clearInterval(counter);
    }
}, 1000);


const Confettiful = function(el) {

    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E','#EFFF1D'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this._setupElements();
    this._renderConfetti();
};

Confettiful.prototype._setupElements = function() {

    const containerEl = document.createElement('div');
    const elPosition = this.el.style.position;

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
        this.el.style.position = 'relative';
    }

    containerEl.classList.add('confetti-container');

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function() {
    this.confettiInterval = setInterval(() => {
        const confettiEl = document.createElement('div');
        const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
        const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
        const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
        const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

        confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
        confettiEl.style.left = confettiLeft;
        confettiEl.style.width = confettiSize;
        confettiEl.style.height = confettiSize;
        confettiEl.style.backgroundColor = confettiBackground;

        confettiEl.removeTimeout = setTimeout(function() {
            confettiEl.parentNode.removeChild(confettiEl);
        }, 3000);

        this.containerEl.appendChild(confettiEl);
    }, 25);
};

window.confettiful = new Confettiful(document.querySelector('.js-container'));


let audio = new Audio('/baraka.mp3');

audio.addEventListener("canplaythrough", () => {
    audio.play().catch(e => {
        window.addEventListener('click', () => {
            audio.play()
        }, { once: true })
    })
});

