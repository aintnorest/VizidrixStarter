/* @flow */

// $FlowIssue
import "styles/Main.css";
import { render } from 'react-dom';
import React      from 'react';


function foo(x: string, y: number): number {
  return x.length * y;
}



console.log("Loading",foo("Loading",2));
