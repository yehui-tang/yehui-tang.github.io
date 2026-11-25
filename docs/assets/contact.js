const emailToggle = document.getElementById('email-toggle');
const emailLink = document.getElementById('email-contact');

// Decode only on activation so plain-text and mailto harvesters miss the address.
const encodedAddress = [62, 47, 51, 58, 53, 27, 41, 40, 50, 60, 62, 58, 41, 117, 35, 34, 33];

emailToggle.addEventListener('click', event => {
  if (!event.isTrusted) return;

  if (emailLink.hidden) {
    const address = String.fromCharCode(...encodedAddress.map(byte => byte ^ 91));
    emailLink.textContent = address;
    emailLink.href = 'mailto:' + address;
    emailLink.hidden = false;
  } else {
    emailLink.hidden = true;
    emailLink.removeAttribute('href');
    emailLink.textContent = '';
  }
  emailToggle.setAttribute('aria-expanded', String(!emailLink.hidden));
});

emailToggle.hidden = false;
