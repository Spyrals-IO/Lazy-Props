import React from 'react'
import * as chai from 'chai'
import 'mocha'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
chai.should()
const expect = chai.expect

import { lazyProps } from '.'

describe('lazy-props ts', () => {
  it('should return a component with one lazy props for local components', () => {
    interface DivProps {
      cats: string[]
    }
    const component = ({cats}: DivProps) => React.createElement('div', {children: cats})
    const cats: Promise<string[]> = Promise.resolve(['Mufasa', 'Scar', 'Simba'])

    const found = lazyProps(component, {cats})
    return expect(found.then(newComponent => React.createElement(newComponent.default))).to.be.fulfilled
  })
  it('should return a component with one lazy props', () => {
    interface DivProps {
      cats: string[]
    }
    const component = ({cats}: DivProps) => React.createElement('div', {children: cats})
    const lzyComponent = Promise.resolve({'default': component})
    const cats: Promise<string[]> = Promise.resolve(['Mufasa', 'Scar', 'Simba'])

    const found = lazyProps(lzyComponent, {cats})
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

    const found = lazyProps(lzyComponent, {cats: lazyCats, dogs: lazyDogs, fishes: lazyFishes})
    return expect(found.then(newComponent => React.createElement(newComponent.default))).to.be.fulfilled
  })
})