const formatIDR = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const parseIDR = (idrString) => {
  return Number(idrString.replace(/[^0-9,-]+/g, "").replace(",", "."));
};

export {formatIDR, parseIDR}