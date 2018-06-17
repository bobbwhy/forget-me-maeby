/**
 * Runs tests for code from the lib directory
 */
import runForgetMeMaebyTests from './forget-me-maeby-tests';
import DataItem from '../lib/data-item';
import ForgetMeMaeby from '../lib';

import * as CONSTANTS from "../lib/constants";


runForgetMeMaebyTests(DataItem, ForgetMeMaeby, CONSTANTS);
