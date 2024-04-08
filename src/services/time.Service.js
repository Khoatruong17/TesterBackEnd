const changeTime = (timeUTC) => {
  try {
    const dateUTC = new Date(timeUTC);

    dateUTC.setUTCHours(dateUTC.getUTCHours() + 7);

    const dayPlus7 = dateUTC.getUTCDate().toString().padStart(2, "0");
    const monthPlus7 = (dateUTC.getUTCMonth() + 1).toString().padStart(2, "0");
    const yearPlus7 = dateUTC.getUTCFullYear();

    const hoursPlus7 = dateUTC.getUTCHours().toString().padStart(2, "0");
    const minutesPlus7 = dateUTC.getUTCMinutes().toString().padStart(2, "0");
    const secondsPlus7 = dateUTC.getUTCSeconds().toString().padStart(2, "0");

    const timePlus7 = `${yearPlus7}-${monthPlus7}-${dayPlus7} ${hoursPlus7}:${minutesPlus7}:${secondsPlus7}`;

    return {
      EM: "Change time successfully",
      EC: 0,
      DT: timePlus7,
    };
  } catch (error) {
    return {
      EM: "Change time fail (service)",
      EC: 1,
      DT: JSON.stringify(error),
    };
  }
};

module.exports = { changeTime };
