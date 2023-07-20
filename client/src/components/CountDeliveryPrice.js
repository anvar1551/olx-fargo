function countPrice(weight) {
  //От Двери До Двери
  let summa = 0;
  let znacheniya = 0;

  if (weight < 20) {
    summa = weight * 5000 + 55000;
  } else if (weight === 20) {
  } else if (weight > 20 && weight < 50) {
    znacheniya = parseInt(weight / 2) * 5;
    summa = (znacheniya + 165) * 1000;
    //console.log('znacheniya=',znacheniya);
  } else if (weight > 49) {
    znacheniya = parseInt((weight - 2) / 3) * 5;
    summa = (znacheniya + 210) * 1000;
  }

  return summa;
}

function countPricePoint(weight) {
  let summa = 0;
  let znacheniya = 0;

  if (weight < 20) {
    summa = weight * 5000 + 35000;
  } else if (weight === 20) {
    console.log("summa=", 165000);
  } else if (weight > 20 && weight < 50) {
    znacheniya = parseInt(weight / 2) * 5;
    summa = (znacheniya + 115) * 1000;
    //console.log('znacheniya=',znacheniya);
    console.log("summa=", summa);
  } else if (weight > 49) {
    znacheniya = parseInt((weight - 2) / 3) * 5;
    summa = (znacheniya + 160) * 1000;
    //console.log('znacheniya=',znacheniya);
    console.log("summa=", summa);
  }

  return summa;
}

module.exports = {
  countPrice,
  countPricePoint,
};
