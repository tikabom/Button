const apiRoot = 'http://fake-button.herokuapp.com/';

function get(url, queryString) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    const endpoint = apiRoot + url + "?" + queryString;
    req.open('GET', endpoint);
    req.onload = () => {
      if (req.status == 200) res(req.response);
      else rej(Error(req.statusText));
    };
    req.onerror = (err) => {
      rej(err);
    };
    req.send();
  });
}

function getCandidates() {
  return new Promise((res, rej) => {
    get('user','candidate=FULLSTACK').then((data) => {
      try {
        let users = JSON.parse(data);
        let candidates = [
          ...new Set(users.map(user => user.candidate == null ? "NULL" : user.candidate))
        ];
        res(candidates);
      } catch(e) {
        rej(e);
      }
    }).catch((err) => {
      rej(err);
    });
  });
}

module.exports = {
  getCandidates: getCandidates
};
