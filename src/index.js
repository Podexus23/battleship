import './assets/stylesheets/main.scss';

const run = () => {
  console.log('hi');
};

const array = [1, 2, 3, 4];
const double = array.map((e) => e * 2);

console.log(double);

run();

async function start() {
  const answer = await Promise.resolve('async is working');
  return answer;
}

start().then((res) => console.log(res));

class Id {
  static date = Date.now();
}

console.log(Id.date);
