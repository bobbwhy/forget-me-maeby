
import Bunyan from 'bunyan';
const  log = Bunyan.createLogger({name: "Class Core Build Test"});

// import { suite, test, slow, timeout  } from "mocha-typescript";
import { expect } from 'chai';
// import 'mocha';

interface ICONSTANTS {

  ALL: symbol
  NONE: symbol,
  DATA: symbol,
  KEYS: symbol,
  PROPS: symbol,

  FORGET_ME_MAEBY: symbol,
  DATA_ITEM: symbol,
}


const runForgetMeMaebyTests = (ForgetMeMaeby, CONSTANTS:ICONSTANTS) => {

  describe(`Test ClassOMat`,
    () => {
      const {
        FORGET_ME_MAEBY,

        NONE,
      } = CONSTANTS;

      var forgetMeMaeby;

      it(`should be able to do something`,
        () => {
          log.info('now ive got that feeling once again ');
          expect(1).to.equal(1);
        }
      );


      it(`should be able to create a ForgetMeMaeby`,
        () => {
          forgetMeMaeby = new ForgetMeMaeby();
          expect(forgetMeMaeby.TYPE).to.equal(FORGET_ME_MAEBY);
        }
      );

    }
  );

};

export default runForgetMeMaebyTests;


