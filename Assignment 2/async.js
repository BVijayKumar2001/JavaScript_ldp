let action = (userId) => {
  let mail = userId + "@gmail.com";
  document.write("Fetched email successfully");
  document.write("The emailId is:", mail);
};
var getData = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(action(userId));
    }, 4000);
  });
};

async function getEmail() {
  try {
    document.write("start");
    await getData("vijaykumarbongoni");
  } catch (error) {
    document.write("Error in retrieving emailId of user ", error);
  } finally {
    document.write("end");
  }
}
getEmail();