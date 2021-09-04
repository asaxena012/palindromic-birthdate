const inputEl = document.querySelector("#input-date");
const submitBtn = document.querySelector("button");
const outputEl = document.querySelector("#output");
const loadingImg = document.querySelector("#loading-image");

const showLoading = () => {
  loadingImg.style.display = "block";
};

const hideLoading = () => {
  loadingImg.style.display = "none";
};

const hideOutput = () => {
  outputEl.textContent = "";
};

const displayOutput = (status, date, nearestPalindromeDate) => {
  switch (status) {
    case true: {
      outputEl.textContent = "Yay! that's a palindromic birthdate";
      break;
    }
    case false: {
      const diffTime = Math.abs(nearestPalindromeDate - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      outputEl.textContent = `Nope, that's not a palindromic birthdate.
      The nearest upcoming palindromic date is ${nearestPalindromeDate.toLocaleDateString()}, which is ${diffDays} days away
      `;
      break;
    }
    default:
      return;
  }
};

const isPalindrome = (dateString) => {
  const chars = dateString.split("").filter((el) => el !== "/");
  let i = 0;
  let j = chars.length - 1;
  while (i < j) {
    if (chars[i] !== chars[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
};

const getNearestPalindrome = (year) => {
  const yearString = String(year);
  const month = yearString.slice(0, 2).split("").reverse().join("");
  const day = yearString.slice(2, 4).split("").reverse().join("");
  const date = new Date(year, Number(month) - 1, Number(day));
  if (isPalindrome(date.toLocaleDateString())) {
    return date;
  }
  return getNearestPalindrome(year + 1);
};

const processInput = async () => {
  hideLoading();

  const date = new Date(inputEl.value);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  const year = date.getFullYear();

  if (isPalindrome(date.toLocaleDateString())) {
    displayOutput(true);
  } else {
    let nearestPalindromeDate = getNearestPalindrome(year);
    if (nearestPalindromeDate.getTime() < date.getTime()) {
      nearestPalindromeDate = getNearestPalindrome(year + 1);
    }
    displayOutput(false, date, nearestPalindromeDate);
  }
};

const submitHandler = () => {
  hideOutput();
  if (!inputEl.value) return;

  showLoading();
  setTimeout(processInput, 3000);
};

submitBtn.addEventListener("click", submitHandler);
