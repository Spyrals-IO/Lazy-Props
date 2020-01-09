/*
MIT License

Copyright (c) 2019 Methrat0n

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const React = require('react')

/**
 * @param {Promise.<{default: (props: P) => JSX.Element}> | (props: P) => JSX.Element } Component A module imported using the `import()`syntax or a simple Component
 * @param {Promise.<any | any[]>} willBeProps one or more laey props inside a single promise.
 * @param {string | string[]} propsNames a set of props name for the component pass as `LazyComponent`
 * 
 * @returns {Promise<{default: (props: any) => JSX.Element}>} 
 *   a new promise component with the same props as `Component` except the one in `willBeProps`
 *   or a failed promise with an error. Possible errors :
 *     - `propsNames` not a set, meaning there is duplicate inside.
 *     - `willBeProps` and `propsNames` are not of the same size.
 * 
 * Examples:
 *  - If you have a single lazy props
 * 
 * ```js
 * import lazyProps from 'lazy-props'
 * 
 * const usersService = ... //Some promise, say the rest service for your users
 * const LazyDashboard = import('...') //your component
 * 
 * const Dashboard = lazy(() => lazyProps(LazyDashboard, usersService, 'usersService')) //Dashboard is a component taking only it's remaining props
 * ```
 * 
 * - With multiple lazy props
 * 
 * ```js
 * import lazyProps from 'lazy-props'
 * 
 * const bananas = ... //Some promise
 * const ananas = ... //Also a promise, best one
 * const apples = ... //Again, a promise
 * 
 * const LazyFruitboard = import('...') //your component
 * const Dashboard = lazy(() => lazyProps(LazyFruitboard, Promise.all([bananas, ananas, apples]), ['bananas', 'ananas', 'apples']))
 * ```
 * 
 * - With a local or normally importered Component
 * 
 * ```js
 * import lazyProps from 'lazy-props'
 * 
 * const bananas = ... //Some promise
 * const ananas = ... //Also a promise, best one
 * const apples = ... //Again, a promise
 * 
 * import Fruitboard from '...'
 * 
 * const SimplerFruitBoard = lazy(() => lazyProps(Fruitboard, Promise.all([bananas, ananas, apples]), ['bananas', 'ananas', 'apples']))
 * ```
 */
exports.lazyProps = function(Component, willBeProps, propsNames) {
  if(Array.isArray(propsNames) && hasDuplicates(propsNames))
    return Promise.reject(new Error('propsNames cannot contains duplicate as it\'s suppose to be property names'))
  
  let LazyComponent = Component
  if(!(Component instanceof Promise))
    LazyComponent = Promise.resolve({'default': Component})

  return LazyComponent.then(function(Component) {
    return  willBeProps.then(function(props) {
      if(!Array.isArray(props) && Array.isArray(propsNames))
        return Promise.reject(new Error('If propsNames is an array willBeProps inside should be one too'))
      if(Array.isArray(props) && Array.isArray(propsNames) && props.length !== propsNames.length)
        return Promise.reject(new Error('Both willBeProps inside array and propsName need to be of the same length'));
      else if(Array.isArray(props) && Array.isArray(propsNames) && props.length === propsNames.length)
        return { 'default': (remainingProps) => React.createElement(Component.default, { ...remainingProps, ...buildPropsByNames(props, propsNames)})};
      else
        return { 'default': (remainingProps) => React.createElement(Component.default, {[propsNames]: props, ...remainingProps}) };
      })
  })
}

function buildPropsByNames(props, names) {
  let obj = Object.create(null);
  for(let i = 0; i < props.length; i++) {
    obj[names[i]] = props[i];
  }
  return obj;
}

function hasDuplicates(names) {
  let nameSoFar = Object.create(null);
  for (let i = 0; i < names.length; ++i) {
      let name = names[i];
      if (name in nameSoFar) {
          return true;
      }
      nameSoFar[name] = true;
  }
  return false;
}