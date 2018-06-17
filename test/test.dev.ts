/**
 * Runs tests for code from the src directory
 */
import runForgetMeMaebyTests from './forget-me-maeby-tests';
import DataItem from '../src/data-item';
import ForgetMeMaeby from '../src';

import * as CONSTANTS from "../src/constants";


runForgetMeMaebyTests(DataItem, ForgetMeMaeby, CONSTANTS);
