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
/// <reference types="react" />

//Polyfill for typescript version
type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T]
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

/**
 * @param {Promise.<{default: (props: P) => JSX.Element}>} LazyComponent A module imported using the `import()`syntax
 * @param {Promise.<any | any[]>} willBeProps one or more laey props inside a single promise.
 * @param {string | string[]} propsNames a set of props name for the component pass as `LazyComponent`
 * 
 * @returns {Promise<{default: (props: any) => JSX.Element}>} 
 *   a new promise component with the same props as `LazyComponent` except the one in `willBeProps`
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
 * - With multiples lazy props
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
 */
export function lazyProps<P extends {}, key extends keyof P>(LazyComponent: Promise<{default: (props: P) => JSX.Element}>, willBeProps: Promise<P[key]>, propsNames: key): Promise<{default: (newProps: Omit<P, key>) => JSX.Element}>
export function lazyProps<P extends {}, key1 extends keyof P, key2 extends keyof P>(LazyComponent: Promise<{default: (props: P) => JSX.Element}>, willBeProps: Promise<[P[key1], P[key2]]>, propsNames: [key1, key2]): Promise<{default: (newProps: Omit<Omit<P, key1>, key2>) => JSX.Element}>

export function lazyProps<P extends {}, key1 extends keyof P, key2 extends keyof P, key3 extends keyof P>(LazyComponent: Promise<{default: (props: P) => JSX.Element}>, willBeProps: Promise<[P[key1], P[key2], P[key3]]>, propsNames: [key1, key2, key3]): Promise<{default: (newProps: Omit<Omit<Omit<P, key1>, key2>, key3>) => JSX.Element}>
export function lazyProps<P extends {}, key1 extends keyof P, key2 extends keyof P, key3 extends keyof P, key4 extends keyof P>(LazyComponent: Promise<{default: (props: P) => JSX.Element}>, willBeProps: Promise<[P[key1], P[key2], P[key3], P[key4]]>, propsNames: [key1, key2, key3, key4]): Promise<{default: (newProps: Omit<Omit<Omit<Omit<P, key1>, key2>, key3>, key4>) => JSX.Element}>
export function lazyProps<P extends {}, key1 extends keyof P, key2 extends keyof P, key3 extends keyof P, key4 extends keyof P, key5 extends keyof P>(LazyComponent: Promise<{default: (props: P) => JSX.Element}>, willBeProps: Promise<[P[key1], P[key2], P[key3], P[key4], P[key5]]>, propsNames: [key1, key2, key3, key4, key5]): Promise<{default: (newProps: Omit<Omit<Omit<Omit<Omit<P, key1>, key2>, key3>, key4, key5>>) => JSX.Element}>
