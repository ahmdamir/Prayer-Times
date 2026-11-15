let myData = {};
let prayers = [];
let nextprayerName = null;
let nextprayerTime = null;
let slider = document.getElementById("slider");
let CountrySellect = document.getElementById("CountrySellect");
let CitySellect = document.getElementById("CitySellect");
let selectedCountryText = "مصر";
let selectedCityText = "القاهرة";
// Egypt Cities
let EG = [
  { nameForApi: "cairo", value: "القاهرة" },
  { nameForApi: "alexandria", value: "الإسكندرية" },
  { nameForApi: "giza", value: "الجيزة" },
  { nameForApi: "luxor", value: "الأقصر" },
  { nameForApi: "aswan", value: "أسوان" },
  { nameForApi: "port said", value: "بورسعيد" },
  { nameForApi: "suez", value: "السويس" },
  { nameForApi: "mansoura", value: "المنصورة" },
  { nameForApi: "tanta", value: "طنطا" },
  { nameForApi: "ismailia", value: "الإسماعيلية" },
  { nameForApi: "fayoum", value: "الفيوم" },
  { nameForApi: "zagazig", value: "الزقازيق" },
  { nameForApi: "beni suef", value: "بني سويف" },
  { nameForApi: "minya", value: "المنيا" },
  { nameForApi: "sohag", value: "سوهاج" },
  { nameForApi: "assiut", value: "أسيوط" },
  { nameForApi: "damietta", value: "دمياط" },
  { nameForApi: "matruh", value: "مرسى مطروح" },
];

// Saudi Arabia Cities
let SA = [
  { nameForApi: "riyadh", value: "الرياض" },
  { nameForApi: "jeddah", value: "جدة" },
  { nameForApi: "dammam", value: "الدمام" },
  { nameForApi: "mecca", value: "مكة" },
  { nameForApi: "medina", value: "المدينة المنورة" },
  { nameForApi: "khobar", value: "الخبر" },
  { nameForApi: "tabuk", value: "تبوك" },
  { nameForApi: "hail", value: "حائل" },
  { nameForApi: "abha", value: "أبها" },
  { nameForApi: "najran", value: "نجران" },
];

// UAE Cities
let UAE = [
  { nameForApi: "dubai", value: "دبي" },
  { nameForApi: "abu dhabi", value: "أبو ظبي" },
  { nameForApi: "sharjah", value: "الشارقة" },
  { nameForApi: "ajman", value: "عجمان" },
  { nameForApi: "fujairah", value: "الفجيرة" },
  { nameForApi: "ras al khaimah", value: "رأس الخيمة" },
  { nameForApi: "umm al quwain", value: "أم القيوين" },
];

let Params = {
  country: "EG",
  city: "Cairo",
};
const images = [
  "./Photos/Background_photos/bg1.jpg",
  "./Photos/Background_photos/bg2.jpg",
  "./Photos/Background_photos/bg3.jpg",
  "./Photos/Background_photos/bg4.jpg",
  "./Photos/Background_photos/bg5.jpg",
];

//fill city_list with Egy_cities
let activeList = EG;
CitySellect.innerHTML = ``;
for (city of activeList) {
  CitySellect.innerHTML += `<option value="${city.nameForApi}">${city.value}</option>`;
}

let FetchData = (params) => {
  fetch(`https://api.aladhan.com/v1/timingsByCity?country=${params.country}&city=${params.city}`)
  .then(res => res.json())
  .then(json => {
    myData = json.data;  
      fillDateArabic();
      fillDateEnglish();
      FillLocationData();
      fillprayers();
      detectNextPrayer();
      fillAdhanMenu();
      setInterval(detectNextPrayer, 60000);
    })
    .catch(error => {
      alert("Error fetching prayer times:", error);
    });
};
FetchData(Params);
const changeSlides = () => {
  let currentIndex = 0;
  setInterval(() => {
    if (currentIndex === 5) {
      currentIndex = 0;
    }
    slider.src = images[currentIndex];
    currentIndex += 1;
  }, 12000);
};
changeSlides();
const fillDateArabic = () => {
  document.getElementById("Arabic_day").innerText = myData.date.hijri.weekday.ar;
  document.getElementById("day").innerText = myData.date.hijri.day;
  document.getElementById("Arabic_month").innerText = myData.date.hijri.month.ar;
  document.getElementById("year").innerText = myData.date.hijri.year;
};

