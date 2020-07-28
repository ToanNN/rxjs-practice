class Safe {
  contents: string;
  constructor(contents: string) {
    this.contents = contents;
  }
  printContents() {
    console.log(this.contents);
  }
}

const safe = new Safe('New content');
safe.printContents();

//change this

const captureThis = {
  contents: 'Capture this context',
  print: safe.printContents,
};

captureThis.print(); // print 'Capture this context'

//not capturing this context

console.log('Not capturing this');
const notCaptureThis = {
  contents: 'Not Captured',
  print: () => safe.printContents(),
};

notCaptureThis.print();

console.log('Using bind to avoid capture this');
const customObjectCapturingThisAgain = {
  contents: 'N/A',
  print: safe.printContents.bind(safe),
};
customObjectCapturingThisAgain.print();

// Using fat arrow function to specify the biding at declaration time

class BindingAtDeclarationTime {
  contents: string;

  constructor(contents: string) {
    this.contents = contents;
  }

  printContents = () => {
    console.log(this.contents);
  };
}

var safeBinding = new BindingAtDeclarationTime('Ngan Nguyen');
const objectTrytoChangeThis = {
  contents: 'Try to change this',
  print: safeBinding.printContents,
};

objectTrytoChangeThis.print();

//you can use the compiler
// flag noImplicitThis to highlight cases where TypeScript
// cannot determine what type "this" is for a function.
