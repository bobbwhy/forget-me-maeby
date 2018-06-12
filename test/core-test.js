
import Bunyan from 'bunyan';
const  log = Bunyan.createLogger({name: "Class Core Build Test"});

import 'mocha';
import { expect } from 'chai';

import globals from '@code-o-mat/globals';

const { NONE, PROPS } = globals.constants.values;
const { 
        O_MAT,
        O_MAT_CACHE,
        CLASS_O_MAT,
        METHOD_O_MAT
       } = globals.constants.types;

const {
        isClassOMat, 
        isMethodOMat,
        isOMat,
       } = globals.validations;

const codePath
        = process.env.NODE_ENV === "PRODUCTION"
          ? 'lib' : 'src';

const getClassOMat = require(`../${codePath}/class-o-mat`).default;
const ClassOMat = getClassOMat(globals);

describe(`Test ClassOMat`,
  () => { 

    var classOMat;
    var methodOMat;
    class BaseClass { 
      static TYPE = 'BASE';
      TYPE = 'BASE';
    }

    it(`should be able to create a classOMat`,
      () => { 
        classOMat = new ClassOMat('class');
        expect(isClassOMat(classOMat)).to.equal(true);
        expect(isOMat(classOMat)).to.equal(true);
        expect(ClassOMat.TYPE).to.equal(CLASS_O_MAT);
        expect(ClassOMat.FAMILY).to.equal(O_MAT);
      }
    );

    it(`should be able to get a methodOMat from the class without a method`,
      () => { 
        methodOMat = classOMat.method();
        expect(isMethodOMat(methodOMat)).to.equal(true);
        expect(methodOMat.TYPE).to.equal(METHOD_O_MAT);
      }
    );

    it(`should be able to set a name and method for this methodOMat`,
      () => { 
        methodOMat.name('dry').method(()=>true);
        expect(methodOMat.name()).to.equal('dry');
        expect(typeof methodOMat.method()).to.equal('function');
      }
    );

    it(`should be able to get the default BaseClass from the ClassOMat`,
      () => { 
        const BaseClass = classOMat.BaseClass();
        const baseInstance = new BaseClass();
        expect(baseInstance instanceof BaseClass).to.equal(true);
      }
    );

    it(`should be able to and set a BaseClass for the ClassOMat`,
      () => { 
        const stillClassOMat = classOMat.BaseClass(BaseClass);
        const SetBaseClass = classOMat.BaseClass();
        const instance = new SetBaseClass();
        expect(stillClassOMat.uid()).to.equal(classOMat.uid());
        expect(SetBaseClass.TYPE).to.equal('BASE');
        expect(instance.TYPE).to.equal('BASE');
      }
    );

    it(`should be able to add a method to a class with a name`, 
      () => { 
        const testMethod =()=> this;
        const methodOMat = classOMat.method('testMethod', testMethod);
        expect(methodOMat.TYPE).to.equal(METHOD_O_MAT);
        expect(methodOMat.name()).to.equal('testMethod');
        expect(typeof methodOMat.method()).to.equal('function');
      }
    );

    it(`should be able to add a method to a class with a name
        with params in different order`, 
      () => { 
        const testMethod =()=> this;
        const methodOMat = classOMat.method(testMethod, 'testMethod');
        expect(methodOMat.TYPE).to.equal(METHOD_O_MAT);
        expect(methodOMat.name()).to.equal('testMethod');
        expect(typeof methodOMat.method()).to.equal('function');
      }
    );

    it(`should be able to add a method to a class with a named
        function but no name parameter`, 
      () => { 
        const testMethod = function() { return this};
        const methodOMat = classOMat.method(testMethod);
        expect(methodOMat.TYPE).to.equal(METHOD_O_MAT);
        expect(methodOMat.name()).to.equal('testMethod');
        expect(typeof methodOMat.method()).to.equal('function');
      }
    );

    it(`should be able to retrieve the methodOMats cache.
        It should have a count of 1`,
      () => { 
        const methodOMats = classOMat.methods();
        expect(methodOMats.TYPE).to.equal(O_MAT_CACHE);
        expect(methodOMats.count()).to.equal(2);
      }
    );

    it(`should be able to build a class with the new methods`,
      () => { 
        const BuiltClass = classOMat.build();
        const builtInstance = new BuiltClass();
        expect(typeof BuiltClass).to.equal('function');
        expect(BuiltClass.TYPE).to.equal('BASE');
        expect(typeof builtInstance).to.equal('object');
        expect(builtInstance.TYPE).to.equal('BASE');
        expect(typeof builtInstance.dry).to.equal('function');
        expect(typeof builtInstance.testMethod).to.equal('function');
        expect(builtInstance.dry()).to.equal(true);
        expect(builtInstance.testMethod().TYPE).to.equal('BASE');
      }
    );


  }
);