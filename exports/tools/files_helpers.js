exports.getUniqueName = function (prefix, extention) {
  const dt = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000));
  return (prefix + '_' + dt.getFullYear() + '_' + dt.getMonth() + '_' + dt.getDate() + '_' + dt.getHours() + '_' + dt.getMinutes() + '_' + dt.getSeconds() + extention);
};
