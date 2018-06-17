
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

        DEFAULT_PROPS,
      } = CONSTANTS;


      const isSameObject = (a, b) =>
        (
          a.TYPE === b.TYPE && a.uid() === b.uid()
        );

      var forgetMeMaeby;

      var TEST_EXPIRES_IN = 1000;



      it(`should be able to create a ForgetMeMaeby`,
        () => {
          forgetMeMaeby = new ForgetMeMaeby();
          expect(forgetMeMaeby.TYPE).to.equal(FORGET_ME_MAEBY);
        }
      );

      it(`should have the default expires in value`,
        () => {
          expect(forgetMeMaeby.expiresIn()).to.equal(DEFAULT_PROPS.expiresIn);
        }
      );

      it(`should be able to set the cache expiresIn value`,
        () => {
          const stillForgetMeMaeby = forgetMeMaeby.expiresIn(TEST_EXPIRES_IN);
          expect(isSameObject(stillForgetMeMaeby, forgetMeMaeby)).to.equal(true);
          expect(forgetMeMaeby.expiresIn()).to.equal(TEST_EXPIRES_IN);
        }
      );

      it(`should be able to add a value to the cache with the 
        cache-set expires in setting`,
        () => {
          const stillForgetMeMaeby = forgetMeMaeby.set("blue", true);
          expect(isSameObject(stillForgetMeMaeby, forgetMeMaeby)).to.equal(true);
          const dataItem = forgetMeMaeby.getDataItem("blue");
          expect(dataItem.TYPE).to.equal(DATA_ITEM);
          expect(dataItem.expiresIn()).to.equal(TEST_EXPIRES_IN);
          expect(forgetMeMaeby.expiresIn()).to.equal(TEST_EXPIRES_IN);
        }
      );

      it(`should be able to set a value to the cache and then get it
        before the expiry time is up, but not get it when the expiry time is up`,
        function(done) {
          this.timeout(TEST_EXPIRES_IN + 2000);
          forgetMeMaeby.set("red", true);
          expect(forgetMeMaeby.get("red", false)).to.equal(true);
          setTimeout(
            () => {
              expect(forgetMeMaeby.get("red", false)).to.equal(false);
              log.info('Timed Cache Test 1 complete');
              done()
            },
            TEST_EXPIRES_IN + 1000
          );
        }
      );

      it(`should be able to set a value to the cache with a specific timeout
        and perform the same tests as before.`,
        function(done) {
          this.timeout(TEST_EXPIRES_IN * 2 + 2000);
          forgetMeMaeby.set("yellow", 100, TEST_EXPIRES_IN * 2);
          expect(forgetMeMaeby.get("yellow", 200)).to.equal(100);
          setTimeout(
            () => {
              expect(forgetMeMaeby.get("yellow", 200)).to.equal(100);
              log.info('Timed Cache Test 2a complete');
            },
            TEST_EXPIRES_IN * 1.5
          );
          setTimeout(
            () => {
              expect(forgetMeMaeby.get("yellow", 200)).to.equal(200);
              log.info('Timed Cache Test 2b complete');
              done();
            },
            TEST_EXPIRES_IN * 2 + 100
          );
        }
      );

      it(`should be able to set a value and then delete it from the cache`,
        () => {
          forgetMeMaeby.set("purple", "Fred", -1);
          expect(forgetMeMaeby.getDataItem("purple").TYPE).to.equal(DATA_ITEM);
          forgetMeMaeby.delete("purple");
          expect(typeof forgetMeMaeby.getDataItem("purple")).to.equal("undefined");

        }
      );

      it(`should be able to set a series of values into a new cache
        and get all the values as an object`,
        () => {

          forgetMeMaeby = new ForgetMeMaeby();
          forgetMeMaeby.expiresIn(-1)
                        .set("alpha", "a")
                        .set("beta", "b");
          const expected = {
            alpha: "a",
            beta: "b"
          }

          const result = forgetMeMaeby.get();
          expect(typeof result ).to.equal('object');
          expect(result).to.deep.equal(expected);


        }
      );


    }
  );

};

export default runForgetMeMaebyTests;


