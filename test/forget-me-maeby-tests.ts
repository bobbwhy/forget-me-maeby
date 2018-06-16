
import Bunyan from 'bunyan';
const  log = Bunyan.createLogger({name: "Class Core Build Test"});

// import { suite, test, slow, timeout  } from "mocha-typescript";
import { expect } from 'chai';
// import 'mocha';




const runForgetMeMaebyTests
  = (DataItem, ForgetMeMaeby, CONSTANTS) => {

  describe(`Test ClassOMat`,
    () => {
      const {
        DATA_ITEM,
        FORGET_ME_MAEBY,

        NONE,

        DEFAULT_EXPIRES_IN,
      } = CONSTANTS;

      const isSameObject = (a, b) =>
        (
          a.TYPE === b.TYPE && a.uid() === b.uid()
        );

      var forgetMeMaeby;



      it(`should be able to create a ForgetMeMaeby`,
        () => {
          forgetMeMaeby = new ForgetMeMaeby();
          expect(forgetMeMaeby.TYPE).to.equal(FORGET_ME_MAEBY);
        }
      );

      it(`should have the default expires in value`,
        () => {
          expect(forgetMeMaeby.expiresIn()).to.equal(DEFAULT_EXPIRES_IN);

        }
      );

      it(`should be able to set the cache expiresIn value`,
        () => {
          const stillForgetMeMaeby = forgetMeMaeby.expiresIn(2000);
          expect(isSameObject(stillForgetMeMaeby, forgetMeMaeby)).to.equal(true);
          expect(forgetMeMaeby.expiresIn()).to.equal(2000);
        }
      );

      it(`should be able to add a value to the cache`,
        () => {
          const stillForgetMeMaeby = forgetMeMaeby.set("blue", true);
          expect(isSameObject(stillForgetMeMaeby, forgetMeMaeby)).to.equal(true);
          const dataItem = forgetMeMaeby.getDataItem("blue");
          expect(dataItem.TYPE).to.equal(DATA_ITEM);
          // expect(data
        }
      );

    }
  );

};

export default runForgetMeMaebyTests;


