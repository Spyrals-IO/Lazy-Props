import React from 'react'
import * as chai from 'chai'
import 'mocha'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
chai.should()
const expect = chai.expect

import { lazyProps } from '.'

describe('lazy-props', () => {
  it('should return a component with one lazy props', () => {
    interface DivProps {
      cats: string[]
    }
    const component = ({cats}: DivProps) => React.createElement('div', {children: cats})
    const lzyComponent = Promise.resolve({'default': component})
    const props: Promise<string[]> = Promise.resolve(['Mufasa', 'Scar', 'Simba'])

    const found = lazyProps(lzyComponent, props, 'cats')
    return expect(found.then(newComponent => React.createElement(newComponent.default))).to.be.fulfilled
  })
  it('should return a component with three lazy props', () => {
    interface DivProps {
      cats: string[]
      dogs: string[]
      fishes: string[]
    }
    const component = ({cats, dogs, fishes}: DivProps) => React.createElement('div', {children: cats.concat(dogs.concat(fishes))})
    const lzyComponent = Promise.resolve({'default': component})
    const lazyCats: Promise<string[]> = Promise.resolve(['Mufasa', 'Scar', 'Simba'])
    const lazyDogs: Promise<string[]> = Promise.resolve(['Beethoven', 'Bolt', 'Ein'])
    const lazyFishes: Promise<string[]> = Promise.resolve(['Nemo', 'Dory', 'Marin'])

    const found = lazyProps(lzyComponent, Promise.all([lazyCats, lazyDogs, lazyFishes]), ['cats', 'dogs', 'fishes'])
    return expect(found.then(newComponent => React.createElement(newComponent.default))).to.be.fulfilled
  })
  it('should emit an error with duplicate propsNames', () => {
    interface DivProps {
      cats: string[]
      dogs: string[]
      fishes: string[]
    }
    const component = ({cats, dogs, fishes}: DivProps) => React.createElement('div', {children: cats.concat(dogs.concat(fishes))})
    const lzyComponent = Promise.resolve({'default': component})
    const lazyCats: Promise<string[]> = Promise.resolve(['Mufasa', 'Scar', 'Simba'])
    const lazyDogs: Promise<string[]> = Promise.resolve(['Beethoven', 'Bolt', 'Ein'])
    const lazyFishes: Promise<string[]> = Promise.resolve(['Nemo', 'Dory', 'Marin'])

    const found = lazyProps(lzyComponent, Promise.all([lazyCats, lazyDogs, lazyFishes, lazyFishes]), ['cats', 'dogs', 'fishes', 'fishes'])
    return expect(found.then(newComponent => React.createElement(newComponent.default))).to.be.rejectedWith('propsNames cannot contains duplicate as it\'s suppose to be property names')
  })
})