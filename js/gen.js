var l, l1;

const DEBUG = window.location.host.includes('127.0.0.1') || window.location.host.includes('localhost');

const setCopied = (t) => document.getElementById('copy').value = t;
const setShared = (t) => document.getElementById('share').value = t;

const copyToClipboard = (e, link) => {
  e.target.focus();
  if (navigator) {
    try {
      navigator.clipboard.writeText(link);
      setCopied('Copied!');
      setTimeout(() => {
        setCopied('Copy Link');
      }, 5e3);
    } catch (err) {
      console.error(err);
      setCopied('Could Not Copy :(');
      setTimeout(() => {
        setCopied('Copy Link');
      }, 5e3);
    }
  }
};

const share = (e, link) => {
  e.target.focus();
  if (navigator.share)
    navigator
      .share({
        url: link,
      })
      .then((e) => {
        setShared('Shared!');
        setTimeout(() => {
          setShared('');
        }, 5e3);
      })
      .catch((e) => {
        setShared('Could Not Share :(');
        setTimeout(() => {
          setShared('');
        }, 5e3);
      });
};

const setLink = (link) => {
  l = link;
  setSharingLinks(link);
  console.log(link);
};

const setLinkPayTm = (link) => {
  l1 = link;
  setSharingLinksPayTm();
  console.log(link);
};

const handleSubmit = (e, t) => {
  e.preventDefault();

  if (t === 'upi') {
    const v = document.querySelector('input[name=\'upi\']').value;
    const na = document.querySelector('input[name=\'name\']').value;

    const li = `${window.location.protocol}//${window.location.host}/upigen/?upi=${v}&name=${encodeURI(na)}`;
      fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(li)}`)
        .then((d) => d.json())
        .then((_d) => setLink(_d.shorturl))
        .catch((e) => setLink(li));
    setLink(li);
  }
  else if (t === 'paytm') {
    const n = document.querySelector('input[name=\'paytm\']').value;

    if (!n.match(/[0-9]{10}/)) {
      alert("Enter a Valid Number!");
      return;
    }

    const li = `${window.location.protocol}//${window.location.host}/upigen/?paytm=${n}`;
      fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(li)}`)
        .then((d) => d.json())
        .then((_d) => setLink(_d.shorturl))
        .catch((e) => setLink(li));
    setLinkPayTm(li, 'paytm');
  }
};

const setSharingLinks = () => {
  document.querySelector('.wa').href = 'https://wa.me/?text=' + encodeURIComponent('Click to pay: ' + l);
  document.querySelector('.fb').href = 'https://www.facebook.com/share.php?u=' + encodeURIComponent(l);
  document.querySelector('.tw').href = 'https://www.twitter.com/share?url=' + encodeURIComponent(l);
  document.querySelector('.li').href = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(l);
  if (navigator.share) document.querySelector('#share').style.display = 'block';
  else document.querySelector('.share-buttons').style.display = 'flex';
  document.querySelector('#copy').style.display = 'block';
  document.querySelector('input[type="submit"]').disabled = true;
  document.querySelector('input[type="submit"]').value = l;
  document.querySelector('input[type="submit"]').style.border = 'none';
};

const setSharingLinksPayTm = () => {
  document.querySelector('.wa').href = 'https://wa.me/?text=' + encodeURIComponent('Click to pay: ' + l1);
  document.querySelector('.fb').href = 'https://www.facebook.com/share.php?u=' + encodeURIComponent(l1);
  document.querySelector('.tw').href = 'https://www.twitter.com/share?url=' + encodeURIComponent(l1);
  document.querySelector('.li').href = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(l1);
  if (navigator.share) document.querySelector('#share-paytm').style.display = 'block';
  else document.querySelector('.share-buttons-paytm').style.display = 'flex';
  document.querySelector('#copy-paytm').style.display = 'block';
  document.querySelector('input[id="paytm-submit"]').disabled = true;
  document.querySelector('input[id="paytm-submit"]').value = l1;
  document.querySelector('input[id="paytm-submit"]').style.border = 'none';
};

document.getElementById('copy').addEventListener('click', (e) => copyToClipboard(e, l));
document.getElementById('share').addEventListener('click', (e) => share(e, l));
document.getElementById('copy-paytm').addEventListener('click', (e) => copyToClipboard(e, l1));
document.getElementById('share-paytm').addEventListener('click', (e) => share(e, l1));
document.querySelector('form.form').addEventListener('submit', (e) => handleSubmit(e, 'upi'));
document.querySelector('form.paytm').addEventListener('submit', (e) => handleSubmit(e, 'paytm'));
