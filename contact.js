document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var form = document.getElementById('contactForm');
  var name    = document.getElementById('contactName').value.trim();
  var email   = document.getElementById('contactEmail').value.trim();
  var mobile  = document.getElementById('contactMobile').value.trim();
  var comment = document.getElementById('contactComment').value.trim();

  function showToast(msg) {
    ava({
      icon: 'danger',
      text: msg,
      toast: true,
      progressBar: true,
      position: 'top-right',
      direction: 'ltr',
      timer: 4000
    });
  }

  if (!name) {
    showToast('Please enter your name.');
    return;
  }
  if (!email) {
    showToast('Please enter your email.');
    return;
  }
  // simple email check (optional)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.');
    return;
  }
  if (!comment) {
    showToast('Please enter your message.');
    return;
  }

  fetch('http://localhost:8083/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, mobile: mobile, comment: comment })
  })
  .then(function(res) {
    return res.text().then(function(text) {
      if (!res.ok) {
        throw new Error(text || 'Request failed');
      }
      return text;
    });
  })
  .then(function() {
  ava({
    icon: 'success',
    text: 'Response submitted',
    btnText: 'Okay',
    progressBar: true,
    toast: false,
    timer: 4000
  });
  form.reset();
})
.catch(function(err) {
  ava({
    icon: 'danger',
    text: 'Something went wrong. Please try again.',
    btnText: 'Okay',
    progressBar: true,
    toast: true,
    timer: 4000
  });
  console.error(err);
});
});