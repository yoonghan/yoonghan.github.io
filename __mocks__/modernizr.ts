//Mock modernizr as requirejs import are non-supported in jest
module.exports = {
  addTest: (...args:any[]) => {
    if(args.length > 0) {
      console.log(`No modernizr mock ${args}`, "Mock Modernizr")
    }
  }
}
