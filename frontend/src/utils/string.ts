export const clsx = (...classes: (string | false | null | undefined)[]) => {
  return classes.filter((cls): cls is string => !!cls).join(" ");
};

export const isNotBlank = (val: any): val is string =>
  typeof val === "string" && val.trim().length > 0;

export const isBlank = (val: any) => !isNotBlank(val);

const dateTimeFormatter = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "long",
  timeStyle: "short",
  hour12: false,
});
export const readableDateTimeFrom = (timestamp: Date | number | string) =>
  timestamp ? dateTimeFormatter.format(new Date(timestamp)) : "";

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  hour12: false,
  weekday: "short",
  month: "long",
  day: "2-digit",
});
const validFileExtensions: any = {
  image: ["jpg", "png", "jpeg"],
  pdf: ["pdf"],
};
export const readableDateFrom = (timestamp: Date | number | string) =>
  timestamp
    ? new Date(timestamp).toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

export const isValidFileType = (fileName: any, fileType: any) => {
  let result;

  if (fileName && fileType === "image") {
    result = validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1;
  } else if (fileName && fileType === "pdf") {
    result =
      fileName.split(".").length < 3 &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1;
  }
  return result;
};
// timestamp ? dateFormatter.format(new Date(timestamp)) : "";
