function isPrime(num) {
	if  (num < 2) {
		return false
	} else {
		let ben = Math.floor(Math.sqrt(num));
		for (let i = 2; i <= ben; i++) {
			if (num % i === 0) {
			return false
			}
		}
	}
  return true
};

module.exports = { isPrime };