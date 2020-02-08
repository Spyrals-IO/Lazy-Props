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

/**
 * @param Component A module imported using the `import()`syntax or a simple Component
 * @param willBeProps one or more laey props inside a single promise.
 * 
 * @returns {Promise<{default: (props: any) => JSX.Element}>} 
 *   a new promise component with the same props as `Component` except the one in `willBeProps`
 *   or a failed promise with an error.
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
 * const Dashboard = lazy(() => lazyProps(LazyDashboard, { usersService })) //Dashboard is a component taking only it's remaining props
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
 * const Dashboard = lazy(() => lazyProps(LazyFruitboard, {bananas, ananas, apples}))
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
 * const SimplerFruitBoard = lazy(() => lazyProps(Fruitboard, {bananas, ananas, apples}))
 * ```
 */
export function lazyProps<PartialProps extends {}, Props extends PartialProps>(Component: Promise<{default: (props: Props) => JSX.Element}>, willBeProps: PartialProps): Promise<{default: (newProps: Omit<Props, keyof PartialProps>) => JSX.Element}>
export function lazyProps<PartialProps extends {}, Props extends PartialProps>(Component: Promise<{default: (props: Props) => JSX.Element}>, willBeProps: Promise<PartialProps> ): Promise<{default: (newProps: Omit<Props, keyof PartialProps>) => JSX.Element}>
export function lazyProps<PartialProps extends {}, Props extends PartialProps>(Component: Promise<{default: (props: Props) => JSX.Element}>, willBeProps: Promise<Promisify<PartialProps>> ): Promise<{default: (newProps: Omit<Props, keyof PartialProps>) => JSX.Element}>
export function lazyProps<PartialProps extends {}, Props extends PartialProps>(Component: Promise<{default: (props: Props) => JSX.Element}>, willBeProps: Promisify<PartialProps> ): Promise<{default: (newProps: Omit<Props, keyof PartialProps>) => JSX.Element}>
export function lazyProps<PartialProps extends {}, Props extends PartialProps>(Component: (props: Props) => JSX.Element, willBeProps: PartialProps): Promise<{default: (newProps: Omit<Props, keyof PartialProps>) => JSX.Element}>
export function lazyProps<PartialProps extends {}, Props extends PartialProps>(Component: (props: Props) => JSX.Element, willBeProps: Promise<PartialProps>): Promise<{default: (newProps: Omit<Props, keyof PartialProps>) => JSX.Element}>
export function lazyProps<PartialProps extends {}, Props extends PartialProps>(Component: (props: Props) => JSX.Element, willBeProps: Promise<Promisify<PartialProps>>): Promise<{default: (newProps: Omit<Props, keyof PartialProps>) => JSX.Element}>
export function lazyProps<PartialProps extends {}, Props extends PartialProps>(Component: (props: Props) => JSX.Element, willBeProps: Promisify<PartialProps>): Promise<{default: (newProps: Omit<Props, keyof PartialProps>) => JSX.Element}>

type Promisify<T> = { [K in keyof T]: Promise<T[K]> | T[K] }