const fillDateEnglish = () => {
  document.getElementById("date_en").innerText = myData.date.gregorian.weekday.en;
  document.getElementById("date_en").innerText += " " + myData.date.readable;
};
const fillprayers = () => {
  prayers = [
    { prayerTime: myData.timings.Fajr, prayerName: "الفجر" },
    { prayerTime: myData.timings.Dhuhr, prayerName: "الظهر" },
    { prayerTime: myData.timings.Asr, prayerName: "العصر" },
    { prayerTime: myData.timings.Maghrib, prayerName: "المغرب" },
    { prayerTime: myData.timings.Isha, prayerName: "العشاء" },
  ];
};
const handleCountryChange = (e) => {
  selectedCountryText = e.target.options[e.target.selectedIndex].text;

  switch (e.target.value) {
    case "EG":
      activeList = EG;
      Params.country = e.target.value;
      Params.city = activeList[0].nameForApi;
      selectedCityText = activeList[0].value;
      FetchData(Params);
      CitySellect.innerHTML = ``;
      for (city of activeList) {
        CitySellect.innerHTML += `<option value= ${city.nameForApi}>${city.value}</option>`;
      }

      break;

    case "SA":
      activeList = SA;
      Params.country = e.target.value;
      Params.city = activeList[0].nameForApi;
      selectedCityText = activeList[0].value;
      FetchData(Params);
      CitySellect.innerHTML = ``;
      for (city of activeList) {
        CitySellect.innerHTML += `<option value= ${city.nameForApi}>${city.value}</option>`;
      }
      break;

    case "UAE":
      activeList = UAE;
      Params.country = e.target.value;
      Params.city = activeList[0].nameForApi;
      selectedCityText = activeList[0].value;
      FetchData(Params);
      CitySellect.innerHTML = ``;
      for (city of activeList) {
        CitySellect.innerHTML += `<option value= ${city.nameForApi}>${city.value}</option>`;
      }
      break;

    default:
      break;
  }
};
const handleCityChange = (e) => {
  selectedCityText = e.target.options[e.target.selectedIndex].text;
  Params.city = e.target.value;
  FetchData(Params);
};
CountrySellect.addEventListener("change", handleCountryChange);
CitySellect.addEventListener("change", handleCityChange);

const FillLocationData = () => {
  document.getElementById("country").innerText = selectedCountryText;
  document.getElementById("city").innerText = selectedCityText;
};

const timeStrToMinutes = (str) => {
  const [hours, minutes] = str.split(":").map(Number);
  return hours * 60 + minutes;
};

const minutesToTimeStr = (min) => {
  const hours = parseInt(min / 60);
  const minutes = parseInt(min % 60);
  return hours.toString() + ":" + minutes.toString();
};

const detectNextPrayer = () => {
  const now = new Date();
  let currentTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const currentMinutes = timeStrToMinutes(currentTime);
  nextprayerName = null;
  nextprayerTime = null;
  for (let i = 0; i < prayers.length; i++) {
    let prayer_minutes = timeStrToMinutes(prayers[i].prayerTime);
    let diff = prayer_minutes - currentMinutes;
    for (let index = 0; index < 5; index++) {
      document.getElementById(prayers[index].prayerName).classList.remove("next_Pray_Time");
    }
    if (diff > 0) {
      if (currentMinutes === 0) {
        setTimeout(() => {
          location.reload(); // إعادة تحميل البيانات عند بدايه يوم جديد
        }, 60000);
      }
      nextprayerName = prayers[i].prayerName;
      const minutes = (diff) % 60;
      const hours = parseInt((diff) / 60);
      nextprayerTime = `${hours} ساعات و ${minutes} دقيقة`;
      document.getElementById(prayers[i].prayerName).classList.add("next_Pray_Time");
      break;
    }
    if (diff === 0) {
      nextprayerName = "";
      nextprayerTime = "";
      nextprayerName = prayers[i].prayerName;
      document.getElementById("text").innerText = ``;
      document.getElementById("next_prayer_name").innerText = `🕌 حان الآن وقت صلاة ${nextprayerName}`;
      document.getElementById("next_prayer_time").innerText = nextprayerTime;
      const adhan = document.getElementById("adhanAudio");
      adhan.play();
      setTimeout(() => {
        detectNextPrayer();
      }, 60000);
      return;
    }
  }
  if (!nextprayerName) {
    const prayer_minutes = timeStrToMinutes(prayers[0].prayerTime);
    const diff = 1440 - currentMinutes + prayer_minutes; // عدد الدقايق المتبقية إلى نهاية اليوم + وقت الفجر
    const hours = parseInt(diff / 60);
    const minutes = diff % 60;
    document.getElementById(prayers[0].prayerName).classList.add("next_Pray_Time");
    nextprayerName = prayers[0].prayerName;
    nextprayerTime = `${hours} ساعات و ${minutes} دقيقة`;
  }
  document.getElementById("next_prayer_name").innerText = nextprayerName;
  document.getElementById("next_prayer_time").innerText = nextprayerTime;
};

const fillAdhanMenu = () => {
  for (let i = 0; i < prayers.length; i++) {
    let prayer_minutes = timeStrToMinutes(prayers[i].prayerTime);

    if (prayer_minutes < 720) {
      // اقل من 12 الظهر
      let newprayerTime = minutesToTimeStr(prayer_minutes) + " ص";
      document.getElementById(prayers[i].prayerName).innerText = newprayerTime;
    } else {
      prayer_minutes -= 720;
      if (prayer_minutes < 60) prayer_minutes += 720; // عشان لو قبل 1 ظهرا يعرضها 12:45 م
      let newprayerTime = minutesToTimeStr(prayer_minutes) + " م";
      document.getElementById(prayers[i].prayerName).innerText = newprayerTime;
    }
  }
};

