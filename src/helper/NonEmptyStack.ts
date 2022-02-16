
/**
 * This stack implementation must always have at least one element
 **/
export default class NonEmptyStack<T>{
  private _array: Array<T>

  constructor(elements: T[]) {
    if (elements.length === 0)
      throw new Error("Cannot create NonEmptyStack with no elements")

    this._array = elements
  }
  
  push(value: T): NonEmptyStack<T> {
    return new NonEmptyStack( [...this._array, value])
  }
    
  pop(): NonEmptyStack<T> {
    if (this._array.length <= 1) 
      throw new Error("Cannot to remove last element of NonEmptyStack")

    return new NonEmptyStack(this._array.slice(0, this._array.length - 1))
  }

  top(): T {
    return this._array[this._array.length - 1]
  }

  bottom(): T {
    return this._array[0] 
  }

  length(): number { return this._array.length }
}