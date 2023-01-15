export default class Order {
  constructor(
    public readonly id: string,
    public readonly start: number,
    public readonly duration: number,
    public readonly price: number
  ) {}
}
