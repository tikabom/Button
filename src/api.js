const apiRoot = 'http://fake-button.herokuapp.com/';

function get(url, queryString) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    const endpoint = apiRoot + url + '?' + queryString;
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

function post(url, data) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    const endpoint = apiRoot + url;
    req.open('POST', endpoint, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.onload = () => {
      if (req.readyState == 4 && req.status == 200) res(req.responseText);
      else rej(Error(req.statusText));
    };
    req.send(JSON.stringify(data));
  });
}

function del(url, param, queryString) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    const endpoint = apiRoot + url + param + '?' + queryString;
    req.open('DELETE', endpoint, true);
    req.onload = () => {
      if (req.readyState == 4 && req.status == 200) res(true);
      else rej(Error(req.statusText));
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
      } catch(err) {
        res([]);
      }
    }).catch((err) => {
      rej(err);
    });
  });
}

function getUsers(candidate) {
  return new Promise((res, rej) => {
    get('user','candidate=' + candidate).then((data) => {
      try {
        let users = JSON.parse(data);
        res(users);
      } catch(err) {
        res([]);
      }
    }).catch((err) => {
      rej(err);
    });
  });
}

function addUser(user) {
  return new Promise((res, rej) => {
    post('user', user).then((data) => {
      try {
        let userWithID = JSON.parse(data);
        res(userWithID);
      } catch(err) {
        rej(err);
      }
    }).catch((err) => {
      rej(err);
    });
  });
}

function deleteUser(id, candidate) {
  return new Promise((res, rej) => {
    del('user/', id, 'candidate=' + candidate).then(() => {
      res(true);
    }).catch((err) => {
      rej(err);
    });
  });
}

function getTransfers(userID, candidate) {
  return new Promise((res, rej) => {
    get('user/' + userID + '/transfers','candidate=' + candidate).then((data) => {
      try {
        let transfers = JSON.parse(data);
        res(transfers);
      } catch(err) {
        res([]);
      }
    }).catch((err) => {
      rej(err);
    });
  });
}

function getTransfer(id, candidate) {
  return new Promise((res, rej) => {
    get('transfer/' + id,'candidate=' + candidate).then((data) => {
      try {
        let transfer = JSON.parse(data);
        res(transfer);
      } catch(err) {
        res([]);
      }
    }).catch((err) => {
      rej(err);
    });
  });
}

function createTransfer(transfer) {
  return new Promise((res, rej) => {
    post('transfer', transfer).then((data) => {
      res(true);
    }).catch((err) => {
      rej(err);
    });
  });
}

module.exports = {
  getCandidates: getCandidates,
  getUsers: getUsers,
  addUser: addUser,
  deleteUser: deleteUser,
  getTransfers: getTransfers,
  getTransfer: getTransfer,
  createTransfer: createTransfer
};
