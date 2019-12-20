import React from 'react'
import * as chai from 'chai'
import 'mocha'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
chai.should()
const expect = chai.expect

import { lazyProps } from '.'

//See test.specs.ts for more test, this is js specific
describe('lazy-props', () => {
  it('should return an error with more propsNames than props', () => {
    const component = ({cats}) => React.createElement('div', {children: cats})
    const lzyComponent = Promise.resolve({'default': component})
    const props = Promise.resolve(['Mufasa', 'Scar', 'Simba'])

    const found = lazyProps(lzyComponent, Promise.all([props]), ['cats', 'dogs'])
    return expect(found.then(newComponent => React.createElement(newComponent.default))).to.be.rejectedWith('Both willBeProps inside array and propsName need to be of the same length')
  })
  it('should return an error with more props than propsNames', () => {
    const component = ({cats}) => React.createElement('div', {children: cats})
    const lzyComponent = Promise.resolve({'default': component})
    const props = Promise.resolve(['Mufasa', 'Scar', 'Simba'])

    const found = lazyProps(lzyComponent, Promise.all([props, props]), ['cats'])
    return expect(found.then(newComponent => React.createElement(newComponent.default))).to.be.rejectedWith('Both willBeProps inside array and propsName need to be of the same length')
  })
  it('should return an error if propsNames is an array while props isn\'t', () => {
    const component = ({cat}) => React.createElement('div', {children: cat})
    const lzyComponent = Promise.resolve({'default': component})
    const props = Promise.resolve('Simba')

    const found = lazyProps(lzyComponent, props, ['cats'])
    return expect(found.then(newComponent => React.createElement(newComponent.default))).to.be.rejectedWith('If propsNames is an array willBeProps inside should be one too')
  })
})