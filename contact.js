const form = document.querySelector("#contactForm");
const statusMessage = document.querySelector("#formStatus");

const messages = {
  name: "이름을 입력해주세요.",
  nameValid: "이름이 입력되었습니다.",
  email: "올바른 이메일 주소를 입력해주세요.",
  emailValid: "올바른 이메일 형식입니다.",
  phone: "전화번호는 숫자만 입력해주세요.",
  phoneValid: "전화번호가 입력되었습니다.",
  projectType: "프로젝트 종류를 선택해주세요.",
  projectTypeValid: "프로젝트 종류가 선택되었습니다.",
  budget: "예산을 선택해주세요.",
  budgetValid: "예산이 선택되었습니다.",
  schedule: "희망 일정을 선택해주세요.",
  scheduleValid: "희망 일정이 선택되었습니다.",
  referenceUrl: "https://로 시작하는 URL을 입력해주세요.",
  referenceUrlValid: "참고 사이트 URL 형식입니다.",
  details: "작업 내용을 20자 이상 입력해주세요.",
  detailsValid: "작업 내용이 충분히 입력되었습니다.",
  privacy: "개인정보 수집 및 이용에 동의해주세요.",
  privacyValid: "개인정보 수집 및 이용에 동의했습니다.",
};

const getMessageElement = (name) => document.querySelector(`[data-message-for="${name}"]`);

const setFieldMessage = (name, message = "", state = "") => {
  const element = getMessageElement(name);

  if (element) {
    element.textContent = message;
    element.classList.toggle("valid", state === "valid");
  }
};

const isValidUrl = (value) => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const clearValidationState = () => {
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.classList.remove("is-valid", "is-invalid");
    setFieldMessage(field.name);
  });
};

const validateField = (field) => {
  const name = field.name;
  const value = field.type === "checkbox" ? field.checked : field.value.trim();
  let isValid = true;
  let errorMessage = messages[name];

  if (!field.required && !value) {
    setFieldMessage(name);
    field.classList.remove("is-valid", "is-invalid");
    return true;
  }

  if (field.required && !value) {
    isValid = false;
  }

  if (isValid && field.type === "email" && value && !field.validity.valid) {
    isValid = false;
  }

  if (isValid && name === "phone" && !/^[0-9]+$/.test(field.value.trim())) {
    isValid = false;
  }

  if (isValid && name === "details" && field.value.trim().length < 20) {
    isValid = false;
  }

  if (isValid && name === "referenceUrl" && !isValidUrl(field.value.trim())) {
    isValid = false;
  }

  if (field.validity.patternMismatch) {
    errorMessage = messages[name];
  }

  field.classList.toggle("is-invalid", !isValid);
  field.classList.toggle("is-valid", isValid);
  setFieldMessage(name, isValid ? messages[`${name}Valid`] : errorMessage, isValid ? "valid" : "error");
  return isValid;
};

form.addEventListener("input", (event) => {
  const field = event.target;

  if (field.matches("input, select, textarea")) {
    if (field.name === "phone") {
      field.value = field.value.replace(/\D/g, "");
    }

    validateField(field);
    statusMessage.textContent = "";
  }
});

form.addEventListener("change", (event) => {
  const field = event.target;

  if (field.matches("input, select, textarea")) {
    validateField(field);
    statusMessage.textContent = "";
  }
});

form.addEventListener(
  "invalid",
  (event) => {
    event.preventDefault();
    validateField(event.target);
    statusMessage.textContent = "";
  },
  true,
);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [...form.querySelectorAll("input, select, textarea")];
  const isFormValid = fields.map(validateField).every(Boolean);

  if (!isFormValid) {
    statusMessage.textContent = "";
    return;
  }

  statusMessage.textContent = "문의 내용이 확인되었습니다. 빠르게 연락드리겠습니다.";
  form.reset();
  clearValidationState();
});
