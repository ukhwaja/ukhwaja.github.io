let isToggle = false;

const toggleMenu = () => {
  const slideHideElms = document.querySelectorAll('.slide-hide');
  if (!isToggle) {
    document.querySelector('.menu-button').classList.add('open');
    document.querySelector('.menu-overlay').style.transform = 'translateY(0)';
    document.querySelector('.menu-overlay').style.zIndex = '6';
    document.getElementById('main').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('stuff').style.display = 'none';
    [].forEach.call(slideHideElms, (elm) => {
      elm.style.transform = 'translateY(-3rem)';
      elm.style.opacity = '0';
      elm.style.visibility = 'hidden';
    });
    isToggle = true;
  } else {
    document.querySelector('.menu-button').classList.remove('open');
    document.querySelector('.menu-overlay').style.transform = 'translateY(-100vh)';
    document.querySelector('.menu-overlay').style.zIndex = '-1';
    document.getElementById('main').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
    document.getElementById('stuff').style.display = 'block';
    [].forEach.call(slideHideElms, (elm) => {
      elm.style.transform = 'translateY(0)';
      elm.style.opacity = '1';
      elm.style.visibility = 'visible';
    });
    isToggle = false;
  }
};

const rateMe = () => {
  let int = 0;
  const lists = document.querySelectorAll('.skill');
  [].forEach.call(lists, (el) => {
    const rate = parseInt(el.getAttribute('rating'), 10);
    const span = document.createElement('span');
    el.appendChild(span);
    span.classList.add('rating');
    int = 0;
    while (int < rate) {
      const star = document.createElement('i');
      star.classList.add('fa');
      star.classList.add('fa-star');
      star.setAttribute('aria-hidden', 'true');
      span.appendChild(star);
      int += 1;
    }
    int = 0;
    while (int < 5 - rate) {
      const star = document.createElement('i');
      star.classList.add('far');
      star.classList.add('fa-star');
      star.setAttribute('aria-hidden', 'true');
      span.appendChild(star);
      int += 1;
    }
  });
};

const revealAll = () => {
  const whatsapp = document.getElementById('whatsapp');
  const email = document.getElementById('email');
  const twitter = document.getElementById('twitter');
  whatsapp.innerHTML = '687 4706';
  whatsapp.parentElement.setAttribute('href', 'whatsapp://send?text=Hello World!&phone=+19736874706');
  whatsapp.parentElement.style.cursor = 'pointer';
  email.innerHTML = 'uak';
  email.parentElement.setAttribute('href', 'mailto:uak@njit.edu');
  email.parentElement.style.cursor = 'pointer';
  twitter.innerHTML = 'numbfall';
  twitter.parentElement.setAttribute('href', 'https://twitter.com/numbfall');
  twitter.parentElement.style.cursor = 'pointer';
  document.querySelector('.caution').style.display = 'inline-block';
};

const showRecaptcha = () => {
  if (document.getElementById('g-recaptcha').style.display !== 'flex') {
    document.getElementById('g-recaptcha').style.display = 'flex';
    document.querySelector('.info a').classList.remove('shake');
  } else {
    document.getElementById('g-recaptcha').style.display = 'none';
  }
};

const scrollToMiddle = () => {
  const element = document.getElementById('contacts');
  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset + 200;
  const middle = absoluteElementTop - window.innerHeight / 2;
  window.scroll({
    top: middle,
    left: 0,
    behavior: 'smooth'
  });
};

const verifyCallback = (token) => {
  setTimeout(() => {
    if (document.getElementById('g-recaptcha')) {
      document.getElementById('g-recaptcha').remove();
    }
  }, 600);
  scrollToMiddle();
  const info = document.querySelector('.info a');
  info.classList.add('disabled');
  info.removeAttribute('href');
  info.innerHTML = '<i class="fa fa-fw fa-check-circle fa-lg"></i>&nbsp;Contacts unredacted&nbsp;';
  revealAll();
};

var onloadCallback = () => grecaptcha.render('g-recaptcha', {
  'sitekey': '6LfUyRwUAAAAACXG2B6PtvpeBRp8qlRFVB7wrd_A',
  'callback': verifyCallback
});

const touchTips = () => {
  const abbrs = document.querySelectorAll('main abbr');
  [].forEach.call(abbrs, (abbr) => abbr.addEventListener('touchstart', () => {
    abbr.classList.add('touched');
    setTimeout(() => {
      abbr.classList.remove('touched');
    }, 2000);
  }));
};

const calcAge = () => {
  const parsed = Date.parse(Date()) - Date.parse('April 22, 1988');
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const years = days * 365;
  const end = Math.round(parsed / years);
  document.getElementById('age').innerHTML = end;
};

const addTouch = () => document.documentElement.classList.remove('no-touch');

const onloadFonts = () => WebFont.load({
  google: {
    families: ['Inconsolata:400,700', 'Vollkorn:400,400i,700,700i', 'Vollkorn+SC:400,700']
  }
});

const scrollDown = () => document.getElementsByTagName('main')[0].scrollIntoView({
  behavior: 'smooth',
  block: 'start'
});

const scrollUp = () => window.scroll({
  top: 0,
  left: 0,
  behavior: 'smooth'
});

const ready = () => {
  touchTips();
  calcAge();
  rateMe();
};

document.addEventListener('DOMContentLoaded', ready, {
  capture: false
});
document.addEventListener('touchstart', addTouch, {
  capture: false,
  passive: true,
  once: true
});