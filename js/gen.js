var l;

const DEBUG = window.location.host.includes('127.0.0.1') || window.location.host.includes('localhost');

const setCopied = (t) => document.getElementById('copy').value = t;

const copyToClipboard = (e) => {
  e.target.focus();
  if (navigator) {
    try {
      navigator.clipboard.writeText(l);
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

const share = (e) => {
  e.target.focus();
  if (navigator.share)
    navigator
      .share({
        url: l,
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
  navigator.share = true;
  setSharingLinks();
  console.log(link);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const v = document.querySelector('input[name=\'upi\']').value;
  const na = document.querySelector('input[name=\'name\']').value;
  const li = `https://upi.thereisnoearthb.com/?upi=${v}&name=${encodeURI(na)}`;
  fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(li)}`)
    .then((d) => d.json())
    .then((_d) => setLink(_d.shorturl))
    .catch((e) => setLink(li));
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

document.getElementById('copy').addEventListener('click', copyToClipboard);
document.getElementById('share').addEventListener('click', share);
document.querySelector('form.form').addEventListener('submit', handleSubmit);
