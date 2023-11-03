import axios from "axios";
import { _url } from "./config";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const signoutBtn = document.getElementById("signout");

//抓到localsorage 的資料去後端回傳
function lodingMember() {
  //使用 Json Server 驗證路由 /600
  const memberId = user.id;
  axios
    .get(`${_url}/600/users/${memberId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      const { name, gender, birthday, address, phone, email, userPhoto } =
        res.data;

      //抓取頁面物件 準備推資料
      const nameDom = document.getElementById("name");
      const genderDom = document.getElementById("gender");
      const birthdayDom = document.getElementById("birthday");
      const addressDom = document.getElementById("address");
      const phoneDom = document.getElementById("phone");
      const emailDom = document.getElementById("email");
      const imgDom = document.getElementById("photo");

      const genderToChiniese = () =>
        gender === "male"
          ? "男 "
          : gender === "female"
          ? "女 "
          : gender === "other"
          ? "其他 "
          : "未定義";

      console.log(name, gender, birthday, address, phone, email, userPhoto);

      nameDom.textContent = name;
      genderDom.textContent = `性別： ${genderToChiniese()}`;
      birthdayDom.textContent = `生日： ${birthday}`;
      addressDom.textContent = `地址： ${address}`;
      phoneDom.textContent = `電話： ${phone}`;
      emailDom.textContent = `信箱：${email}`;
      imgDom.setAttribute(
        "src",
        userPhoto || "https://i.imgur.com/rUTLxZC.jpg"
      );
    })
    .catch((err) => {
      console.log(err);
      alert(err);
      window.location.href = "./login.html";
    });
}

lodingMember();

//登出點擊後 刪除 localStorage 資料 並導回首頁
signoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userTokenAndData");
  window.location.href = "./index.html";
});
