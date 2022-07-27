window.addEventListener("DOMContentLoaded", () => {
  const getBtn = document.querySelector(".getBtn");
  const sendBtn = document.querySelector(".sendBtn");
  const regEx = /^[a-zA-Z0-9._]+@[a-z]+.[a-z]+(.[a-z]+)?$/;

  const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.responseType = "json";

      if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => {
        reject("Connection failed. Please try again.");
      };

      xhr.send(JSON.stringify(data));
    });
    return promise;
  };

  const getData = () => {
    sendHttpRequest("GET", "https://reqres.in/api/users").then((resData) => {
      document.getElementById("response").innerHTML = convertData(resData.data);
    });
  };

  const sendData = () => {
    sendHttpRequest("POST", "https://reqres.in/api/register", {
      email: "test@test.com",
      password: "testerd",
    })
      .then((resData) => {
        console.log(resData);
      })
      .catch((resData) => {
        document.getElementById("response").innerHTML =
          "Error: " + resData.error;
      });
  };

  getBtn.addEventListener("click", getData);
  sendBtn.addEventListener("click", sendData);

  const convertData = (data) => {
    let temp = "";
    for (let i = 0; i < data.length; i++) {
      temp = temp + data[i].first_name + " ";
      temp = temp + data[i].last_name + ": ";
      if (regEx.test(data[i].email)) {
        temp = temp + data[i].email + ", <br>";
      }
    }
    return temp;
  };
});
