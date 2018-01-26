var update = document.getElementById('update');

update.addEventListener('click', function () {
  // Send PUT Request here
  window.fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'joel is good'
    })
  }).then(res => {
    if (res.ok) return res.json();
  })
.then(data => {
  console.log(data);
});
});
var del = document.getElementById('delete');

del.addEventListener('click', function () {
  window.fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'sam'
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  })
  .then(data => {
    console.log(data);
    window.location.reload();
  });
});
